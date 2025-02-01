FROM node:20-slim
WORKDIR /app
RUN apt-get update
RUN apt-get install -y ca-certificates
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

COPY ./frontend/pnpm-lock.yaml ./frontend/
RUN cd frontend && pnpm fetch && cd ..

COPY ./backend/pnpm-lock.yaml ./backend/
RUN cd backend && pnpm fetch && cd ..

COPY ./frontend/package.json ./frontend/
RUN cd frontend && pnpm install && cd ..

COPY ./backend/package.json ./backend/
RUN cd backend && pnpm install && cd ..

COPY . .
RUN cd frontend && pnpm run build && cd ..
RUN cd backend && pnpm run build && cd ..

EXPOSE 8000
ENTRYPOINT [ "node", "backend/dist/server.js" ]