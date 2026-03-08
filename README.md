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


## Input Validation and Error Handling

This project implements server-side validation and error handling to ensure data integrity and API reliability.

### Validation

Input validation is implemented using the **express-validator** library.
Validation rules are applied in route handlers before the controller logic.

Example validation rules:

- **username**
  - required
  - 3–20 characters
  - alphanumeric
- **email**
  - must be a valid email format
- **password**
  - minimum length 8 characters

If validation fails, the request is rejected with a **400 Bad Request** response.

Example response:

```json
{
  "error": {
    "message": "Bad Request",
    "status": 400,
    "errors": [
      {
        "field": "username",
        "message": "Invalid value"
      }
    ]
  }
}
