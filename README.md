# Ninvax Website

This repository contains the source for Christopher Moore's personal website, **ninvax**.

## Pages
- `index.html` – home page with expandable sections for hobbies and social links.
- `photography.html` – placeholder for photography work.

## Contact Form Setup

The contact form posts to `/api/contact` on the Node.js server. Configure the
following environment variables before starting the server so messages can be
sent via SMTP:

- `SMTP_HOST` – SMTP server hostname
- `SMTP_PORT` – SMTP server port
- `SMTP_SECURE` – set to `true` if using TLS/SSL
- `SMTP_USER` and `SMTP_PASS` – authentication credentials
- `SMTP_FROM` – optional default sender address

Submitted messages will be delivered to `ninvax@icloud.com`.
