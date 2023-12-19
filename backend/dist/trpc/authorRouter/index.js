"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorRouter = void 0;
const trpc_1 = require("../trpc");
const delete_author_1 = require("./delete_author");
const get_author_details_1 = require("./get_author_details");
const get_authors_1 = require("./get_authors");
exports.AuthorRouter = (0, trpc_1.router)({
    list: get_authors_1.getAuthors,
    details: get_author_details_1.getAuthorsDetails,
    delete: delete_author_1.deleteAuthor,
});
