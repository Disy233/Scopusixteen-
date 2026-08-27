import type { Journal, Manuscript } from "./types";

export interface Article {
  id: string;
  title: string;
  authors: string;
  abstract: string;
  journalId: string;
  journalTitle: string;
  publishedAt: string;
  doi: string;
  isOpenAccess: boolean;
  mode: "SUBSCRIPTION" | "APC";
  volume?: string;
  issue?: string;
  teaser: string;
  fullText: string;
}

export const SAMPLE_JOURNALS: Journal[] = [
  {
    id: "eng-applied",
    title: "Journal of Engineering and Applied Sciences",
    shortTitle: "JEAS",
    description: "Engineering research, applied sciences and technology",
    publishingMode: "APC",
    apcAmount: 850,
    apcCurrency: "USD",
    reviewModel: "double-blind",
  },
  {
    id: "med-health",
    title: "International Journal of Medical and Health Research",
    shortTitle: "IJMHR",
    description: "Clinical, public health and biomedical research – hybrid",
    publishingMode: "HYBRID",
    apcAmount: 980,
    apcCurrency: "USD",
    subscriptionPrice: 349,
    reviewModel: "double-blind",
  },
  {
    id: "business",
    title: "Journal of Business, Management & Economics",
    shortTitle: "JBME",
    description: "Business, management and economic studies – subscription-led",
    publishingMode: "SUBSCRIPTION",
    apcAmount: 750,
    apcCurrency: "USD",
    subscriptionPrice: 299,
    reviewModel: "single-blind",
  },
  {
    id: "env-sci",
    title: "Advances in Environmental Science & Sustainability",
    shortTitle: "AESS",
    description: "Environmental science, climate and sustainability",
    publishingMode: "APC",
    apcAmount: 900,
    apcCurrency: "USD",
    reviewModel: "open",
  },
  {
    id: "comp-sci",
    title: "Scopusixteen Journal of Computer Science",
    shortTitle: "SJCS",
    description: "Algorithms, systems, AI and software engineering – hybrid",
    publishingMode: "HYBRID",
    apcAmount: 1100,
    apcCurrency: "USD",
    subscriptionPrice: 399,
    reviewModel: "double-blind",
  },
  {
    id: "edu-research",
    title: "International Journal of Education Research",
    shortTitle: "IJER",
    description: "Pedagogy, policy and learning sciences",
    publishingMode: "HYBRID",
    apcAmount: 650,
    apcCurrency: "USD",
    subscriptionPrice: 249,
    reviewModel: "double-blind",
  },
  {
    id: "law-policy",
    title: "Journal of Law, Policy & Society",
    shortTitle: "JLPS",
    description: "Legal studies, public policy and governance – subscription",
    publishingMode: "SUBSCRIPTION",
    apcAmount: 800,
    apcCurrency: "USD",
    subscriptionPrice: 379,
    reviewModel: "single-blind",
  },
  {
    id: "agri-food",
    title: "Agricultural Science & Food Systems",
    shortTitle: "ASFS",
    description: "Agronomy, food security and rural development – fully OA",
    publishingMode: "APC",
    apcAmount: 720,
    apcCurrency: "USD",
    reviewModel: "open",
  },
];

