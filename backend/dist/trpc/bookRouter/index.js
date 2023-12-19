"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRouter = void 0;
const trpc_1 = require("../trpc");
const book_create_1 = require("./book_create");
const book_list_1 = require("./book_list");
const book_details_1 = require("./book_details");
const book_edit_1 = require("./book_edit");
exports.BookRouter = (0, trpc_1.router)({
    bookDetails: book_details_1.bookDetails,
    booksList: book_list_1.bookList,
    bookCreate: book_create_1.bookCreate,
    bookEdit: book_edit_1.bookEdit,
});
