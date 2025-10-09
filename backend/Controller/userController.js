import { PrismaClient } from "@prisma/client";
import { getAuth, clerkClient } from '@clerk/express';

const prisma = new PrismaClient();

export const addUser = async (req, res) => {
    const { userId } = getAuth(req);

    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized: No active session.' });
    }

    try {
        let userProfile = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!userProfile) {
            const clerkUser = await clerkClient.users.getUser(userId);
            const userid = clerkUser.id
            const fullName = `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim();
            const email = clerkUser.emailAddresses?.[0]?.emailAddress
            const userProfile = await prisma.user.create({
                data: {
                    id: userid,       
                    email: email,
                    name: fullName,     
                },
            });

            return res.status(201).json({
                message: "User profile created and synced to DB.",
                user: userProfile
            });
        }

        res.status(200).json({
            message: "User profile already exists in DB.",
            user: userProfile
        });

    } catch (error) {
        console.error("Prisma/User creation error:", error);
        res.status(500).json({ error: "Failed to process user profile or sync data." });
    }
};