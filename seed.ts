/**
 * Optional seed script.
 * Run: npx tsx prisma/seed.ts  (after DATABASE_URL is set and prisma db push)
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("demo1234", 10);

  const author = await prisma.user.upsert({
    where: { email: "author@scopusixteen.com" },
    update: {},
    create: {
      email: "author@scopusixteen.com",
      name: "Demo Author",
      roles: ["AUTHOR"],
      passwordHash,
      affiliation: "Demo University",
    },
  });

  await prisma.user.upsert({
    where: { email: "editor@scopusixteen.com" },
    update: {},
    create: {
      email: "editor@scopusixteen.com",
      name: "Demo Editor",
      roles: ["HANDLING_EDITOR", "EDITOR_IN_CHIEF"],
      passwordHash,
    },
  });

  await prisma.user.upsert({
    where: { email: "reviewer@scopusixteen.com" },
    update: {},
    create: {
      email: "reviewer@scopusixteen.com",
      name: "Demo Reviewer",
      roles: ["REVIEWER"],
      passwordHash,
    },
  });

  await prisma.user.upsert({
    where: { email: "admin@scopusixteen.com" },
    update: {},
    create: {
      email: "admin@scopusixteen.com",
      name: "Demo Admin",
      roles: ["PUBLISHER_ADMIN"],
      passwordHash,
    },
  });

  const journals = [
    {
      id: "eng-applied",
      title: "Journal of Engineering and Applied Sciences",
      shortTitle: "JEAS",
      issn: "2616-7300",
      publishingMode: "APC" as const,
      apcAmount: 850,
      reviewModel: "double-blind",
      description: "Engineering research, applied sciences and technology",
    },
    {
      id: "med-health",
      title: "International Journal of Medical and Health Research",
      shortTitle: "IJMHR",
      issn: "2708-9516",
      publishingMode: "HYBRID" as const,
      apcAmount: 980,
      reviewModel: "double-blind",
      description: "Clinical, public health and biomedical research",
    },
    {
      id: "business",
      title: "Journal of Business, Management & Economics",
      shortTitle: "JBME",
      issn: "2617-4611",
      publishingMode: "SUBSCRIPTION" as const,
      apcAmount: 750,
      reviewModel: "single-blind",
      description: "Business, management and economic studies",
    },
    {
      id: "env-sci",
      title: "Advances in Environmental Science & Sustainability",
      shortTitle: "AESS",
      issn: "2738-1141",
      publishingMode: "APC" as const,
      apcAmount: 900,
      reviewModel: "open",
      description: "Environmental science, climate and sustainability",
    },
    {
      id: "comp-sci",
      title: "Scopusixteen Journal of Computer Science",
      shortTitle: "SJCS",
      issn: "2740-1001",
      publishingMode: "HYBRID" as const,
      apcAmount: 1100,
      reviewModel: "double-blind",
      description: "Algorithms, systems, AI and software engineering",
    },
    {
      id: "edu-research",
      title: "International Journal of Education Research",
      shortTitle: "IJER",
      issn: "2741-2002",
      publishingMode: "HYBRID" as const,
      apcAmount: 650,
      reviewModel: "double-blind",
      description: "Pedagogy, policy and learning sciences",
    },
    {
      id: "law-policy",
      title: "Journal of Law, Policy & Society",
      shortTitle: "JLPS",
      issn: "2742-3003",
      publishingMode: "SUBSCRIPTION" as const,
      apcAmount: 800,
      reviewModel: "single-blind",
      description: "Legal studies, public policy and governance",
    },
    {
      id: "agri-food",
      title: "Agricultural Science & Food Systems",
      shortTitle: "ASFS",
      issn: "2743-4004",
      publishingMode: "APC" as const,
      apcAmount: 720,
      reviewModel: "open",
      description: "Agronomy, food security and rural development",
    },
  ];

  for (const j of journals) {
    await prisma.journal.upsert({
      where: { id: j.id },
      update: j,
      create: j,
    });
  }

  console.log("Seed complete. Demo users password: demo1234");
  console.log("Author id:", author.id);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
