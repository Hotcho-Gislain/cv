# Email Setup Guide

This guide will help you set up the contact form email functionality for your portfolio website.

## Prerequisites

- A Netlify account (sign up at netlify.com)
- An email account for sending messages (Gmail recommended for simplicity)

## Step 1: Get SMTP Credentials

### Option A: Using Gmail (Recommended for beginners)

1. **Enable 2-Step Verification:**
   - Go to https://myaccount.google.com/security
   - Under "Signing in to Google", enable "2-Step Verification"

2. **Create an App Password:**
   - Search for "App passwords" in your Google Account
   - Click "App passwords"
   - Select "Mail" and "Other (Custom name)"
   - Name it "Portfolio Contact Form"
   - Click "Generate"
   - **Copy the 16-character password** (you won't see it again!)

3. **Your Gmail SMTP Settings:**
   ```
   SMTP_HOST: smtp.gmail.com
   SMTP_PORT: 587
   SMTP_USER: your-gmail@gmail.com
   SMTP_PASSWORD: your-16-char-app-password
   RECIPIENT_EMAIL: your-gmail@gmail.com
   ```

### Option B: Using SendGrid (Recommended for production)

1. Sign up at https://sendgrid.com (Free tier: 100 emails/day)
2. Create an API Key
3. Use these settings:
   ```
   SMTP_HOST: smtp.sendgrid.net
   SMTP_PORT: 587
   SMTP_USER: apikey
   SMTP_PASSWORD: your-sendgrid-api-key
   RECIPIENT_EMAIL: your-email@example.com
   ```

## Step 2: Deploy to Netlify

### First Time Deployment:

1. **Install Netlify CLI** (optional, for local testing):
   ```bash
   npm install -g netlify-cli
   ```

2. **Deploy via Netlify Website:**
   - Go to https://app.netlify.com
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository
   - Or drag and drop the `cv` folder

3. **Or Deploy via CLI:**
   ```bash
   cd cv
   netlify deploy --prod
   ```

## Step 3: Configure Environment Variables in Netlify

1. Go to your Netlify dashboard
2. Select your deployed site
3. Navigate to **Site configuration → Environment variables**
4. Click "Add a variable" and add each of these:

   | Key | Value | Example |
   |-----|-------|---------|
   | `SMTP_HOST` | Your SMTP server | `smtp.gmail.com` |
   | `SMTP_PORT` | SMTP port | `587` |
   | `SMTP_USER` | Your email/username | `hotchogislain5@gmail.com` |
   | `SMTP_PASSWORD` | Your password/app password | `abcd efgh ijkl mnop` |
   | `RECIPIENT_EMAIL` | Where to receive messages | `hotchogislain5@gmail.com` |

5. **Save** and **Redeploy** your site for changes to take effect

## Step 4: Test Your Contact Form

1. Visit your deployed website
2. Navigate to the Contact section
3. Fill out the form with test data
4. Click "Send Message"
5. Check your recipient email for the message

## Troubleshooting

### Email not sending?

1. **Check Netlify Function Logs:**
   - Go to Netlify Dashboard → Functions → View logs
   - Look for errors in the `contact` function

2. **Gmail "Less secure app access" error:**
   - Make sure you're using an App Password, not your regular password
   - Verify 2-Step Verification is enabled

3. **SMTP Authentication Failed:**
   - Double-check all environment variables
   - Ensure no extra spaces in the values
   - Verify your SMTP credentials are correct

4. **Test locally:**
   ```bash
   cd cv
   netlify dev
   ```
   Then visit `http://localhost:8888` and test the form

### Common Issues:

- **500 Error**: Environment variables not set correctly
- **Network Error**: Function URL might be wrong (should be `/.netlify/functions/contact`)
- **No email received**: Check spam folder, verify RECIPIENT_EMAIL

## Security Notes

- Never commit your `.env` file or expose your SMTP credentials
- Use App Passwords instead of your main account password
- Monitor your email sending limits (Gmail: ~500/day, SendGrid Free: 100/day)
- Consider rate limiting if you get spam submissions

## Local Development (Optional)

For testing locally with environment variables:

1. Create a `.env` file in the `cv` folder:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=your-app-password
   RECIPIENT_EMAIL=your-email@gmail.com
   ```

2. Add `.env` to your `.gitignore`:
   ```
   .env
   node_modules/
   ```

3. Run locally:
   ```bash
   netlify dev
   ```

## Success!

Once configured, your contact form will:
- ✅ Send emails to your specified recipient
- ✅ Include the sender's name, email, subject, and message
- ✅ Allow you to reply directly to the sender
- ✅ Show success/error messages to users

---

**Need help?** Check the Netlify documentation: https://docs.netlify.com/functions/overview/

