# TypeScript Health API

A minimal REST service written in TypeScript + Express that exposes a single `GET /health` endpoint on port **4444**.  The project is fully containerised (Dockerfile) and publishes an image to GitHub Container Registry (GHCR) via a GitHub Actions workflow.  A `docker-compose.yml` is provided for easy runtime consumption of the image and for local development.

---

## Features

- **/health** endpoint returning `{ status: "ok" }`.
- Written in **TypeScript** with strict settings.
- Two-stage **Dockerfile** build (production-ready image).
- **GitHub Actions** workflow builds & pushes `ghcr.io/<owner>/<repo>:<tag>`.
- **docker-compose** for running the container and wiring it to an **external network**.

---

## Prerequisites

- Node.js ≥ 18 (for local dev)
- Docker & Docker Compose v2
- A pre-existing Docker network (if you want to attach the container). Set its name in `.env` (see below).

---

## Quick Start (Local)

```bash
# install dependencies and compile TS ➜ dist/
npm install
npm run build

# start in watch mode (ts-node-dev)
npm run dev
# → http://localhost:4444/health
```

---

## Building & Running with Docker

```bash
# Build the image locally
docker build -t ts-health-api:local .

# Run the container directly
docker run --rm -p 4444:4444 ts-health-api:local
```

---

## Using docker-compose

1.  Add / verify a `.env` file with:

    ```env
    # existing external docker network
    DOCKER_NETWORK=my_network
    # optional namespace override used in docker-compose image reference
    GHCR_NAMESPACE=your_github_username
    ```

2.  Start the stack:

    ```bash
    docker compose up -d
    ```

3.  Check health:

    ```bash
    curl http://localhost:4444/health
    ```

---

## GitHub Container Registry (GHCR) Publishing

The workflow at `.github/workflows/docker-publish.yml` automatically:

1. Checks out the repository.
2. Builds the Docker image with `docker buildx`.
3. Pushes `latest` and commit-sha tags to `ghcr.io/<owner>/<repo>` when you push to the **main** branch.

No extra secrets are needed—`GITHUB_TOKEN` is provided automatically with `packages:write` permission.

---

## Project Structure

```
├── src/            # TypeScript source
│   └── index.ts    # Express server
├── dist/           # Compiled JS (generated)
├── Dockerfile
├── docker-compose.yml
├── .github/workflows/docker-publish.yml
└── README.md
```

---

## License

MIT
