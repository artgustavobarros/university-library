"use server";

import { eq } from "drizzle-orm";
import { db } from "../../../database/drizzle";
import { users } from "../../../database/schema";
import { hash } from "bcryptjs";
import { signIn } from "../../../auth";
import { headers } from "next/headers";
import rateLimit from "../rate-limit";
import { redirect } from "next/navigation";

export async function signInWithCredentials(
  params: Pick<AuthCredentials, "email" | "password">
) {
  const { email, password } = params;

  const ip = (await headers()).get("x-fowarded-for") || "127.0.0.1";

  const { success } = await rateLimit.limit(ip);

  if (!success) return redirect("/too-fast");

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result.error) {
      return { success: false, error: result.error };
    }

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Signin error." };
  }
}

export async function signUp(params: AuthCredentials) {
  const { fullName, email, password, universityCard, universityId } = params;

  const ip = (await headers()).get("x-fowarded-for") || "127.0.0.1";

  const { success } = await rateLimit.limit(ip);

  if (!success) return redirect("/too-fast");

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    return { success: false, error: "User already exists" };
  }

  const hashedPassword = await hash(password, 10);

  try {
    await db.insert(users).values({
      fullName,
      email,
      universityCard,
      universityId,
      password: hashedPassword,
    });

    await signInWithCredentials({ email, password });

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Signup error." };
  }
}
