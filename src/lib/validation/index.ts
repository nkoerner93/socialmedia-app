import * as z from "zod";


export const SignupValidation = z.object({
    name: z.string().min(2, {message: "The entered name is too short."}).max(30, {message: "The entered name is too long."}),
    username: z.string().min(2, {message: "The entered username must be at least 4 characters."}).max(30), 
    email: z.string().email(),
    password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
});

export const SigninValidation = z.object({
    email: z.string().email(),
    password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  });

export const PostValidation = z.object({
    caption: z.string().min(8, {message: "The entered caption must be at least 8 characters."}).max(80),
    location: z.string().min(2, {message: "The entered location must be at least 2 characters."}),
    photos: z.string().min(2, {message: "The uploaded photos must be at least 2 characters."}),
    tags: z.string().min(2, {message: "The entered tags must be at least 3 characters."}) 
})