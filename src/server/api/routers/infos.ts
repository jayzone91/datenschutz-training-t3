import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const infoRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.info.findMany();
  }),
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.info.findUnique({
        where: {
          id: input.id,
        },
      });
    }),

  // Update
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        Name: z.string(),
        Beschreibung: z.string(),
        Body: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user.admin) return null;
      return await ctx.db.info.update({
        where: {
          id: input.id,
        },
        data: {
          ...input,
        },
      });
    }),
  // Create
  create: protectedProcedure
    .input(
      z.object({
        Name: z.string(),
        Beschreibung: z.string(),
        Body: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user.admin) return null;
      return await ctx.db.info.create({
        data: {
          ...input,
        },
      });
    }),

  // Delete
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user.admin) return null;

      return await ctx.db.info.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
