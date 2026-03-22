import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.use(express.json());

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Estimate form submission endpoint
  app.post("/api/estimate", async (req, res) => {
    const { fullName, email, phone, address, service, timeframe, description } =
      req.body;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const htmlBody = `
      <h2>New Estimate Request</h2>
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Address:</strong> ${address}</p>
      <p><strong>Service:</strong> ${service}</p>
      <p><strong>Timeframe:</strong> ${timeframe}</p>
      <h3>Description</h3>
      <p>${description}</p>
    `;

    try {
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: "jordan@versatilehomesolutions.ca",
        replyTo: email,
        subject: `New Estimate Request from ${fullName} - ${service}`,
        html: htmlBody,
      });

      res.json({ success: true });
    } catch (err) {
      console.error("Failed to send email:", err);
      res.status(500).json({ error: "Failed to send email" });
    }
  });

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
