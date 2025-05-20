// Drizzle ORM schema for your Portfolio Application

import { pgTable, uuid, varchar, text, timestamp, boolean, numeric, date, pgEnum } from 'drizzle-orm/pg-core';

// Enums
export const roleEnum = pgEnum('role', ['admin', 'editor']);
export const difficultyEnum = pgEnum('difficulty', ['basic', 'intermediate', 'advanced']);
export const paymentMethodEnum = pgEnum('payment_method', ['stripe', 'paypal', 'mpesa', 'bmac']);

// Users (Admin / Editor)
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  fullName: varchar('full_name', { length: 255 }),
  email: varchar('email', { length: 255 }).unique(),
  passwordHash: varchar('password_hash', { length: 255 }),
  role: roleEnum('role'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Projects
export const projects = pgTable('projects', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 255 }),
  description: text('description'),
  techStack: text('tech_stack').array(),
  difficulty: difficultyEnum('difficulty'),
  githubUrl: varchar('github_url', { length: 255 }),
  liveUrl: varchar('live_url', { length: 255 }).nullable(),
  imageUrls: text('image_urls').array(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Blogs
export const blogs = pgTable('blogs', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 255 }),
  slug: varchar('slug', { length: 255 }).unique(),
  content: text('content'),
  coverImageUrl: varchar('cover_image_url', { length: 255 }),
  tags: text('tags').array(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Education
export const education = pgTable('education', {
  id: uuid('id').primaryKey().defaultRandom(),
  institution: varchar('institution', { length: 255 }),
  degreeOrCourse: varchar('degree_or_course', { length: 255 }),
  fieldOfStudy: varchar('field_of_study', { length: 255 }),
  startDate: date('start_date'),
  endDate: date('end_date').nullable(),
  gradeOrScore: varchar('grade_or_score', { length: 100 }).nullable(),
  location: varchar('location', { length: 255 }),
  description: text('description').nullable(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Certifications
export const certifications = pgTable('certifications', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 255 }),
  issuedBy: varchar('issued_by', { length: 255 }),
  issueDate: date('issue_date'),
  expiryDate: date('expiry_date').nullable(),
  credentialId: varchar('credential_id', { length: 255 }).nullable(),
  credentialUrl: varchar('credential_url', { length: 255 }).nullable(),
  fileUrl: varchar('file_url', { length: 255 }),
  description: text('description').nullable(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Courses
export const courses = pgTable('courses', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 255 }),
  description: text('description'),
  isPaid: boolean('is_paid').default(false),
  price: numeric('price').nullable(),
  mediaUrls: text('media_urls').array(),
  downloadableLinks: text('downloadable_links').array(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Purchases (Course Purchases or Donations)
export const purchases = pgTable('purchases', {
  id: uuid('id').primaryKey().defaultRandom(),
  userEmail: varchar('user_email', { length: 255 }),
  courseId: uuid('course_id').references(() => courses.id).nullable(),
  amount: numeric('amount'),
  message: text('message').nullable(),
  paymentMethod: paymentMethodEnum('payment_method'),
  isDonation: boolean('is_donation').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});

// Subscribers
export const subscribers = pgTable('subscribers', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).unique(),
  subscribedAt: timestamp('subscribed_at').defaultNow(),
});
