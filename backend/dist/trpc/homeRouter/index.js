"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.homeRouter = void 0;
const zod_1 = require("zod");
const connection_1 = require("../../connection");
const trpc_1 = require("../trpc");
exports.homeRouter = (0, trpc_1.router)({
    list: trpc_1.publicProcedure.query(() => __awaiter(void 0, void 0, void 0, function* () {
        const homes = yield connection_1.prismaDB.home.findMany();
        return homes;
    })),
    get: trpc_1.publicProcedure.input(zod_1.z.string()).query((opts) => __awaiter(void 0, void 0, void 0, function* () {
        const home = yield connection_1.prismaDB.home.findUnique({
            where: {
                id: opts.input
            }
        });
        return home !== null && home !== void 0 ? home : undefined;
    })),
    addPerson: trpc_1.publicProcedure
        .input(zod_1.z.object({
        home_id: zod_1.z.string(),
        name: zod_1.z.string(),
        person_id: zod_1.z.string()
    }))
        .mutation((opts) => __awaiter(void 0, void 0, void 0, function* () {
        // opts.input.
        const home = yield connection_1.prismaDB.home.update({
            where: {
                id: opts.input.home_id
            },
            data: {
                persons: {
                    push: { id: opts.input.person_id, name: opts.input.name }
                }
            }
        });
        const person = yield connection_1.prismaDB.person.update({
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
    })),
    createHouse: trpc_1.publicProcedure
        .input(zod_1.z.object({
        address: zod_1.z.string(),
        city: zod_1.z.string(),
        rooms: zod_1.z.number(),
        persons: zod_1.z.array(zod_1.z.object({
            id: zod_1.z.string(),
            name: zod_1.z.string()
        }))
    }))
        .mutation((opts) => __awaiter(void 0, void 0, void 0, function* () {
        const house = yield connection_1.prismaDB.home.create({
            data: opts.input
        });
        return house;
    })),
    delete: trpc_1.publicProcedure
        .input(zod_1.z.object({
        home_id: zod_1.z.string(),
        person_id: zod_1.z.string()
    }))
        .mutation((opts) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(opts.input.home_id, opts.input.person_id);
        const house = yield connection_1.prismaDB.home.update({
            where: {
                id: opts.input.home_id
            },
            data: {
                persons: {
                    deleteMany: { where: { id: opts.input.person_id } }
                }
            }
        });
        const person = yield connection_1.prismaDB.person.update({
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
    }))
});
