# cv

## Contact Form Email Setup

The contact form uses a Netlify function to send emails via SMTP. To enable email functionality, you need to configure the following environment variables in your Netlify site settings:

### Required Environment Variables

1. **SMTP_HOST** - Your SMTP server address
   - Gmail: `smtp.gmail.com`
   - Outlook: `smtp-mail.outlook.com`
   - Custom: Your SMTP server address

2. **SMTP_PORT** - SMTP port (usually 587 for TLS or 465 for SSL)
   - Default: `587`

3. **SMTP_USER** - Your email address used for authentication

4. **SMTP_PASSWORD** - Your email password or app-specific password
   - For Gmail: Use an [App Password](https://support.google.com/accounts/answer/185833)
   - For Outlook: Use your password or app password

5. **RECIPIENT_EMAIL** (optional) - Where contact form emails should be sent
   - If not set, emails will be sent to `SMTP_USER`

### Setting Up Environment Variables in Netlify

1. Go to your Netlify site dashboard
2. Navigate to **Site settings** > **Build & deploy** > **Environment**
3. Click **Add variable** and add each of the variables above
4. Redeploy your site for changes to take effect

### Testing Locally

For local testing, create a `.env` file in the root directory with your SMTP credentials. Note: Netlify Functions run in a serverless environment, so local testing requires using Netlify CLI (`netlify dev`).

### Email Service Examples

**Gmail:**
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

**Outlook:**
```
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=your-email@outlook.com
SMTP_PASSWORD=your-password
```