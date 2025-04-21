import { Webhook } from "svix";
import User from "../models/User.js";

export const clerkWebhooks = async (req, res) => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
        console.log("Verifying webhook with headers:", req.headers);
        await whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            // "svix-timestamp": req.headers["svix-timestamp"],
            // "svix-signature": req.headers["svix-signature"]
        });
        console.log("Webhook verified successfully");

        const { data, type } = req.body;
        console.log("Webhook payload:", req.body);

        switch (type) {
            case "user.created":
                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    image: data.image_url
                };
                console.log("Creating user:", userData);
                await User.create(userData)
                    .then(() => console.log("User created successfully"))
                    .catch(err => console.error("User creation error:", err));
                res.json({});
                break;

            case "user.updated":
                const updatedData = {
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    image: data.image_url
                };
                console.log("Updating user:", updatedData);
                await User.findByIdAndUpdate(data.id, updatedData)
                    .then(() => console.log("User updated successfully"))
                    .catch(err => console.error("User update error:", err));
                res.json({});
                break;

            case "user.deleted":
                console.log("Deleting user with ID:", data.id);
                await User.findByIdAndDelete(data.id)
                    .then(() => console.log("User deleted successfully"))
                    .catch(err => console.error("User deletion error:", err));
                res.json({});
                break;

            default:
                console.log("Unhandled webhook type:", type);
                break;
        }
    } catch (error) {
        console.error("Webhook error:", error.message);
        res.status(400).json({ error: error.message });
    }
};