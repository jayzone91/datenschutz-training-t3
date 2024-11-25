import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
  getUser: protectedProcedure
    .input(z.object({ id: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      if (input.id) {
        return await ctx.db.user.findUnique({
          where: {
            id: input.id,
          },
        });
      } else {
        return await ctx.db.user.findUnique({
          where: {
            id: ctx.session.user.id,
          },
        });
      }
    }),
  getUsers: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.session.user.admin) return null;

    return await ctx.db.user.findMany();
  }),
  updateUserAdmin: protectedProcedure
    .input(z.object({ id: z.string(), name: z.string(), admin: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user.admin) return null;

      return await ctx.db.user.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          admin: input.admin,
        },
      });
    }),
  updateUser: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          name: input.name,
        },
      });
    }),
});
