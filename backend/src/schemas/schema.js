const { z } = require("zod");

const createUserSchema = z.object({
    email: z.string().email(),
    username: z.string().min(3),
    password: z.string(),
});

const loginUserSchema = z.object({
    email: z.string().email(),
    password: z.string(),
})

const createMediaSchema = z.object({
    fileName: z.string(),
    fileType: z.enum(["image", "video"]),
    url: z.string().url(),
});

module.exports = {
    createUserSchema,
    loginUserSchema,
    createMediaSchema
};