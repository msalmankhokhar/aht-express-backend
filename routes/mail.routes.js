import { Router } from "express";
import ejs from "ejs";
import { mailer } from "../lib/index.js";
import { readFileSync } from "fs";
import { SMTP_USER } from "../config/env.js";
import { join } from "path";
import { ADMIN_RECIPIENTS } from "../constants/index.js";

const mailRouter = Router();

mailRouter.post("/landing_page_form", async (req, res) => {
    try {
        const { name, email, phone, passengers } = req.body;
        const data = { name, email, phone, passengers };
        // generating html for owner
        const templatePath = join(process.cwd(), 'assets/email_templates', 'owner_alert_landing.html');
        const template = readFileSync(templatePath, 'utf-8');
        const htmlContent = ejs.render(template, { name, data })
        // // sending Email
        await mailer.sendMail({
            from: `"Al Habib Travel" <${SMTP_USER}>`,
            to: ADMIN_RECIPIENTS,
            subject: 'New Form Alert from Landing Page',
            html: htmlContent
        })
        return res.status(200).json({ 
            success: true, 
            message: "Email sent successfully" 
        });
    } catch (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ 
            success: false,
            message: error.message || "Error sending email", 
        });
    }
});

export default mailRouter;