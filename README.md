## Authentication

The API uses JWT for authentication.

POST /api/auth/login

The token must be sent in requests using:

Authorization: Bearer <token>

## Authorization

Users can only modify their own data.

Protected endpoints:

PUT /api/users/:id
PUT /api/entries/:id
DELETE /api/entries/:id
