import { config } from "dotenv";

config({path: `.env.local`});

export const {
    
    PORT,
    ADMIN_PASSWORD,
    MONGODB_URI,
    SMTP_HOST,
    SMTP_PASS,
    SMTP_PORT,
    SMTP_USER,

} = process.env;