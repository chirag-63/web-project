import { Webhook } from "svix";
import { headers } from "next/headers";
import connectToDB from "@/lib/db";
import User from "@/models/userSchema";

export async function POST(req) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", {
      status: 400,
    });
  }

  // Do something with payload
  // For this guide, log payload to console
  const eventData = evt.data;
  const eventType = evt.type;
  console.log(
    `Received webhook with ID ${eventData.id} and event type of ${eventType}`
  );

  if (eventType === "user.created") {
    try {
      await connectToDB();
      const userCreated = await User.create({
        clerkUserId: eventData.id,
        firstName: eventData.first_name,
        lastName: eventData.last_name,
        email: eventData?.email_addresses[0]?.email_address,
        googleID: eventData?.external_accounts[0]?.google_id,
        githubID: eventData?.external_accounts[1]?.github_id,
      });

      console.log(userCreated);
    } catch (error) {
      console.log(error);
      throw error;
    }
  } else if (eventType === "user.updated") {
    
  } else if (eventType === "user.deleted") {
    try {
      await connectToDB();
      await User.deleteOne({
        clerkUserId: eventData.id,
      });
      console.log(`${eventData.id} was deleted`);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  return new Response("Webhook received", { status: 200 });
}
