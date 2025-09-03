FROM node:22
WORKDIR /app
RUN apt-get update && apt-get install -y ca-certificates
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@9.15.0 --activate

COPY ./pnpm-lock.yaml .
RUN pnpm fetch

COPY . .
ENV HUSKY=0
RUN pnpm install
RUN pnpm format-check
RUN pnpm test:libraries
RUN pnpm test:domain
RUN pnpm test:backend
RUN pnpm test:frontend
RUN pnpm build

EXPOSE 8000
ENTRYPOINT [ "pnpm", "run", "start" ]