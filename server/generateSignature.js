import { Webhook } from "svix";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.CLERK_WEBHOOK_SECRET;
if (!secret) {
    console.error("CLERK_WEBHOOK_SECRET is not set in .env");
    process.exit(1);
}

const payload = JSON.stringify({
    data: {
        id: "user_12345",
        first_name: "John",
        last_name: "Doe",
        email_addresses: [{ email_address: "john.doe@example.com" }],
        image_url: "https://example.com/profile.jpg"
    },
    type: "user.created"
});

const wh = new Webhook(secret);
const svixId = "test-id-123";
const svixTimestamp = Math.floor(Date.now() / 1000).toString(); // String timestamp in seconds
const signature = wh.sign(svixId, svixTimestamp, payload);

console.log("Svix-Id:", svixId);
console.log("Svix-Timestamp:", svixTimestamp);
console.log("Svix-Signature:", signature);
console.log("Payload:", payload);