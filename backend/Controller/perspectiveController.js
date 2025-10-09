import { PrismaClient } from "@prisma/client";
import { getAuth, clerkClient } from '@clerk/express';

const prisma = new PrismaClient();

export const createPerspective = async (req, res) => {
    const { title, content } = req.body;

    const { userId } = getAuth(req);

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized. Please sign in." });
    }

    if (!title || !content) {
        return res.status(400).json({ message: "Please fill all required fields (title and content)." });
    }

    try {
        let dbUser = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!dbUser) {
            const clerkUser = await clerkClient.users.getUser(userId);

            const fullName = `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim();
            const emailAddress = clerkUser.emailAddresses?.[0]?.emailAddress || null;

            dbUser = await prisma.user.create({
                data: {
                    id: userId,
                    name: fullName,
                    email: emailAddress,
                }
            });
        }

        const perspective = await prisma.perspective.create({
            data: {
                title,
                content,
                authorId: userId
            }
        });

        res.status(201).json(perspective);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to create perspective.", details: err.message });
    }
};

export const getOwnPerspectives = async (req, res) => {
    const { userId } = getAuth(req);

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized. Please sign in to view your perspectives." });
    }

    try {
        const perspectives = await prisma.perspective.findMany({
            where: {
                authorId: userId, // <--- เพิ่มเงื่อนไขการกรอง
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                    }
                }
            }
        });

        res.json(perspectives);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch own perspectives.", details: err.message });
    }
};