# Tinder App API

A Laravel-based REST API for a Tinder-like dating application. This API provides authentication, user profiles, people discovery, and like/dislike functionality.

## Features

-   **User Authentication**: Secure authentication using Laravel Sanctum
-   **User Profiles**: User management with profile information
-   **People Discovery**: Browse and discover people with multiple pictures
-   **Like/Dislike System**: Express interest in people you like or dislike
-   **Recommendations**: Get personalized recommendations based on gender preferences
-   **Liked People List**: View all people you've liked
-   **API Documentation**: Complete OpenAPI/Swagger documentation

## Tech Stack

-   **PHP**: 8.2.4
-   **Laravel**: 12.x
-   **Laravel Sanctum**: 4.x (API Authentication)
-   **L5-Swagger**: 9.x (API Documentation)
-   **Pest**: 3.x (Testing Framework)
-   **Laravel Pint**: 1.x (Code Style)

## Requirements

-   PHP >= 8.2
-   Composer
-   Node.js & NPM
-   MySQL/PostgreSQL/SQLite

## Installation

1. **Clone the repository**

    ```bash
    git clone <repository-url>
    cd tinder-app/server
    ```

2. **Install dependencies**

    ```bash
    composer install
    npm install
    ```

3. **Environment setup**

    ```bash
    cp .env.example .env
    php artisan key:generate
    ```

4. **Configure database**
   Update your `.env` file with your database credentials:

    ```env
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=tinder_app
    DB_USERNAME=your_username
    DB_PASSWORD=your_password
    ```

5. **Run migrations and seeders**

    ```bash
    php artisan migrate
    php artisan db:seed
    ```

6. **Generate API documentation**

    ```bash
    php artisan l5-swagger:generate
    ```

7. **Start the development server**
    ```bash
    composer run dev
    ```
    Or use the individual commands:
    ```bash
    php artisan serve
    npm run dev
    ```

## Running on Same WiFi Network

To access the API from other devices on the same WiFi network (e.g., mobile devices), you need to run the server on your local IP address instead of `localhost`.

### Find Your Local IP Address

**macOS/Linux:**

```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```

Or:

```bash
ip addr show | grep "inet " | grep -v 127.0.0.1
```

**Windows:**

```bash
ipconfig
```

Look for "IPv4 Address" under your active network adapter.

### Start Server on Local Network

Run the Laravel server on `0.0.0.0` to accept connections from any network interface:

```bash
php artisan serve --host=0.0.0.0 --port=8000
```

Or specify your local IP address directly:

```bash
php artisan serve --host=192.168.1.100 --port=8000
```

Replace `192.168.1.100` with your actual local IP address.

### Access from Other Devices

Once the server is running, you can access the API from any device on the same WiFi network using:

-   **API Base URL**: `http://YOUR_LOCAL_IP:8000/api/v1`
-   **Swagger UI**: `http://YOUR_LOCAL_IP:8000/api/documentation`

**Example:**

```bash
# From a mobile device or another computer on the same network
curl -X POST http://192.168.1.100:8000/api/v1/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "demo@demo.app",
    "password": "password"
  }'
```

### Firewall Considerations

You may need to allow incoming connections on port 8000:

**macOS:**

-   System Settings → Network → Firewall → Firewall Options
-   Add PHP or allow incoming connections on port 8000

**Linux:**

```bash
sudo ufw allow 8000/tcp
```

**Windows:**

-   Windows Defender Firewall → Advanced Settings → Inbound Rules
-   Add a new rule to allow port 8000

### Using Composer Run Dev with Network Access

If you're using `composer run dev`, you may need to modify the script or run the commands separately:

```bash
# Terminal 1: Start Laravel server on network
php artisan serve --host=0.0.0.0 --port=8000

# Terminal 2: Start Vite dev server
npm run dev
```

## API Endpoints

All API endpoints are prefixed with `/api/v1`.

### Authentication

-   `POST /api/v1/login` - Authenticate user and get access token
-   `POST /api/v1/logout` - Logout user (requires authentication)
-   `GET /api/v1/me` - Get current authenticated user (requires authentication)

### User

-   `GET /api/v1/user` - Get authenticated user information (requires authentication)

### People

-   `GET /api/v1/people` - Get recommended people (paginated, requires authentication)
    -   Query parameters: `page`, `per_page`
-   `POST /api/v1/people/like` - Like a person (requires authentication)
    -   Body: `{ "people_id": 1 }`
-   `POST /api/v1/people/dislike` - Dislike a person (requires authentication)
    -   Body: `{ "people_id": 1 }`
-   `GET /api/v1/people/liked` - Get list of liked people (requires authentication)

## API Documentation

Interactive API documentation is available at:

-   **Swagger UI**: `http://localhost:8000/api/documentation`
-   **Swagger JSON**: `http://localhost:8000/docs` (returns JSON format)

The JSON endpoint can be used for:

-   Integration with API clients (Postman, Insomnia, etc.)
-   Code generation tools
-   Automated testing
-   External documentation tools

**Example:**

```bash
# Get Swagger JSON
curl http://localhost:8000/docs

# Save to file
curl http://localhost:8000/docs -o swagger.json
```

To regenerate the documentation after making changes:

```bash
php artisan l5-swagger:generate
```

## Database Structure

### Tables

-   **users**: User accounts
-   **people**: User profiles with basic information (name, age, location, gender)
-   **pictures**: Multiple pictures per person (1-n relationship)
-   **user_people_interactions**: Like/dislike interactions between users and people

### Relationships

-   `User` has one `People` profile
-   `People` has many `Pictures`
-   `User` has many `UserPeopleInteraction` (likes/dislikes)
-   `People` has many `UserPeopleInteraction` (received likes/dislikes)

## Testing

Run tests using Pest:

```bash
php artisan test
```

Run specific test file:

```bash
php artisan test tests/Feature/ExampleTest.php
```

## Code Style

This project uses Laravel Pint for code formatting:

```bash
vendor/bin/pint
```

Format only changed files:

```bash
vendor/bin/pint --dirty
```

## Seeding

The database seeder creates:

-   Demo user with profile and 3 pictures
-   5 male users with profiles and 3 pictures each
-   5 female users with profiles and 3 pictures each

To seed the database:

```bash
php artisan db:seed
```

## Demo User

A demo user is automatically created when you run the database seeder. You can use these credentials to test the API:

**Credentials:**

-   **Email**: `demo@demo.app`
-   **Password**: `password`

**Profile Information:**

-   **Name**: Demo User
-   **Age**: 25
-   **Location**: New York, NY
-   **Gender**: M
-   **Pictures**: 3 pictures are included

**Usage Example:**

```bash
# Login to get access token
curl -X POST http://localhost:8000/api/v1/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "demo@demo.app",
    "password": "password"
  }'

# Use the token to access protected endpoints
curl -X GET http://localhost:8000/api/v1/people \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## License

The MIT License (MIT). Please see the [License File](LICENSE) for more information.
