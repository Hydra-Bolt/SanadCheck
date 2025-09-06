## SanadCheck LLM API – Next.js Integration (with Authentication)

This guide shows how to securely integrate the SanadCheck API into a Next.js 13/14+ (App Router) project, with proper JWT handling (access + refresh), protected server actions, and client usage examples.

---
## 1. High-Level Architecture

Recommended pattern: keep ALL direct calls to the FastAPI service on the server (Next.js Route Handlers / Server Actions) so refresh tokens never reach the browser's JS runtime.

Flow:
1. User submits credentials (email/password) via a client component form.
2. Form calls a Next.js Route Handler: `POST /api/auth/login`.
3. Route handler forwards to FastAPI `/auth/login`.
4. Response contains: `access_token`, `refresh_token`, `expires_in`, `user`.
5. Next handler sets:
	 - `sc_refresh` (HttpOnly, Secure, SameSite=Strict) – refresh token
	 - `sc_access` (HttpOnly OR short-lived in-memory re-fetched via server action) – access token
	 - Optionally store decoded `user` object in a signed cookie or re-fetch via `/auth/me` per request.
6. Client components fetch data by calling internal Next.js API routes (proxy) that attach `Authorization: Bearer <access_token>`.
7. If access token expired, the proxy handler uses the refresh token cookie to get a new pair (rotate!) transparently.

Why this pattern:
- Avoids XSS exposure of refresh tokens
- Centralizes refresh logic
- Enables SSR + Server Actions with authenticated context

---
## 2. Backend Endpoints Used

Auth:
- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/refresh`
- `POST /auth/logout`
- `GET  /auth/me`
- `GET  /auth/sessions`

Core Hadith Analysis (all protected except `/api/v1/health` + some analytics):
- `POST /api/v1/extract-narrators`
- `POST /api/v1/analyze-narrator`
- `POST /api/v1/analyze-narrator-chain`
- `POST /api/v1/extract-and-analyze`
- `GET  /api/v1/user/extractions`
- `GET  /api/v1/user/analyses`
- `GET  /api/v1/analytics/stats` (public)
- `GET  /api/v1/analytics/popular-narrators` (public)
- `GET  /api/v1/health` (public)

---
## 3. Environment Variables (Next.js)

In `.env.local`:
```
SANAD_API_BASE_URL=http://localhost:8000   # FastAPI base
NEXT_PUBLIC_SANAD_PUBLIC_BASE=/api/sanad    # Public-facing proxy base (optional)
```

Never expose service keys. Only the public base URL may be exposed.

---
## 4. Directory Structure (Suggested)
```
app/
	api/
		auth/
			login/route.ts
			register/route.ts
			logout/route.ts
			refresh/route.ts          # (Optional explicit refresh)
			me/route.ts
		sanad/
			extract-narrators/route.ts
			analyze-narrator/route.ts
			extract-and-analyze/route.ts
			user/
				extractions/route.ts
				analyses/route.ts
			analytics/
				stats/route.ts
				popular-narrators/route.ts
	(UI pages & components...)
lib/
	apiClient.ts
	auth.ts
	tokens.ts
middleware.ts (optional token freshness logic)
components/
	AuthProvider.tsx
	LoginForm.tsx
```

---
## 5. TypeScript Models

Create `lib/types.ts`:
```ts
export interface User {
	id: string;
	email: string;
	username: string;
	full_name: string;
	role: string;
	is_active: boolean;
}

export interface AuthResponse {
	access_token: string;
	refresh_token: string;
	token_type: 'bearer';
	expires_in: number; // seconds
	user: User;
}

export interface NarratorExtractionResponse {
	narrators: string[];
	sanad_chain: string;
	success: boolean;
	message?: string;
}

export interface NarratorAnalysisResponse {
	narrator_name: string;
	reliability_grade: string;
	confidence_level: string;
	reasoning: string;
	scholarly_consensus: string;
	known_issues?: string[] | null;
	biographical_info: string;
	recommendation: string;
	success: boolean;
	message?: string;
}
```

---
## 6. Secure Token Handling Strategy

| Aspect | Recommendation |
|--------|---------------|
| Access Token | Short-lived (minutes). Store in httpOnly cookie `sc_access` or re-fetch via server action each request. |
| Refresh Token | HttpOnly + Secure cookie `sc_refresh` only. Never expose to JS. |
| Rotation | Always replace both tokens on refresh (server enforces blacklisting). |
| Expiry Tracking | Store `exp` in cookie or decode server-side. Trigger refresh when <60s left. |
| Logout | Clear both cookies + call backend `/auth/logout` with current access token. |

Cookie examples (set in route handlers):
```ts
cookies().set('sc_refresh', refreshToken, {
	httpOnly: true,
	secure: process.env.NODE_ENV === 'production',
	sameSite: 'strict',
	path: '/',
	maxAge: 60 * 60 * 24 * 7, // adjust to backend refresh expiry
});
cookies().set('sc_access', accessToken, {
	httpOnly: true,
	secure: process.env.NODE_ENV === 'production',
	sameSite: 'strict',
	path: '/',
	maxAge: 60 * 15,
});
```

---
## 7. Generic Fetch Wrapper (Server)

`lib/apiClient.ts`:
```ts
import { cookies } from 'next/headers';