export const SAMPLE_ARTICLES: Article[] = [
  {
    id: "art-001",
    title: "Machine Learning Approaches for Predicting Protein Structures: A Review",
    authors: "A. Jana, R. K. Singh, P. Verma",
    abstract:
      "We review recent machine learning methods for protein structure prediction, including deep learning architectures, training datasets, and benchmark performance on CASP targets.",
    journalId: "eng-applied",
    journalTitle: "Journal of Engineering and Applied Sciences",
    publishedAt: "2025-05-20",
    doi: "10.5678/jeas.2025.0821",
    isOpenAccess: true,
    mode: "APC",
    volume: "8",
    issue: "2",
    teaser:
      "Protein structure prediction has been transformed by deep learning. This review surveys AlphaFold-class models and remaining challenges.",
    fullText: `1. Introduction

Protein structure prediction is central to structural biology and drug discovery. Classical approaches relied on homology modelling and physics-based simulations. The last decade has seen a shift to large-scale supervised learning.

2. Methods surveyed

We categorise methods into contact/distance prediction, end-to-end 3D folding networks, and language-model-based structure inference.

3. Results and discussion

End-to-end models achieve near-experimental accuracy on many single-domain proteins. Multi-domain assembly and disordered proteins remain open problems.

4. Conclusion

ML-based structure prediction is production-ready for many use cases, but experimental validation remains essential.

(Sample full text – open access via APC route.)`,
  },
  {
    id: "art-002",
    title: "Impact of Climate Change on Vector-Borne Diseases: A Global Perspective",
    authors: "M. Ibrahim, L. K. Mensah, S. A. Adeyemi",
    abstract:
      "Climate change alters the geographic range and seasonality of vector-borne diseases. We synthesise evidence for malaria, dengue, and tick-borne pathogens.",
    journalId: "med-health",
    journalTitle: "International Journal of Medical and Health Research",
    publishedAt: "2025-05-18",
    doi: "10.5678/ijmhr.2025.0719",
    isOpenAccess: false,
    mode: "SUBSCRIPTION",
    volume: "7",
    issue: "2",
    teaser:
      "Rising temperatures expand habitats for mosquitoes and ticks. This article maps risk shifts and public-health implications.",
    fullText: `1. Background

Vector-borne diseases account for a substantial share of the global infectious disease burden. Climate variables influence vector survival and pathogen incubation.

2. Evidence synthesis

We review observational and modelling studies (2010–2024) for Anopheles- and Aedes-borne pathogens and Ixodes ticks.

3. Adaptation options

Surveillance, early-warning systems, and integrated vector management are evaluated.

4. Conclusion

Without mitigation and adaptation, climate-sensitive VBDs are likely to expand in many regions.

(Full text for subscribers – subscription route.)`,
  },
  {
    id: "art-003",
    title: "Financial Inclusion and Economic Growth in Developing Economies",
    authors: "T. Okafor, H. Bello",
    abstract:
      "Using panel data for 42 developing economies, we estimate the effect of financial inclusion on real GDP growth.",
    journalId: "business",
    journalTitle: "Journal of Business, Management & Economics",
    publishedAt: "2025-05-15",
    doi: "10.5678/jbme.2025.0915",
    isOpenAccess: false,
    mode: "SUBSCRIPTION",
    volume: "9",
    issue: "1",
    teaser:
      "Account ownership, digital payments, and credit access are linked to growth, with stronger effects where regulatory quality is high.",
    fullText: `1. Introduction

Financial inclusion is a policy priority in many developing economies.

2. Data and methods

Panel (2004–2022) from World Bank Findex and WDI. Fixed-effects and system-GMM estimators.

3. Findings

A one-standard-deviation increase in inclusion is associated with 0.3–0.6 pp higher annual growth.

4. Policy implications

Digital infrastructure and consumer protection amplify benefits.

(Subscription journal – authorised users only.)`,
  },
  {
    id: "art-004",
    title: "Transformer Models for Low-Resource Machine Translation",
    authors: "C. Nwosu, J. Park, E. Okonkwo",
    abstract:
      "We evaluate parameter-efficient fine-tuning for translation into under-resourced African languages.",
    journalId: "comp-sci",
    journalTitle: "Scopusixteen Journal of Computer Science",
    publishedAt: "2025-06-02",
    doi: "10.5678/sjcs.2025.0602",
    isOpenAccess: true,
    mode: "APC",
    volume: "3",
    issue: "1",
    teaser:
      "LoRA and adapters close much of the gap to full fine-tuning at a fraction of the cost.",
    fullText: `1. Motivation

Most commercial MT systems underperform on low-resource languages.

2. Experiments

Full fine-tuning vs LoRA vs prefix-tuning on FLORES-style benchmarks.

3. Results

LoRA recovers 90%+ of full fine-tuning BLEU while training under 5% of parameters.

4. Conclusion

PEFT is practical for community-driven MT in low-resource settings.

(Open access – APC route.)`,
  },
  {
    id: "art-005",
    title: "Inclusive Pedagogy in Hybrid Higher Education Settings",
    authors: "R. Mensah, A. Foster",
    abstract:
      "A mixed-methods study of inclusive teaching practices across five universities adopting hybrid delivery.",
    journalId: "edu-research",
    journalTitle: "International Journal of Education Research",
    publishedAt: "2025-04-10",
    doi: "10.5678/ijer.2025.0410",
    isOpenAccess: false,
    mode: "SUBSCRIPTION",
    volume: "12",
    issue: "1",
    teaser:
      "Universal design for learning and flexible assessment improve outcomes for remote and disabled students.",
    fullText: `1. Context

Hybrid higher education is widespread. Inclusion must be designed, not assumed.

2. Methods

Surveys (n=1,240) and interviews (n=48) across five institutions.

3. Findings

Captioning, asynchronous options, and clear workload design correlate with higher completion.

4. Recommendations

Institutional policy and faculty development are both required.

(Available via subscription or institutional licence.)`,
  },
  {
    id: "art-006",
    title: "Regulatory Sandboxes and Fintech Innovation: A Comparative Study",
    authors: "S. Adeyemi, K. Brandt",
    abstract:
      "We compare regulatory sandbox regimes in the UK, Singapore, Nigeria, and Kenya.",
    journalId: "law-policy",
    journalTitle: "Journal of Law, Policy & Society",
    publishedAt: "2025-03-22",
    doi: "10.5678/jlps.2025.0322",
    isOpenAccess: false,
    mode: "SUBSCRIPTION",
    volume: "5",
    issue: "1",
    teaser:
      "Well-designed sandboxes correlate with higher startup density; consumer-protection outcomes vary.",
    fullText: `1. Introduction

Regulatory sandboxes balance innovation and risk in financial services.

2. Comparative framework

Entry criteria, duration, disclosure, and exit pathways are coded.

3. Analysis

Jurisdictions with clear exit rules show stronger post-sandbox scaling.

4. Conclusion

Sandboxes are not a substitute for coherent licensing regimes.

(Subscription access required.)`,
  },
  {
    id: "art-007",
    title: "Soil Carbon Sequestration under Conservation Agriculture in West Africa",
    authors: "F. Diallo, N. Boateng, P. Okeke",
    abstract:
      "Field trials across three agroecological zones estimate soil organic carbon changes under conservation agriculture over five years.",
    journalId: "agri-food",
    journalTitle: "Agricultural Science & Food Systems",
    publishedAt: "2025-07-01",
    doi: "10.5678/asfs.2025.0701",
    isOpenAccess: true,
    mode: "APC",
    volume: "4",
    issue: "2",
    teaser:
      "Reduced tillage and residue retention increased SOC stocks by 8–15% in two of three zones.",
    fullText: `1. Introduction

Soil carbon is central to climate mitigation and fertility in smallholder systems.

2. Experimental design

Randomised trials with farmer participation; SOC measured at 0–30 cm.

3. Results

Significant SOC gains where residue retention was feasible.

4. Conclusion

Conservation agriculture can contribute to sequestration where conditions allow.

(Open access article.)`,
  },
];

