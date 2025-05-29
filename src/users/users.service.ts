import {eq} from 'drizzle-orm';
import { db } from '../db';

import {User, NewUser, users} from '../drizzle/schema';


//Fetch all users
export async function getAllUsers(): Promise<User[]> {
  return db.select().from(users);
}