const BASE = process.env.SANAD_API_BASE_URL!;

async function refreshIfNeeded(): Promise<string | null> {
	const store = cookies();
	const access = store.get('sc_access')?.value;
	if (access) return access; // Or decode & check exp

	const refresh = store.get('sc_refresh')?.value;
	if (!refresh) return null;

	// Call internal refresh route (not FastAPI directly)
	const res = await fetch(`${process.env.NEXT_PUBLIC_SANAD_PUBLIC_BASE || ''}/auth/refresh`, { method: 'POST' });
	if (!res.ok) return null;
	const data = await res.json();
	return cookies().get('sc_access')?.value || null; // After handler sets new cookie
}

export async function sanadFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
	const token = await refreshIfNeeded();
	const headers = new Headers(init.headers || {});
	if (token) headers.set('Authorization', `Bearer ${token}`);
	headers.set('Content-Type', 'application/json');

	const res = await fetch(`${BASE}${path}`, { ...init, headers, cache: 'no-store' });
	if (!res.ok) {
		const body = await res.text();
		throw new Error(`Sanad API error ${res.status}: ${body}`);
	}
	return res.json() as Promise<T>;
}
```

---
## 8. Route Handler Examples (Proxy Pattern)

`app/api/auth/login/route.ts`:
```ts
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
	const creds = await req.json();
	const res = await fetch(`${process.env.SANAD_API_BASE_URL}/auth/login`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(creds),
	});
	if (!res.ok) {
		return NextResponse.json({ error: 'Login failed' }, { status: res.status });
	}
	const data = await res.json();
	const c = cookies();
	c.set('sc_refresh', data.refresh_token, { httpOnly: true, secure: true, sameSite: 'strict', path: '/', maxAge: data.expires_in * 4 });
	c.set('sc_access', data.access_token, { httpOnly: true, secure: true, sameSite: 'strict', path: '/', maxAge: data.expires_in });
	return NextResponse.json({ user: data.user });
}
```

`app/api/auth/refresh/route.ts`:
```ts
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
	const refresh = cookies().get('sc_refresh')?.value;
	if (!refresh) return NextResponse.json({ error: 'No refresh token' }, { status: 401 });

	const res = await fetch(`${process.env.SANAD_API_BASE_URL}/auth/refresh`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ refresh_token: refresh }),
	});
	if (!res.ok) return NextResponse.json({ error: 'Refresh failed' }, { status: 401 });
	const data = await res.json();
	const c = cookies();
	c.set('sc_refresh', data.refresh_token, { httpOnly: true, secure: true, sameSite: 'strict', path: '/', maxAge: data.expires_in * 4 });
	c.set('sc_access', data.access_token, { httpOnly: true, secure: true, sameSite: 'strict', path: '/', maxAge: data.expires_in });
	return NextResponse.json({ status: 'refreshed' });
}
```

`app/api/sanad/extract-narrators/route.ts`:
```ts
import { NextRequest, NextResponse } from 'next/server';
import { sanadFetch } from '@/lib/apiClient';

export async function POST(req: NextRequest) {
	const body = await req.json();
	try {
		const data = await sanadFetch('/api/v1/extract-narrators', { method: 'POST', body: JSON.stringify(body) });
		return NextResponse.json(data);
	} catch (e: any) {
		return NextResponse.json({ error: e.message }, { status: 500 });
	}
}
```

Add similar handlers for `analyze-narrator`, `extract-and-analyze`, etc.

---
## 9. Client Hook (Optional Thin Layer)

`lib/useSanad.ts` (Client Component safe):
```ts
import { useState } from 'react';

export function useSanad() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	async function post<T>(path: string, payload: any): Promise<T | null> {
		setLoading(true); setError(null);
		try {
			const res = await fetch(`/api/sanad${path}`, { method: 'POST', body: JSON.stringify(payload) });
			const json = await res.json();
			if (!res.ok) throw new Error(json.error || 'Request failed');
			return json as T;
		} catch (e: any) { setError(e.message); return null; }
		finally { setLoading(false); }
	}

	return { post, loading, error };
}
```

Usage in a component:
```tsx
const { post, loading, error } = useSanad();
async function handleExtract(text: string) {
	const data = await post('/extract-narrators', { hadith_text: text });
	console.log(data);
}
```

---
## 10. Server Action Example (Optional)

If you prefer server actions instead of route handlers for some flows:
```ts
'use server';
import { sanadFetch } from '@/lib/apiClient';

