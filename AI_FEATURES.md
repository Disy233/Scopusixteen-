# Scopusixteen AI Support Features

AI is a first-class capability, not an afterthought. All AI features should be transparent, opt-in where appropriate, and designed to assist rather than replace human judgement (especially editorial decisions).

## 1. Pre-Submission / Author Tools

- **Manuscript Quality Score**  
  Language clarity, structure completeness, abstract quality, keyword relevance, reference formatting.

- **Similarity / Plagiarism Signals**  
  Cross-check against open corpora + publisher content (where licensed). Flag high-overlap passages with source links.

- **Integrity Checks**  
  Image manipulation heuristics, paper-mill pattern detection, unusual author patterns, citation rings.

- **Language Polishing**  
  Suggest improvements for non-native English authors while preserving scientific meaning. Show diffs.

- **Reference & Citation Helper**  
  Detect missing DOIs, incomplete citations, suggest relevant recent papers.

- **Journal Finder**  
  Semantic matching of abstract + keywords to journal scope and recent content.

## 2. Editorial & Peer-Review Tools

- **Reviewer Matching**  
  Embed abstract + keywords + methodology; rank potential reviewers by expertise, past performance, availability, conflict-of-interest risk, and diversity goals.

- **Desk-Reject Triage Signals**  
  Out-of-scope, poor language, ethical red flags, obvious methodological flaws. Always require human confirmation.

- **Review Synthesis**  
  Summarise multiple reviews, highlight agreements/disagreements, extract key requested revisions.

- **Decision Letter Drafting**  
  Generate professional, constructive decision letters based on reviews + editor notes (editor edits before sending).

## 3. Production & Post-Publication

- **Plain-Language Summary**  
  Auto-generate accessible abstract for broader audiences.

- **Visual Abstract / Graphical Abstract Draft**  
  Suggest layout and key points (human designer finalises).

- **Social Media & Press Snippets**  
  Short, accurate posts for journal Twitter/X, LinkedIn, etc.

- **Related Content Recommendations**  
  Semantic + co-citation based suggestions on article pages.

## 4. Conversational Assistant

- Status queries: “Where is my manuscript?”, “When is the review due?”
- Guidance: “How do I request a waiver?”, “What licence options do I have?”
- Policy lookup grounded in journal-specific rules.

## 5. Implementation Guidelines

- Use a dedicated AI orchestration service (LangChain / LlamaIndex / Vercel AI SDK).
- Prefer structured outputs (JSON mode / tool calling) for scores and flags.
- Log every AI call with prompt version, model, latency, and cost for auditing.
- Allow editors/authors to see the AI reasoning or key evidence.
- Provide human override and feedback loops (“Was this suggestion useful?”).
- Start with commercial models (OpenAI, Anthropic) then evaluate open-weight models for cost/privacy.
- Embeddings stored in pgvector or a managed vector DB; refresh on new publications.

## 6. Ethical Guardrails

- Never auto-accept or auto-reject solely on AI scores.
- Disclose AI assistance where required by journals or funders.
- Protect reviewer anonymity and manuscript confidentiality.
- Regular bias audits on reviewer matching and language scoring.
- Opt-out options for authors who do not want AI analysis of their manuscript.

---

Priority order for MVP:
1. Language quality + basic structure check
2. Reviewer matching
3. Similarity signals
4. Status chatbot
5. Review synthesis & decision letter drafts
