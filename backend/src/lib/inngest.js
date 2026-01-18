import { Inngest } from "inngest";
import { connectDB } from "./db.js";
import User from "../models/User.js";

export const inngest = new Inngest({ id: "NextRound" });

/**
 * Sync user on Clerk user creation
 */
const syncUser = inngest.createFunction(
  { id: "sync-user" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    await connectDB();

    const {
      id,
      email_addresses,
      first_name,
      last_name,
      image_url,
    } = event.data;

    const email = email_addresses?.[0]?.email_address;

    if (!email) {
      throw new Error("User email not found in Clerk event");
    }

    const newUser = {
      clerkId: id,
      email,
      name: [first_name, last_name].filter(Boolean).join(" "),
      profileImage: image_url,
    };

    // Idempotent write (safe for retries)
    await User.findOneAndUpdate(
      { clerkId: id },
      newUser,
      { upsert: true, new: true }
    );
  }
);

const deleteUserFromDB = inngest.createFunction(
  { id: "delete-user-from-db" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    await connectDB();

    const { id } = event.data;
    await User.deleteOne({ clerkId: id });
  }
);

export const functions = [syncUser, deleteUserFromDB];
