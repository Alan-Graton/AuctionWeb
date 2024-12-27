import z from "zod";

const bidSchema = z.object({
  price: z.string().trim(),
});

export type BidSchema = z.infer<typeof bidSchema>;

const DEFAULT_VALUES = {
  price: "0",
};

export { bidSchema, DEFAULT_VALUES };
