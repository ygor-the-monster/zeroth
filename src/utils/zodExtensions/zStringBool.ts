import { z } from "zod/v4-mini";

export const zStringBool = () => z.union([z.stringbool(), z.boolean()]);
