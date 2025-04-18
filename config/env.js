import { config } from "dotenv";

config({path: `.env.local`});

export const {
    
    PORT,
    ADMIN_PASSWORD,
    MONGODB_URI,
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,

} = process.env;