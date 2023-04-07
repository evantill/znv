import {describe, expect, test} from '@jest/globals';
import {z} from "zod";
import {parseEnv} from "znv";

describe("testing using latest zod version", () => {

  test('readme example with a valid environment', () => {
    //given
    const env = {
      NICKNAME: 'evantill',
      LLAMA_COUNT: '666',
      COLOR: 'red'
    }
    //when
    const {NICKNAME, LLAMA_COUNT, COLOR, SHINY} = parseEnv(env, {
      NICKNAME: z.string().min(1),
      LLAMA_COUNT: z.number().int().positive(),
      COLOR: z.enum(["red", "blue"]),
      SHINY: z.boolean().default(true),
    });
    //then
    const actual = [NICKNAME, LLAMA_COUNT, COLOR, SHINY].join(", ");
    expect(actual).toBe('evantill, 666, red, true');
  });

  test('readme example with an empty environment', () => {
    //given
    const env = {}
    //when
    const parseInvalidEnv = () => {
      parseEnv(env, {
        NICKNAME: z.string().min(1),
        LLAMA_COUNT: z.number().int().positive(),
        COLOR: z.enum(["red", "blue"]),
        SHINY: z.boolean().default(true),
      });
    }
    //then
    expect(parseInvalidEnv).toThrowErrorMatchingSnapshot()
  })

});
