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

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  username: string;
  password: string;
  full_name: string;
}

export interface RefreshRequest {
  refresh_token: string;
}

export interface UserSession {
  id: string;
  ip_address: string;
  user_agent: string;
  created_at: string;
  last_used_at: string;
  is_current: boolean;
}

export interface SessionsResponse {
  sessions: UserSession[];
  current_session_id: string;
}

// Keep existing interfaces from api.ts
export interface ExtractNarratorsRequest {
  hadith_text: string;
}

export interface ExtractNarratorsResponse {
  narrators: string[];
  sanad_chain: string;
  success: boolean;
  message: string;
}

export interface AnalyzeNarratorRequest {
  narrator_name: string;
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

export interface ChainAnalysisRequest {
  sanad_chain: string[];
}

export interface ChainAnalysisMetadata {
  total_narrators: number;
  successful_analyses: number;
  analysis_method: string;
}

export interface ChainAnalysisResponse {
  chain: string[];
  individual_analyses: Record<string, NarratorAnalysisResponse>;
  chain_synthesis: Record<string, any>;
  metadata: ChainAnalysisMetadata;
  overall_reliability?: string;
  chain_strength?: string;
  weak_links?: string[];
  detailed_analysis?: Array<{
    narrator: string;
    position: number;
    reliability: string;
    issues?: string[];
  }>;
  recommendation?: string;
  success: boolean;
  message?: string;
}

export interface ExtractAndAnalyzeRequest {
  hadith_text: string;
}

export interface ExtractAndAnalyzeResponse {
  extraction: ExtractNarratorsResponse;
  analysis: ChainAnalysisResponse;
  success: boolean;
  message?: string;
}

export interface UserExtraction {
  id: string;
  hadith_text: string;
  narrators: string[];
  sanad_chain: string;
  created_at: string;
}

export interface UserAnalysis {
  id: string;
  narrator_name?: string;
  sanad_chain?: string[];
  analysis_type: 'narrator' | 'chain' | 'full';
  result: NarratorAnalysisResponse | ChainAnalysisResponse | ExtractAndAnalyzeResponse;
  created_at: string;
}

// API Error Response
export interface ApiError {
  error: string;
  detail?: string;
  status_code?: number;
}
