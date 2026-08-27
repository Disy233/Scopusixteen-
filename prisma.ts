/**
 * Prisma client – optional until `npx prisma generate` + DATABASE_URL are set.
 */
type PrismaLike = {
  user: any;
  manuscript: any;
  review: any;
  decision: any;
  subscription: any;
  payment: any;
  journal: any;
  manuscriptVersion: any;
  $queryRaw: (...args: any[]) => Promise<any>;
  $disconnect: () => Promise<void>;
};

function createStub(): PrismaLike {
  const reject = async () => {
    throw new Error("Prisma client not available – run prisma generate and set DATABASE_URL");
  };
  return new Proxy(
    {},
    {
      get(_t, prop) {
        if (prop === "$disconnect") return async () => {};
        if (prop === "$queryRaw") return reject;
        return new Proxy(
          {},
          {
            get() {
              return reject;
            },
          }
        );
      },
    }
  ) as PrismaLike;
}

let prismaInstance: PrismaLike;

try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { PrismaClient } = require("@prisma/client");
  const globalForPrisma = globalThis as unknown as { prisma?: PrismaLike };
  prismaInstance =
    globalForPrisma.prisma ??
    new PrismaClient({
      log:
        process.env.NODE_ENV === "development"
          ? ["error", "warn"]
          : ["error"],
    });
  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prismaInstance;
  }
} catch {
  prismaInstance = createStub();
}

export const prisma = prismaInstance;
