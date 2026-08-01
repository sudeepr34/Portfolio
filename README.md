# Sudeep Reddy Portfolio

Multi-page portfolio website for Sudeep Reddy, built from the resume PDF in this folder.

## What is included

- Home page with hero and featured links
- About page
- Projects page
- Experience, skills, and certifications page
- Contact page
- Resume PDF download link
- Vercel security headers in `vercel.json`
- Basic secret hygiene in `.gitignore`

## How to use

Open `index.html` in a browser or host the folder on a static site host.

## GoDaddy domain setup

If you want to use your GoDaddy domain, the simplest path is:

1. Deploy this folder to Vercel, Netlify, or another static hosting provider.
2. Add `iamsudeep.in` as the custom domain in the host settings.
3. Update the DNS records in GoDaddy to point `iamsudeep.in` to the host.
4. Wait for DNS propagation, then verify the site on your custom domain.

## Notes

- The projects page already uses your specific GitHub repositories.
- Update contact details if you want a different public email or phone number.
- Public resume contact details are intentionally visible. Do not commit private keys, API tokens, `.env` files, or cloud credentials.
