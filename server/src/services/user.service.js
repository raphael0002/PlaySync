import prisma from "../config/db.js";

const getAllUsers = async () => {

    // Fetch all users from the database
    const users = await prisma.user.findMany({
        select: {
            id: true,
            email: true,
            name: true,
            role: true,
            createdAt: true,
        },
    });

    return users;
}

const getUserbyId = async (id) => {
    // Fetch a user by ID from the database
    const user = await prisma.user.findUnique({
        where: { id }
    });

    if (!user) {
        throw new Error('User not found');
    }

    return user;
}

const updateUserById = async (id, data) => {
    // Update a user by ID in the database
    const user = await prisma.user.update({
        where: { id },
        data:{
            email: data.email,
            name: data.name,
        },
    });

    if (!user) {
        throw new Error('User not found');
    }

    return user;
}

const deleteUserById = async (id) => {
    // Delete a user by ID from the database
    const user = await prisma.user.delete({
        where: { id }
    });

    if (!user) {
        throw new Error('User not found');
    }

    return user;
}

export { getAllUsers,getUserbyId,updateUserById,deleteUserById};