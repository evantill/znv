import {parseEnv} from "znv";
import {z} from "zod";

export const {NICKNAME, LLAMA_COUNT, COLOR, SHINY} = parseEnv(process.env, {
  NICKNAME: z.string().min(1),
  LLAMA_COUNT: z.number().int().positive(),
  COLOR: z.enum(["red", "blue"]),
  SHINY: z.boolean().default(true),
});

console.log([NICKNAME, LLAMA_COUNT, COLOR, SHINY].join(", "));
