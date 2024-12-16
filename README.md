# Emailer Service - README

This project is an email service built using **Node.js**, **Express**, and **Nodemailer**. The service supports sending plain text emails, emails with attachments, and a customizable greeting email with Handlebars templates.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [POST `/send`](#post-send)
  - [POST `/sendWithAttachment`](#post-sendwithattachment)
  - [POST `/greetings`](#post-greetings)
- [Environment Variables](#environment-variables)
- [License](#license)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/emailer-service.git
   ```

2. Install dependencies:

   ```bash
   cd emailer-service
   npm install
   ```

3. Make sure you have Node.js installed on your machine. You can download it from [here](https://nodejs.org/).

## Configuration

Before running the service, you'll need to configure the environment variables. You can create a `.env` file in the root of the project and add the following variables:

```env
PORT=3000

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=example@gmail.com
SMTP_PASS=your-smtp-password
DEFAULT_SENDER=example@gmail.com

NODE_ENV=production

OAuth_CLIENT_ID=your-oauth-client-id
OAuth_CLIENT_SECRET=your-oauth-client-secret
OAuth_REFRESH_TOKEN=your-oauth-refresh-token
OAuth_REDIRECT_URL=https://developers.google.com/oauthplayground

COMPANY_LOGO=https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/logos/2024/03_26/logo_header_01.svg
```

### Environment Variables:

- **PORT**: Port on which the server will run.
- **SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS**: Gmail SMTP server details for sending emails.
- **DEFAULT_SENDER**: Default email sender address.
- **NODE_ENV**: Environment (e.g., `production`).
- **OAuth_* variables**: OAuth credentials for Gmail.
- **COMPANY_LOGO**: The URL of the company logo to be used in the greeting email template.

> Replace `your-smtp-password`, `your-oauth-client-id`, `your-oauth-client-secret`, and `your-oauth-refresh-token` with your actual values.

## Usage

1. Run the application:

   ```bash
   npm start
   ```

2. The email service will be available at `http://localhost:3000`.

## API Endpoints

### POST `/send`

Sends a plain text email to a recipient.

#### Request Body:

```json
{
  "to": "recipient@example.com",
  "subject": "Email Subject",
  "text": "Email body text"
}
```

#### Response:

```json
{
  "message": "Email sent",
  "messageId": "message-id"
}
```

### POST `/sendWithAttachment`

Sends an email with an attachment.

#### Request Body:

```json
{
  "to": "recipient@example.com",
  "subject": "Email Subject",
  "text": "Email body text",
  "path": "/path/to/attachment"
}
```

#### Response:

```json
{
  "message": "Email sent",
  "messageId": "message-id"
}
```

### POST `/greetings`

Sends a greeting email with a Handlebars template.

#### Request Body:

```json
{
  "to": "recipient@example.com",
  "name": "John Doe"
}
```

#### Response:

```json
{
  "message": "Email sent",
  "messageId": "message-id"
}
```

## Environment Variables

Ensure that the following environment variables are set correctly in your `.env` file:

- **PORT**: Port number to run the server.
- **SMTP_HOST**: SMTP server hostname (e.g., `smtp.gmail.com`).
- **SMTP_PORT**: SMTP server port (e.g., `587` for Gmail).
- **SMTP_USER**: Email address of the sender.
- **SMTP_PASS**: Password or app-specific password for the sender’s email account.
- **DEFAULT_SENDER**: Default sender email address.
- **NODE_ENV**: Environment setting (`production`, `development`, etc.).
- **OAuth_* variables**: OAuth credentials for Gmail authentication.
- **COMPANY_LOGO**: URL of the logo to be used in greeting emails.

## License

This project is licensed under the MIT License.

---

This should give you a fully functional emailer service with basic functionality for sending text emails, email with attachments, and greeting emails using templates. Let me know if you need further adjustments!
