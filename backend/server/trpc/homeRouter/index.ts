import { z } from 'zod';
import { prismaDB } from '../../connection';
import { publicProcedure, router } from '../trpc';
import { tr } from '@faker-js/faker';

export const homeRouter = router({
  list: publicProcedure.query(async () => {
    const homes = await prismaDB.home.findMany();
    return homes;
  }),
  listShort: publicProcedure.query(async () => {
    const homes = await prismaDB.home.findMany({
      select: {
        id: true,
        address: true,
        rooms: true
      }
    });
    return homes;
  }),

  get: publicProcedure.input(z.string()).query(async (opts) => {
    const home = await prismaDB.home.findUnique({
      where: {
        id: opts.input
      }
    });
    return home ?? undefined;
  }),
  addPerson: publicProcedure
    .input(
      z.object({
        home_id: z.string(),
        name: z.string(),
        person_id: z.string()
      })
    )
    .mutation(async (opts) => {
      // opts.input.
      const home = await prismaDB.home.update({
        where: {
          id: opts.input.home_id
        },
        data: {
          persons: {
            push: { id: opts.input.person_id, name: opts.input.name }
          }
        }
      });
      const person = await prismaDB.person.update({
        where: {
          id: opts.input.person_id
        },
        data: {
          homes: {
            push: {
              id: opts.input.home_id,
              address: home.address,
              rooms: home.rooms,
              person: []
            }
          }
        }
      });
      return { home, person };
    }),
  createHouse: publicProcedure
    .input(
      z.object({
        address: z.string(),
        city: z.string(),
        rooms: z.number(),
        persons: z.array(
          z.object({
            id: z.string(),
            name: z.string()
          })
        )
      })
    )
    .mutation(async (opts) => {
      const house = await prismaDB.home.create({
        data: opts.input
      });
      return house;
    }),

  delete: publicProcedure
    .input(
      z.object({
        home_id: z.string(),
        person_id: z.string()
      })
    )
    .mutation(async (opts) => {
      console.log(opts.input.home_id, opts.input.person_id);
      const house = await prismaDB.home.update({
        where: {
          id: opts.input.home_id
        },
        data: {
          persons: {
            deleteMany: { where: { id: opts.input.person_id } }
          }
        }
      });
      const person = await prismaDB.person.update({
        where: {
          id: opts.input.person_id
        },
        data: {
          homes: {
            deleteMany: {
              where: { id: opts.input.home_id }
            }
          }
        }
      });
      return { house, person, status: 'success' };
    })
});
