import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long." })
    .max(20, { message: "Username must be at most 20 characters long." })
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message:
        "Username can only contain letters, numbers, underscores, and hyphens.",
    }),
  email: z.string().email({ message: "Please provide a valid email address." }),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters long." }),
  display_name: z.string().optional(),
});

export const loginSchema = z.object({
  username: z.string().min(1, { message: "Username is required." }),
  password: z.string().min(1, { message: "Password is required." }),
});
