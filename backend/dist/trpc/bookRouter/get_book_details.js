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
exports.getBookDetails = void 0;
const zod_1 = require("zod");
const trpc_1 = require("../trpc");
const connection_1 = require("../../connection");
exports.getBookDetails = trpc_1.publicProcedure
    .input(zod_1.z.string())
    .query((opts) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield connection_1.prismaDB.book.findFirst({
        where: {
            id: opts.input
        }
    });
    return book;
}));
