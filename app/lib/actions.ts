"use server"; // 👈 This marks all functions here as "Backend Code"

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

// ... existing imports ...

export async function toggleTask(formData: FormData) {
  const id = formData.get("id") as string;
  const currentStatus = formData.get("status") as string;

  // Flip the logic: If pending, make it completed. If completed, make pending.
  const newStatus = currentStatus === "pending" ? "completed" : "pending";

  try {
    await sql`
      UPDATE tasks 
      SET status = ${newStatus} 
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: "Database Error: Failed to Update Task." };
  }

  // Refresh the page to show the new green circle
  revalidatePath("/dashboard");
}

// ... existing createTask function ...

export async function createTask(formData: FormData) {
  // 1. Extract data from the HTML Form
  const title = formData.get("title") as string;
  const category = formData.get("category") as string;

  // Hardcoded User ID for MVP (We fix this in the Auth chapter)
  const userId = "410544b2-4001-4271-9855-fec4b6a6442a";

  // 2. Insert into Database
  try {
    await sql`
      INSERT INTO tasks (user_id, title, status, category, date)
      VALUES (${userId}, ${title}, 'pending', ${category}, CURRENT_DATE)
    `;
  } catch (error) {
    return { message: "Database Error: Failed to Create Task." };
  }

  // 3. Revalidate & Redirect
  // This tells Next.js: "The data changed, clear the cache for the dashboard"
  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
