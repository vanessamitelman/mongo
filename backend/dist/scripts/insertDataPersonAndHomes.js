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
exports.insertDataPersonAndHomes = void 0;
const faker_1 = require("@faker-js/faker");
const connection_1 = require("../connection");
function insertDataPersonAndHomes(interCount = 1) {
    return __awaiter(this, void 0, void 0, function* () {
        const min_age = 20;
        for (let index = 0; index < interCount; index++) {
            const person = yield connection_1.prismaDB.person.create({
                data: {
                    name: faker_1.faker.person.firstName(),
                    bio: faker_1.faker.person.bio(),
                    age: min_age + index,
                    homes: []
                }
            });
            const home = yield connection_1.prismaDB.home.create({
                data: {
                    address: faker_1.faker.person.jobType() + ' ' + (index + 5),
                    city: faker_1.faker.person.jobArea(),
                    rooms: 3,
                    persons: [{
                            id: person.id,
                            name: person.name,
                        }]
                }
            });
            console.log({
                id: home.id,
                address: home.address,
                rooms: home.rooms
            });
            const new_person = yield connection_1.prismaDB.person.update({
                where: {
                    id: person.id,
                },
                data: {
                    homes: [
                        {
                            id: home.id,
                            address: home.address,
                            rooms: home.rooms
                        }
                    ]
                }
            });
            console.log(new_person);
        }
    });
}
exports.insertDataPersonAndHomes = insertDataPersonAndHomes;
