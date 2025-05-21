// src/db/schema.ts
import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  boolean,
  numeric,
  date,
  pgEnum
} from 'drizzle-orm/pg-core';

// Enums
export const roleEnum = pgEnum('role', ['admin', 'editor']);
export const difficultyEnum = pgEnum('difficulty', ['basic', 'intermediate', 'advanced']);
export const paymentMethodEnum = pgEnum('payment_method', ['stripe', 'paypal', 'mpesa', 'bmac']);

// Users (Admin / Editor)
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  fullName: varchar('full_name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  role: roleEnum('role').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Projects
export const projects = pgTable('projects', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  techStack: text('tech_stack').array().notNull(),
  difficulty: difficultyEnum('difficulty').notNull(),
  githubUrl: varchar('github_url', { length: 255 }).notNull(),
  liveUrl: varchar('live_url', { length: 255 }),
  imageUrls: text('image_urls').array().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Blogs
export const blogs = pgTable('blogs', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).unique().notNull(),
  content: text('content').notNull(),
  coverImageUrl: varchar('cover_image_url', { length: 255 }).notNull(),
  tags: text('tags').array().notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Education
export const education = pgTable('education', {
  id: uuid('id').primaryKey().defaultRandom(),
  institution: varchar('institution', { length: 255 }).notNull(),
  degreeOrCourse: varchar('degree_or_course', { length: 255 }).notNull(),
  fieldOfStudy: varchar('field_of_study', { length: 255 }).notNull(),
  startDate: date('start_date').notNull(),
  endDate: date('end_date'),
  gradeOrScore: varchar('grade_or_score', { length: 100 }),
  location: varchar('location', { length: 255 }).notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Certifications
export const certifications = pgTable('certifications', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 255 }).notNull(),
  issuedBy: varchar('issued_by', { length: 255 }).notNull(),
  issueDate: date('issue_date').notNull(),
  expiryDate: date('expiry_date'),
  credentialId: varchar('credential_id', { length: 255 }),
  credentialUrl: varchar('credential_url', { length: 255 }),
  fileUrl: varchar('file_url', { length: 255 }).notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Courses
export const courses = pgTable('courses', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  isPaid: boolean('is_paid').default(false).notNull(),
  price: numeric('price', { precision: 10, scale: 2 }),
  mediaUrls: text('media_urls').array().notNull(),
  downloadableLinks: text('downloadable_links').array(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Purchases (Course Purchases or Donations)
export const purchases = pgTable('purchases', {
  id: uuid('id').primaryKey().defaultRandom(),
  userEmail: varchar('user_email', { length: 255 }).notNull(),
  courseId: uuid('course_id').references(() => courses.id),
  amount: numeric('amount', { precision: 10, scale: 2 }).notNull(),
  message: text('message'),
  paymentMethod: paymentMethodEnum('payment_method').notNull(),
  isDonation: boolean('is_donation').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Subscribers
export const subscribers = pgTable('subscribers', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  subscribedAt: timestamp('subscribed_at').defaultNow().notNull(),
});

// Export the schema type for TypeScript
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
export type Blog = typeof blogs.$inferSelect;
export type NewBlog = typeof blogs.$inferInsert;
export type Education = typeof education.$inferSelect;
export type NewEducation = typeof education.$inferInsert;
export type Certification = typeof certifications.$inferSelect;
export type NewCertification = typeof certifications.$inferInsert;
export type Course = typeof courses.$inferSelect;
export type NewCourse = typeof courses.$inferInsert;
export type Purchase = typeof purchases.$inferSelect;
export type NewPurchase = typeof purchases.$inferInsert;
export type Subscriber = typeof subscribers.$inferSelect;
export type NewSubscriber = typeof subscribers.$inferInsert;