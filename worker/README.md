# VHS Inquiry Worker

Cloudflare Worker that handles contact form submissions from versatilehomesolutions.ca.

On every submission it:

1. Validates the honeypot.
2. Sends Jordan a notification email (via Resend) with all form fields and any uploaded photos as attachments.
3. Sends the client an auto-reply with service-specific follow-up questions, picked based on the `service` dropdown value.

## First-time deploy

From `worker/`:

```bash
# 1. Install deps (already done if you've cd'd in here)
npm install

# 2. Authenticate wrangler with your Cloudflare account
npx wrangler login

# 3. Save the Resend API key as a Worker secret
npx wrangler secret put RESEND_API_KEY
# Paste the key when prompted.

# 4. Deploy
npx wrangler deploy
```

After step 4, wrangler prints the Worker URL, e.g.:

```
https://vhs-inquiry.<your-subdomain>.workers.dev
```

That URL goes into the GitHub repo as a build secret named `VITE_FORM_ENDPOINT`
(Settings -> Secrets and variables -> Actions -> New repository secret).

## Editing the auto-reply content

Per-service question content lives in `src/templates.ts`. Edit it, redeploy with
`npx wrangler deploy`. No frontend redeploy needed.

## Logs

```bash
npx wrangler tail
```

Streams live logs from the deployed Worker. Useful if a submission fails.
