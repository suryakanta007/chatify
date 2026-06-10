import { email, z} from "zod";

export const redisterSchema = z.object({
    fullName: z.string().trim().min(2).max(50),
    email: z.string().email().trim(),
    password:z.string().min(6,"Password must be at least 6 characters long.").max(50,"Password must be less than 50 characters long."),
})

export const loginSchema = z.object({
    email: z.string().email().trim(),
    password:z.string()
})
