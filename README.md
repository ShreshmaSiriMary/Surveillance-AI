# Survelliance-AI

React/Vite public reporting interface with an Express, MongoDB Atlas, and Mongoose API. The existing dashboard, map, camera, and image analysis screens are visual demonstrations; they do not use live feeds or identify people. The case submission and moderation flow uses the API when configured.

> This application is not an official police or emergency reporting service. Contact local emergency services for urgent help. Do not submit identity document numbers or biometric information.

## Structure

- `src/` — React user interface, authentication context, and API client.
- `server/src/server.js` — Express middleware, validation, models, and API routes.
- `server/src/index.js` — connects MongoDB and starts the API.
- `server/scripts/create-admin.js` — creates the first administrator without default credentials.
- `server/test/` — API tests using an isolated MongoDB memory server.

## Requirements and local setup

- Node.js 20.19+ (Vite 8) and npm.
- A MongoDB Atlas database for normal local development.

Install frontend and backend dependencies in separate terminals:

```sh
npm install
cd server
npm install
```

Copy `server/.env.example` to `server/.env`, fill in `MONGODB_URI`, and replace `JWT_SECRET` with a private random secret of at least 32 characters. Create the first administrator with `ADMIN_NAME`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` (12 or more characters), then run:

```sh
cd server
npm run create-admin
npm run dev
```

In a second terminal, run the frontend:

```sh
npm run dev
```

Vite proxies `/api` to `http://127.0.0.1:4000` in development. Override this with `API_PROXY_TARGET` if needed. Registering from the sign-in screen always creates a citizen account; it cannot grant administrator or officer access.

## Environment variables

| Variable | Where | Purpose |
| --- | --- | --- |
| `PORT` | Render / server | API port (Render supplies this automatically). |
| `MONGODB_URI` | Server only | MongoDB Atlas connection string. Never use a `VITE_` variable. |
| `JWT_SECRET` | Server only | Private random signing key, minimum 32 characters. |
| `FRONTEND_URL` | Server | Exact allowed frontend origin(s), comma-separated if needed. Include scheme, no trailing slash. |
| `COOKIE_DOMAIN` | Server, optional | Cookie domain if your frontend and API use a shared parent domain. Usually leave blank for Netlify/Render. |
| `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | Server, optional | Enables image uploads. Without all three, upload responds with `503` and the UI displays the failure. |
| `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM_NUMBER` | Server, optional | Reserved for a future SMS integration. No SMS is sent by this application currently. |
| `ADMIN_NAME`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` | Server, first setup only | Credentials used by `npm run create-admin`. Never commit real values. |
| `VITE_API_URL` | Netlify frontend | Backend API base URL, for example `https://your-api.onrender.com/api`. No secrets belong in frontend variables. |

The root `.gitignore` excludes `.env` and `.env.*`; `.env.example` is safe to commit. Do not commit Atlas credentials, Cloudinary/Twilio secrets, or production JWT keys.

## API

All endpoints are under `/api`. Mutating requests use a CSRF token obtained from `GET /api/auth/csrf` and sent as `X-CSRF-Token`. The frontend client handles this. Authentication uses an HttpOnly cookie; the browser does not store JWTs in local storage.

- `GET /api/health` — readiness and database status.
- `POST /auth/register`, `POST /auth/login`, `POST /auth/logout`, `GET /auth/me`.
- `GET /missing-persons?q=&status=&page=&limit=` — public listings include approved cases only; authenticated staff can review all submissions.
- `GET /missing-persons/:id`, `POST /missing-persons`, `PUT /missing-persons/:id`, `DELETE /missing-persons/:id`.
- `POST /reports`, `GET /reports/my-reports`.
- `GET /admin/reports`, `PATCH /admin/reports/:id/status`.
- `PATCH /admin/missing-persons/:id/review` (admin), `PATCH /admin/missing-persons/:id/status` (admin/officer).
- `POST /uploads` — optional Cloudinary image upload; accepts verified JPEG, PNG, or WebP up to 5 MB.

Example registration (use the CSRF flow first):

```sh
curl -c cookies.txt http://localhost:4000/api/auth/csrf
# Copy csrfToken from the JSON response and use it as X-CSRF-Token:
curl -b cookies.txt -c cookies.txt -H 'Content-Type: application/json' -H 'X-CSRF-Token: <csrfToken>' \
  -d '{"name":"Example User","email":"user@example.com","password":"a-long-unique-password"}' \
  http://localhost:4000/api/auth/register
```

Reporter contact data is private in MongoDB and excluded from public serialization. New missing-person entries and sighting reports require moderation; unreviewed records are not published.

## MongoDB Atlas

Create an Atlas cluster and database user with only the permissions needed for the app database. Copy the connection URI into the server environment. Add the server's outbound IP to Atlas Network Access; for Render, configure Atlas access according to your Render network setup rather than leaving broad access enabled indefinitely. Encode special characters in the database username/password in the URI.

## Tests and build

```sh
npm run build
cd server
npm test
```

The API suite uses `mongodb-memory-server`; its first run may need network access to download the MongoDB test binary. Tests do not use production data.

## Deploy

### Backend on Render

1. Push the repository to GitHub.
2. In Render, create a **Web Service** from the repository and set **Root Directory** to `server`.
3. Set **Build Command** to `npm install` and **Start Command** to `npm start`.
4. Add `MONGODB_URI`, `JWT_SECRET`, and `FRONTEND_URL` in Render Environment. `FRONTEND_URL` must exactly match the Netlify site origin, such as `https://your-site.netlify.app`.
5. Add Cloudinary values only if hosted image uploads are required. Set `NODE_ENV=production`.
6. After deploying, verify `https://<render-service>.onrender.com/api/health` reports `status: ok` and `database: connected`.
7. For first-time administrator setup, run the script in a secure one-off environment with the same server environment variables: `npm run create-admin` from `server`. Do not add these values to frontend settings or commit them.

### Frontend on Netlify

1. Import the repository as a Netlify site. The included `netlify.toml` sets build command `npm run build`, publish directory `dist`, and SPA fallback.
2. Add `VITE_API_URL=https://<render-service>.onrender.com/api` in Netlify Site configuration → Environment variables.
3. Trigger a new deploy after setting the variable. Use only the public API URL; never put secrets in `VITE_` settings.
4. Set Render `FRONTEND_URL` to the final Netlify origin. If using Netlify preview deploys, add only specific trusted origins to the server's comma-separated allowlist.
5. Test registration, sign-in after refresh, case review/public visibility, and sign-out on the deployed site. Browser cookie restrictions and custom domains can affect cross-origin cookies; use HTTPS on both deployments.

## Troubleshooting

- **API unavailable:** check Render logs and `/api/health`, `PORT`, and Atlas Network Access.
- **CORS error:** make `FRONTEND_URL` exactly match the deployed Netlify origin and redeploy the API.
- **Sign-in fails after refresh:** verify both sites use HTTPS and that browser cross-site cookies are allowed; confirm `FRONTEND_URL` and do not proxy production API requests to localhost.
- **Photo upload returns 503:** configure all three Cloudinary variables on the backend. The app does not claim an upload succeeded otherwise.
- **No public records:** new entries are intentionally hidden until an administrator approves them.
- **SMS:** not implemented; no OTP is generated or claimed as delivered.
