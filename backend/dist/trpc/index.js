"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const trpc_1 = require("./trpc");
const authorRouter_1 = require("./authorRouter");
const bookRouter_1 = require("./bookRouter");
const homeRouter_1 = require("./homeRouter");
const personRouter_1 = require("./personRouter");
exports.appRouter = (0, trpc_1.router)({
    author: authorRouter_1.AuthorRouter,
    book: bookRouter_1.BookRouter,
    home: homeRouter_1.homeRouter,
    person: personRouter_1.personRouter
});
