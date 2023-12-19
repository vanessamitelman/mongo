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
exports.generateData = void 0;
const client_1 = require("@prisma/client");
const faker_1 = require("@faker-js/faker");
const prisma = new client_1.PrismaClient();
function generateData() {
    return __awaiter(this, void 0, void 0, function* () {
        // Insert Dummy Authors
        const author1 = yield prisma.author.create({
            data: {
                name: faker_1.faker.person.firstName(),
                bio: faker_1.faker.person.jobTitle(),
            },
        });
        const author2 = yield prisma.author.create({
            data: {
                name: faker_1.faker.person.firstName(),
                bio: faker_1.faker.person.jobTitle(),
            },
        });
        // Insert Dummy Books
        yield prisma.book.create({
            data: {
                title: faker_1.faker.lorem.words(3),
                description: faker_1.faker.lorem.words(15),
                publishedAt: new Date(),
                authorId: author1.id,
            },
        });
        yield prisma.book.create({
            data: {
                title: faker_1.faker.lorem.words(3),
                description: faker_1.faker.lorem.words(15),
                publishedAt: new Date(),
                authorId: author2.id,
            },
        });
        console.log('Dummy data inserted');
    });
}
exports.generateData = generateData;
// main()
//     .catch((e) => {
//         throw e;
//     })
//     .finally(async () => {
//         await prisma.$disconnect();
//     });
