/**
 * Database readiness helper for real wiring.
 * Use DATABASE_URL with docker-compose or managed Postgres.
 */
import { prisma } from "./prisma";

export async function isDatabaseReady(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch {
    return false;
  }
}

export async function getDbStatus() {
  const ready = await isDatabaseReady();
  return {
    ready,
    urlConfigured: !!process.env.DATABASE_URL,
    message: ready
      ? "PostgreSQL connected"
      : "Database offline – APIs use demo fallbacks. Start docker compose and run prisma db push.",
  };
}
