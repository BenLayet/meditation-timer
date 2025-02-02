FROM node:22
WORKDIR /app
RUN apt-get update
RUN apt-get install -y ca-certificates
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

COPY ./pnpm-lock.yaml .
RUN pnpm fetch

COPY . .
RUN pnpm run build

EXPOSE 8000
ENTRYPOINT [ "pnpm", "run", "start" ]