import { pgTable, uuid, varchar, text, timestamp } from 'drizzle-orm/pg-core';

export const gadgets = pgTable('gadgets', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  status: varchar('status', { length: 20 }).notNull(), // Available, Deployed, Destroyed, Decommissioned
  decommissionedAt: timestamp('decommissioned_at'),
});

export type Gadget = typeof gadgets.$inferSelect;
export type NewGadget = typeof gadgets.$inferInsert; 