export async function extractNarratorsAction(hadith: string) {
	return sanadFetch('/api/v1/extract-narrators', { method: 'POST', body: JSON.stringify({ hadith_text: hadith }) });
}
```
Call inside a Server Component or via form action.

---
## 11. Login Form (Client) Example
```tsx
'use client';
import { useState } from 'react';

export function LoginForm() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState<string | null>(null);

	async function submit(e: React.FormEvent) {
		e.preventDefault(); setError(null);
		const res = await fetch('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
		const data = await res.json();
		if (!res.ok) setError(data.error || 'Login failed');
		// success: user available in data.user, tokens stored as cookies
	}

	return (
		<form onSubmit={submit} className="space-y-2">
			<input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
			<input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
			<button type="submit">Login</button>
			{error && <p className="text-red-500">{error}</p>}
		</form>
	);
}
```

---
## 12. Logout Flow
Route handler `app/api/auth/logout/route.ts`:
```ts
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
	const access = cookies().get('sc_access')?.value;
	if (access) {
		await fetch(`${process.env.SANAD_API_BASE_URL}/auth/logout`, {
			method: 'POST',
			headers: { Authorization: `Bearer ${access}` }
		}).catch(() => {});
	}
	const c = cookies();
	c.delete('sc_access');
	c.delete('sc_refresh');
	return NextResponse.json({ status: 'logged_out' });
}
```
Client call:
```ts
await fetch('/api/auth/logout', { method: 'POST' });
```

---
## 14. Middleware (Optional Early Refresh)

`middleware.ts` (basic sketch – only if you want silent refresh before protected routes):
```ts
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
	const access = req.cookies.get('sc_access');
	if (!access) {
		const refresh = req.cookies.get('sc_refresh');
		if (refresh) {
			await fetch(new URL('/api/auth/refresh', req.url), { method: 'POST' });
		}
	}
	return NextResponse.next();
}

export const config = { matcher: ['/dashboard/:path*', '/analysis/:path*'] };
```

---
## 15. Security Checklist

- Use `Secure` cookies in production (HTTPS)
- Set `SameSite=Strict` to mitigate CSRF (or use custom CSRF token if cross-site embedding needed)
- Do NOT store refresh tokens in `localStorage` or JS-accessible cookies
- Rotate tokens on every refresh
- Handle logout on 401 loops (e.g., if refresh also fails)

---
## 16. Minimal End-to-End Example

1. User visits `/login` → submits form
2. `/api/auth/login` sets cookies
3. User navigates to `/dashboard` (protected)
4. Server component calls server action or `fetch('/api/sanad/extract-narrators')`
5. Handler attaches Authorization header → FastAPI processes → returns JSON
6. Access token expires → next call triggers `/api/auth/refresh` implicitly → cookies updated
7. User clicks logout → `/api/auth/logout` → cookies cleared + token blacklisted

---
## 17. Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| 401 on every request | Missing Authorization header | Ensure proxy sets header after refresh |
| 401 after refresh | Refresh token expired/blacklisted | Force logout & re-login |
| CORS errors (if bypassing proxy) | Direct browser → FastAPI without proper CORS | Always use Next.js proxy or configure CORS on backend |
| Cookie not set in prod | Missing `secure` or domain mismatch | Set correct domain & HTTPS |

---
## 18. Next Steps / Enhancements

- Add SWR/React Query for caching
- Add optimistic UI for chain analysis
- Add user session list page using `/auth/sessions`
- Implement progress indicators for long analyses

---
## 19. Quick Reference (Cheat Sheet)

Auth Cycle:
```
POST /api/auth/login            -> sets cookies
POST /api/auth/refresh          -> rotates tokens
POST /api/auth/logout           -> clears + blacklists
GET  /api/auth/me               -> user profile
```

Core Calls:
```
POST /api/sanad/extract-narrators
POST /api/sanad/analyze-narrator
POST /api/sanad/extract-and-analyze
GET  /api/sanad/user/extractions
GET  /api/sanad/user/analyses
```

---
## 20. Summary

Use a proxy pattern + HttpOnly cookies to keep tokens safe, centralize refresh logic, and provide a clean developer experience in your Next.js app. The snippets above can be copied directly and adjusted to your folder naming. Expand with caching & UI state management as needed.

If you need a tailored example repository scaffold, ask and we can generate it.

