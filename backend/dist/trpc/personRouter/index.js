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
exports.personRouter = void 0;
const zod_1 = require("zod");
const connection_1 = require("../../connection");
const trpc_1 = require("../trpc");
exports.personRouter = (0, trpc_1.router)({
    list: trpc_1.publicProcedure.query(() => __awaiter(void 0, void 0, void 0, function* () {
        const persons = yield connection_1.prismaDB.person.findMany({
            select: {
                id: true,
                name: true,
                bio: true
            }
        });
        return persons;
    })),
    get: trpc_1.publicProcedure.input(zod_1.z.string()).query((opts) => __awaiter(void 0, void 0, void 0, function* () {
        const person = yield connection_1.prismaDB.person.findUnique({
            where: {
                id: opts.input
            }
        });
        return person !== null && person !== void 0 ? person : undefined;
    })),
    list_names: trpc_1.publicProcedure.query(() => __awaiter(void 0, void 0, void 0, function* () {
        const persons = yield connection_1.prismaDB.person.findMany({
            select: {
                id: true,
                name: true
            }
        });
        return persons;
    })),
    addHome: trpc_1.publicProcedure
        .input(zod_1.z.object({
        person_id: zod_1.z.string(),
        home_id: zod_1.z.string(),
        address: zod_1.z.string(),
        rooms: zod_1.z.number()
    }))
        .mutation((opts) => __awaiter(void 0, void 0, void 0, function* () {
        // opts.input.
        const person = yield connection_1.prismaDB.person.update({
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
        const home = yield connection_1.prismaDB.home.update({
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
    }))
});
