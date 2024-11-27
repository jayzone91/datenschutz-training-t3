import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const infoRouter = createTRPCRouter({
  getLatest: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.info.findMany({
      orderBy: {
        published: "desc",
      },
      include: {
        InfoKategorie: true,
      },
      take: 6,
    });
  }),
  getKategorien: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.infoKategorie.findMany({
      orderBy: {
        published: "desc",
      },
      include: {
        _count: true,
      },
    });
  }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.info.findMany({
      include: {
        InfoKategorie: true,
      },
    });
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
  getKategorie: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.infoKategorie.findUnique({
        where: { id: input.id },
        include: {
          Infos: true,
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
        Kategorie: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user.admin) return null;
      return await ctx.db.info.update({
        where: {
          id: input.id,
        },
        data: {
          infoKategorieId: input.Kategorie,
          Body: input.Body,
          Beschreibung: input.Beschreibung,
          Name: input.Name,
        },
      });
    }),
  updateKategorie: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        Name: z.string(),
        Beschreibung: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user.admin) return null;
      return await ctx.db.infoKategorie.update({
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
        Kategorie: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user.admin) return null;
      return await ctx.db.info.create({
        data: {
          infoKategorieId: input.Kategorie,
          Name: input.Name,
          Beschreibung: input.Beschreibung,
          Body: input.Body,
        },
      });
    }),
  createKategorie: protectedProcedure
    .input(
      z.object({
        Name: z.string(),
        Beschreibung: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user.admin) return null;
      return await ctx.db.infoKategorie.create({
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
  deleteKategorie: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user.admin) return null;

      return await ctx.db.infoKategorie.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
