import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

// async function test() {
//     const token = await db.sMSToken.findUnique({
//         where: {
//             id: 1,
//         },
//         // include : 관계를 포함하는 데 사용, userId가 참조하고 있는 사용자 가져옴
//         include: {
//             user: true,
//         },
//     });
//     console.log(token);
// }

// test();

export default db;
