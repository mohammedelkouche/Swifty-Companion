# Swifty Companion

Swifty Companion is an Expo and React Native app for finding a 42 student by
their Intra login. It displays the student's public profile, cursus progress,
skills, and completed projects, including failed projects.

## Requirements

- Node.js and npm
- A 42 API application with the `public` scope
- Its UID and secret

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env`:

   ```bash
   cp .env.example .env
   ```

   On PowerShell, use:

   ```powershell
   Copy-Item .env.example .env
   ```

3. Fill in the local `.env` file:

   ```dotenv
   EXPO_PUBLIC_API_URL=https://api.intra.42.fr
   EXPO_PUBLIC_CLIENT_ID=your_42_uid
   EXPO_PUBLIC_CLIENT_SECRET=your_42_secret
   ```

   `.env` is ignored by Git. Never commit or print these credentials.

4. Start the app:

   ```bash
   npx expo start
   ```

   Then open it with Expo Go, an emulator, or press `w` for the web version.

## Quality checks

```bash
npx tsc --noEmit
npx expo lint
npx expo-doctor
```

## Authentication design

The app uses the OAuth2 client-credentials flow because it reads public student
data and does not sign in as a user. The access token is cached in memory,
refreshed lazily near expiration, and refreshed once after a `401` response.
Concurrent requests share the same in-flight token request.

`EXPO_PUBLIC_*` variables are embedded in the client bundle. This is acceptable
for this school project, but a production app should keep the client secret on a
backend and proxy requests to the 42 API.
