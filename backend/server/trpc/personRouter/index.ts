import { z } from 'zod';
import { prismaDB } from '../../connection';
import { publicProcedure, router } from '../trpc';

export const personRouter = router({
  list: publicProcedure.query(async () => {
    const persons = await prismaDB.person.findMany({
      select: {
        id: true,
        name: true,
        bio: true
      }
    });
    return persons;
  }),
  get: publicProcedure.input(z.string()).query(async (opts) => {
    const person = await prismaDB.person.findUnique({
      where: {
        id: opts.input
      }
    });
    return person ?? undefined;
  }),
  list_names: publicProcedure.query(async () => {
    const persons = await prismaDB.person.findMany({
      select: {
        id: true,
        name: true
      }
    });
    return persons;
  }),

  addHome: publicProcedure
    .input(
      z.object({
        person_id: z.string(),
        home_id: z.string(),
        address: z.string(),
        rooms: z.number()
      })
    )
    .mutation(async (opts) => {
      // opts.input.
      const person = await prismaDB.person.update({
        where: {
          id: opts.input.person_id
        },
        data: {
          homes: {
            push: {
              id: opts.input.home_id,
              address: opts.input.address,
              rooms: opts.input.rooms
            }
          }
        }
      });
      const home = await prismaDB.home.update({
        where: {
          id: opts.input.home_id
        },
        data: {
          persons: {
            push: {
              id: opts.input.person_id,
              name: person.name
            }
          }
        }
      });
      return { home, person };
    })
});