export const SAMPLE_MANUSCRIPTS: Manuscript[] = [
  {
    id: "ms-001",
    title: "Machine Learning Approaches for Predicting Protein Structures: A Review",
    abstract: "We review recent ML methods for protein structure prediction...",
    status: "UNDER_REVIEW",
    chosenMode: "APC",
    journalId: "eng-applied",
    journalTitle: "Journal of Engineering and Applied Sciences",
    submittedAt: "2026-07-12",
    updatedAt: "2026-08-01",
  },
  {
    id: "ms-002",
    title: "Impact of Climate Change on Vector-Borne Diseases: A Global Perspective",
    status: "REVISION_REQUESTED",
    chosenMode: "SUBSCRIPTION",
    journalId: "med-health",
    journalTitle: "International Journal of Medical and Health Research",
    submittedAt: "2026-06-20",
    updatedAt: "2026-07-28",
  },
  {
    id: "ms-003",
    title: "Financial Inclusion and Economic Growth in Developing Economies",
    status: "ACCEPTED",
    chosenMode: "SUBSCRIPTION",
    journalId: "business",
    journalTitle: "Journal of Business, Management & Economics",
    submittedAt: "2026-05-05",
    updatedAt: "2026-08-10",
  },
];

export function getArticle(id: string): Article | undefined {
  return SAMPLE_ARTICLES.find((a) => a.id === id);
}

export function getJournal(id: string): Journal | undefined {
  return SAMPLE_JOURNALS.find((j) => j.id === id);
}
