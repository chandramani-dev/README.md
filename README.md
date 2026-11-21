# Ganga Rakshak — college project starter

A responsive awareness website with a community report form. The form stores submissions in Supabase after you complete the setup below.

## 1. Open the project

1. Download and unzip `ganga-rakshak.zip`.
2. Open the `ganga-rakshak` folder in Visual Studio Code.
3. Install the VS Code extension **Live Server**.
4. Right-click `index.html` and choose **Open with Live Server**.

You can also open `index.html` directly, but Live Server is recommended.

## 2. Create the database

1. Create a free project at https://supabase.com/.
2. Open **SQL Editor** in your Supabase project.
3. Choose **New query**, paste the contents of `supabase-setup.sql`, and click **Run**.
4. Open **Project Settings → API** (or the project's Connect/API details).
5. Copy the **Project URL** and the **anon / publishable key**. Never use the `service_role` or secret key in browser code.

## 3. Connect the website

Open `js/config.js` and replace:
- `YOUR_SUPABASE_URL` with your Project URL.
- `YOUR_SUPABASE_ANON_KEY` with your anon / publishable key.

Save the file and refresh the website.

## 4. Test the form

1. Fill every field in the Report a concern form.
2. Submit it.
3. In Supabase, open **Table Editor → reports**.
4. Confirm the new row appears.

If it fails, check the browser developer console and confirm the SQL policy exists.

## 5. Publish with Netlify

1. Create an account at https://www.netlify.com/.
2. Choose **Add new project → Deploy manually** (the wording may vary).
3. Drag the unzipped project folder into the deploy area.
4. Open the generated website URL and test the form again.

Keep `js/config.js` configured with the same Supabase URL and anon key before deploying.

## Important project notes

- The Supabase anon/publishable key is intended for browser use; database security comes from Row Level Security and policies. Never expose a service-role/secret key.
- This starter intentionally does not provide a public page to read reports.
- For a real public service, add spam protection, rate limiting, moderation, privacy notice, and a secure process for handling reports. This college demo does not send reports to authorities or verify claims.
- Do not collect sensitive personal data. Use fictional/sample data during classroom demonstrations.

## Project structure

```text
ganga-rakshak/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── app.js
│   └── config.js
├── supabase-setup.sql
└── README.md
```
