# Sitemap

- **/** (Homepage): The main landing page and entry point.
- **/analysis**: The results page where the magic is displayed.
- **/about**: The "Why" behind the project, building trust.
- **/methodology**: The "How" of the project, for transparency and scrutiny.
- **/glossary**: A helpful resource for users.
- **/faq**: To answer common questions.

---

# Page-by-Page Breakdown
## 1. Homepage (`/`)

### Hero Section

- **Headline:** Analyze Hadith Chains Instantly
- **Sub-headline:** Effortlessly verify narrators from Sunni and Shia sources.

### Authenticator Tool

- Prominent input area with a single action button: **Analyze Chain**
- Clean, distraction-free layout for quick entry and results.

### How It Works

A sleek, visual 3-step process:

1. **Paste:** Drop your hadith text (including the Arabic chain).
2. **Analyze:** AI instantly reviews and grades each narrator.
3. **View:** Instantly see a clear, interactive report on authenticity.

### Features

- **Dual Tradition:** Toggle between Sunni and Shia analysis.
- **Visual Flowchart:** Modern, interactive chain visualization.
- **Source Transparency:** Direct links to scholarly references.

### Disclaimer

> This tool provides automated analysis for informational purposes. For scholarly decisions, consult qualified experts.

---

## 2. Analysis Results Page (`/analysis`)

### At-a-Glance Summary

- Carefully worded summary (e.g., "This chain appears to be strong based on Sunni rijāl," or "This chain contains a narrator with significant weakness according to Shia sources.")

### Source of Hadith

- If identifiable, show the book it's from (e.g., "Found in: Sahih al-Bukhari, #123")

### Sunni / Shia Toggle

- UI element allowing the user to switch between the two analyses.

### Visual Sanad Flowchart

- Graphical representation of the chain of narration from top to bottom.

### Narrator Breakdown

A list of "cards," one for each narrator in the chain:

- **Narrator's Name**
- **Grade:** (e.g., Thiqah (Trustworthy), Da'if (Weak))
- **Scholar Quote:** (e.g., "Ibn Hajar: 'Trustworthy and precise.'")
- The "weakest link" in the chain should be visually highlighted.

---

## 3. About Page (`/about`)

- **Our Mission:** Explain the problem you are solving (language barrier, misinformation, etc.).
- **Our Team:** (Optional but good for trust) Who is behind this project?
- **Our Commitment:** Reiterate your commitment to scholarly responsibility and bridging understanding.

---

## 4. Methodology Page (`/methodology`)

- **Data Sources:** List the key rijāl books used for both Sunni (e.g., _Taqrib al-Tahdhib_) and Shia (e.g., _Mu'jam al-Rijal al-Hadith_) traditions.
- **The Technology:** Briefly explain in layman's terms how the NLP engine works to parse the chain and how disambiguation (figuring out which "Ibn Ishaq") is handled.
- **Limitations:** Be honest about the tool's limitations. It's an automated process and may have errors.
