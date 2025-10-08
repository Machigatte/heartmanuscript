This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Docker release (triggered by backend)

This repository contains a GitHub Actions workflow at `.github/workflows/docker-release.yml` which listens for a `repository_dispatch` event of type `backend-release`.

When the backend creates a release, it can trigger this workflow to build and push a Docker image for this frontend repository to Docker Hub. The Docker image will be tagged with the version provided in the dispatch payload.

Required repository secrets (in this frontend repo):
- `DOCKERHUB_USERNAME` — your Docker Hub username
- `DOCKERHUB_TOKEN` — a Docker Hub access token or password

Example dispatch payload (from backend repo):

```bash
curl -X POST \
	-H "Accept: application/vnd.github.v3+json" \
	-H "Authorization: token <BACKEND_REPO_PERSONAL_ACCESS_TOKEN>" \
	https://api.github.com/repos/<FRONTEND_OWNER>/<FRONTEND_REPO>/dispatches \
	-d '{"event_type":"backend-release","client_payload":{"version":"v1.2.3","tag":"v1.2.3"}}'
```

要创建 pre-release，请在 `client_payload` 中传入 `prerelease: true`：

```bash
curl -X POST \
	-H "Accept: application/vnd.github.v3+json" \
	-H "Authorization: token <BACKEND_REPO_PERSONAL_ACCESS_TOKEN>" \
	https://api.github.com/repos/<FRONTEND_OWNER>/<FRONTEND_REPO>/dispatches \
	-d '{"event_type":"backend-release","client_payload":{"version":"v1.2.3-rc1","prerelease":true,"release_notes":"RC1 for testing"}}'
```

Notes:
- Replace `<BACKEND_REPO_PERSONAL_ACCESS_TOKEN>` with a token that has `repo` permissions for the frontend repo or create a GitHub Actions workflow in the backend repo that calls the REST API.
- The workflow uses `client_payload.version` (or `tag`) to tag the pushed image.

