# Meditation Timer

Web / PWA meditation timer application that provides statitics of meditation sessions.

## List of features

See [features](packages/domain/features).


## Project Structure

Mono repository using pnpm as package manager, with packages :
- domain : no framework, pure js implementation of business logic, specified using cucumber in features
- frontend : react framework
- backend : express backend connecting to a postgresql database

```
Dockerfile
package.json
packages/
    backend/
        package.json
        src/
            app.js
            config/
            repositories/
            routes/
        test/
            http/
    domain/
        package.json
        features/
            meditation-setup.feature
            meditation-timer.feature
            ...
        src/
            ...
        test/
            ...
    frontend/
        .gitignore
        eslint.config.js
        index.html
        package.json
        README.md
        vite.config.js
        public/
        src/
```

## Installation

Requires NodeJs, pnpm, and Git.

1. Clone the repository:
    ```sh
    git clone <repository-url>
    ```
2. Install dependencies with `pnpm`:
    ```sh
    pnpm install
    ```

## Running the project for development

### Backend

1. Navigate to the `backend` folder:
    ```sh
    cd packages/backend
    ```
2. Start the server:
    ```sh
    pnpm dev
    ```

### Frontend

1. Navigate to the `frontend` folder:
    ```sh
    cd packages/frontend
    ```
2. Start the application:
    ```sh
    pnpm dev
    ```

## Building the Project

To build the entire project, run the following command:
```sh
pnpm run build
```

## Running Tests

### Backend

1. Navigate to the `backend` folder:
    ```sh
    cd packages/backend
    ```
2. Run the tests:
    ```sh
    pnpm test
    ```

### Domain

1. Navigate to the `domain` folder:
    ```sh
    cd packages/domain
    ```
2. Run the tests:
    ```sh
    pnpm test
    ```

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License.