import { relations, sql } from 'drizzle-orm';
import {
  boolean,
  date,
  integer,
  interval,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

export const taskPriority = pgEnum('task_priority', ['low', 'medium', 'high']);

export const users = pgTable('users', {
  id: text('id')
    .primaryKey()
    .default(sql`(requesting_id())`),
  first_name: text('first_name').notNull(),
  last_name: text('last_name').notNull(),
  full_name: text('full_name').notNull(),
  date_of_birth: date('date_of_birth', { mode: 'string' }),
  email_address: text('email_address').notNull(),
  external_accounts: text('external_accounts').array().default([]),
  image_url: text('image_url'),
});

export const usersRelations = relations(users, ({ many }) => ({
  usersToVillages: many(usersToVillages),
  usersToTasks: many(usersToTasks),
}));

export const villages = pgTable('villages', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  createdAt: date('created_at', { mode: 'date' }).notNull(),
  values: text('values')
    .array()
    .default([
      'Love',
      'Joy',
      'Peace',
      'Patience',
      'Kindness',
      'Goodness',
      'Faithfulness',
    ])
    .notNull(),
});

export const villagesRelations = relations(villages, ({ many }) => ({
  usersToVillages: many(usersToVillages),
  villagesToTasks: many(Tasks),
}));

export const usersToVillages = pgTable(
  'users_to_villages',
  {
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),

    villageId: integer('village_id')
      .notNull()
      .references(() => villages.id, { onDelete: 'cascade' }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.villageId] }),
  })
);

export const usersToVillagesRelations = relations(
  usersToVillages,
  ({ one }) => ({
    village: one(villages, {
      fields: [usersToVillages.villageId],
      references: [villages.id],
    }),
    user: one(users, {
      fields: [usersToVillages.userId],
      references: [users.id],
    }),
  })
);

export const Tasks = pgTable('tasks', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
  villageId: integer('village_id').notNull(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  timestamp: timestamp('date_and_time').notNull(),
  isRecurring: boolean('is_recurring').notNull(),
  frequency: interval('frequency', {
    fields: 'day',
  }),
  peopleRequired: integer('people_required').notNull(),
  valuesAssociated: text('values_associated').array(),
  priority: taskPriority('task_priority').notNull(),
  completed: boolean('completed').notNull(),
});

export const tasksRelations = relations(Tasks, ({ one }) => ({
  village: one(villages, {
    fields: [Tasks.villageId],
    references: [villages.id],
  }),
}));

export const usersToTasks = pgTable(
  'users_to_tasks',
  {
    userId: text('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    task: integer('task_id')
      .notNull()
      .references(() => Tasks.id, { onDelete: 'cascade' }),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.task] }),
  })
);

export const usersToTasksRelations = relations(usersToTasks, ({ one }) => ({
  task: one(Tasks, {
    fields: [usersToTasks.task],
    references: [Tasks.id],
  }),
  user: one(users, {
    fields: [usersToTasks.userId],
    references: [users.id],
  }),
}));
