# Aawiz Interview Project

## Technology Stack

- **Backend**: NestJS v11
- **Database**: PostgreSQL with MikroORM
- **Authentication**: JWT with access and refresh tokens
- **ORM**: MikroORM v6
- **Database Migration**: MikroORM migrations
- **Validation**: class-validator and class-transformer
- **Containerization**: Docker & Docker Compose(development & production envs)
- **Package Manager**: pnpm
- **Code Quality**: ESLint & Prettier
- **API Documentation**: Swagger

## Architecture

The application follows a clean architecture pattern with the following layers:

```
src/
├── app.module.ts                 # Main application module
├── main.ts                       # Application bootstrap
├── app.settings.ts               # Application configuration
├── envs.ts                       # Environment validation
├── mikro-orm.config.ts           # Database configuration
├── core/                         # Core module with global configs
│   └── core.module.ts
├── modules/                      # Feature modules
│   ├── auth/                     # Authentication module
│   ├── users/                    # User management module
│   ├── evaluations/              # Evaluation module
│   └── health/                   # Health check module
├── migrations/                   # Database migration files
└── shared/                       # Shared utilities, filters, decorators
```

### Domain-Driven Design Structure

> [!NOTE]
> I know it's not fair to apply these DDD principles with clean architecture to a minimal Project ,but the purpose of doing this is just to create a playground for myself and show off my abilities.

Each module follows a domain-driven design pattern with the following structure:

```
module/
├── application/      # Use cases, services, commands, configurations
├── domain/          # Domain entities, value objects, repositories
├── presenters/      # DTOs, presenters, request/response objects
└── infrastructure/  # Database entities, repositories implementations (if applicable)
```

## Environment Configuration

The application requires the following environment variables. Create `.env.dev` for development or `.env.prod` for production based on the example:

```env
PORT=3000
NODE_ENV=dev|stage|test|prod

POSTGRES_URI=postgresql://user:password@localhost:5432/aawiz

JWT_ACCESS_TOKEN_SECRET=dev_access_token_secret
JWT_REFRESH_TOKEN_SECRET=dev_refresh_token_secret
JWT_ACCESS_TOKEN_TTL=3600
JWT_REFRESH_TOKEN_TTL=86400
JWT_TOKEN_AUDIENCE_URL=http://localhost:3000
JWT_TOKEN_ISSUER_URL=http://localhost:3000
```

## Getting Started

### Prerequisites

- Node.js (v24+)
- Docker & Docker Compose

### Installation

1. Clone the repository:

```bash
git clone https://github.com/dinno7/aawiz.git
cd aawiz
```

2. Set up environment variables:

```bash
cp .example.env .env
# Modify the values in .env as needed
```

### Production environment

3. Run with docker:

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml --env-file ./.env up --build -d

```

### Development environment

> Modify the values in .env as needed

3. Run with docker:

```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml --env-file ./.env up --build -d

```

> [!WARNING]
> To avoid installing Redis as a dependency, I implemented my own memory storage to store data in RAM. Therefore, if the project is run in development and undergoes changes that lead to a restart of the app, all data in memory will be wiped.
> I save refresh tokens in the memory storage to verify them during token refreshes. Thus, if the app restarts, all refresh tokens will be wiped, and the user will need to sign in again.
> The memory storage is implemented using an interface, allowing for easy integration with Redis(or any storage) by simply implementing the `MemoryStorage` interface.

## API Documentation

API documentation is automatically generated and available at:

- Swagger UI: `http://localhost:3000/docs`
- Health check: `http://localhost:3000/api/v1/health`

## Database Migrations

The application uses MikroORM for database migrations. To manage migrations:

```bash
docker exec -it aawiz_app_dev sh

cd /app

# Create a new migration
pnpm exec mikro-orm migration:create --name some_name

# Run all pending migrations
pnpm exec mikro-orm migration:up

# Revert the last migration
pnpm exec mikro-orm migration:down
```

## Code Quality

The project maintains code quality with ESLint and Prettier:

```bash
# Lint the code
pnpm lint

# Format the code
pnpm format

# Fix linting issues
pnpm lint --fix
```

## Project Structure Details

### Core Module

- **Configuration**: Global configuration with NestJS Config module
- **Database**: MikroORM setup with PostgreSQL
- **Validation**: Environment variable validation
- **Error Handling**: Global exception filter

### Modules

#### Authentication Module

- JWT-based authentication system
- Access and refresh token management
- Token service and validation

#### Users Module

- User management functionality
- User entity and domain logic
- User-related use cases

#### Evaluations Module

- Evaluation system functionality
- Domain-driven design implementation

#### Health Module

- Application health check endpoint
- System status monitoring

### Shared Components

- **Decorators**: Reusable decorators
- **Errors**: Domain and application errors
- **Filters**: Exception filters
- **Hashing**: Password hashing utilities
- **Utils**: General utility functions
- **Types**: Shared type definitions

## API Versioning

The API uses URI versioning with the default version being `v1`:

- Base URL: `http://localhost:3000/api/v1/`

## Security

- JWT tokens for authentication
- Role base policy for authorization
- Environment validation to prevent misconfiguration
- Input validation using class-validator
- CORS enabled by default
- Cookie parser for secure cookie handling

