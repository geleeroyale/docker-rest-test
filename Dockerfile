# Simple TypeScript Health API Dockerfile
FROM node:lts-alpine as build

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .
# Ensure tsconfig is present
COPY tsconfig.json ./

# Build TypeScript
RUN npm run build

# ------------------
# Production image
FROM node:lts-alpine
WORKDIR /app

# Copy only the compiled dist and minimal files
COPY --from=build /app/dist ./dist
COPY package*.json ./
RUN npm ci --omit=dev --ignore-scripts --prefer-offline --no-audit --progress=false

EXPOSE 4444
CMD ["node", "dist/index.js"]
