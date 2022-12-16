"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const client_1 = require("@prisma/client");
const express_1 = tslib_1.__importDefault(require("express"));
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/users', (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    console.log(req);
    const users = yield prisma.user.findMany();
    res.json(users);
}));
app.get('/feed', (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { searchString, skip, take, orderBy } = req.query;
    const or = searchString
        ? {
            OR: [
                { title: { contains: searchString } },
                { content: { contains: searchString } },
            ],
        }
        : {};
    const posts = yield prisma.post.findMany({
        where: Object.assign({ published: true }, or),
        include: { author: true },
        take: Number(take) || undefined,
        skip: Number(skip) || undefined,
        orderBy: {
            updatedAt: orderBy,
        },
    });
    res.json({
        query: req.query,
        data: posts
    });
}));
const server = app.listen(3000, () => console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api`));
server;
//# sourceMappingURL=server.js.map