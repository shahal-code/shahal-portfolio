---
trigger: always_on
---

# MERN JavaScript Coding Standards

## Tech Stack

This project uses:
- MongoDB
- Express.js
- React.js
- Node.js
- JavaScript (ES6+)

Do NOT convert the project to TypeScript unless explicitly requested.

---

## General Coding Rules

- Write clean, readable, maintainable code.
- Use modern ES6+ JavaScript.
- Prefer simple solutions over unnecessary complexity.
- Follow DRY principles.
- Avoid duplicated code.
- Keep functions small and focused.
- Use async/await instead of .then() chains.
- Remove unused variables, imports, and dead code.
- Do not modify unrelated code.
- Do not rewrite working code unnecessarily.

---

## Naming Convention

Variables:
camelCase

Functions:
camelCase

React Components:
PascalCase

Constants:
UPPER_SNAKE_CASE

Examples:

const userName = "Shahal";

const getUserById = async () => {};

const MAX_LOGIN_ATTEMPTS = 5;

function UserProfile() {}

---

## File Naming

React components:

UserProfile.jsx
ProductCard.jsx
LoginPage.jsx

Backend files:

user.controller.js
user.service.js
user.routes.js
user.model.js
auth.middleware.js

Utility files:

generateToken.js
sendEmail.js

---

# BACKEND RULES

## Backend Architecture

Follow this structure:

src/
├── config/
├── controllers/
├── services/
├── models/
├── routes/
├── middleware/
├── utils/
├── validators/
└── app.js

Keep responsibilities separated.

Route
 ↓
Controller
 ↓
Service
 ↓
Model / Database

---

## Routes

Routes should only define endpoints and middleware.

Example:

router.post(
  "/login",
  validateLogin,
  authController.login
);

Do NOT put business logic inside route files.

---

## Controllers

Controllers should:

- Handle request and response.
- Read params, query and body.
- Call service functions.
- Return appropriate HTTP responses.

Controllers should NOT contain large amounts of business logic.

---

## Services

Services should contain business logic.

Example:

controller
   ↓
userService.createUser()
   ↓
User.create()

Services should be reusable and independent from Express where possible.

---

## MongoDB / Mongoose

- Use Mongoose schemas properly.
- Validate required fields.
- Use timestamps when appropriate.
- Add indexes when required.
- Avoid unnecessary database queries.
- Use `.lean()` for read-only queries when appropriate.
- Use pagination for potentially large collections.
- Never trust IDs received from the client.
- Validate MongoDB ObjectIds before querying when necessary.

Avoid:

const users = await User.find();

for very large collections without pagination.

Prefer:

User.find()
  .skip(skip)
  .limit(limit);

---

## API Standards

Use RESTful API conventions.

GET    /api/users
GET    /api/users/:id
POST   /api/users
PATCH  /api/users/:id
DELETE /api/users/:id

Use nouns for resources.

Prefer:

/api/products

Instead of:

/api/getProducts

---

## HTTP Status Codes

Use correct status codes.

200 - Success
201 - Created
400 - Bad Request
401 - Unauthorized
403 - Forbidden
404 - Not Found
409 - Conflict
500 - Internal Server Error

---

## API Response Structure

Keep API responses consistent.

Success:

{
  "success": true,
  "message": "User created successfully",
  "data": {}
}

Error:

{
  "success": false,
  "message": "User not found"
}

Do not expose internal errors to clients.

---

## Error Handling

Use centralized Express error handling.

Do NOT repeat try/catch logic unnecessarily.

Pass unexpected errors to the global error handler.

Never silently ignore errors.

Log unexpected server errors.

---

## Authentication

For authentication:

- Use secure password hashing.
- Never store plain-text passwords.
- Never return passwords through APIs.
- Protect private routes using authentication middleware.
- Check authorization separately from authentication.
- Use secure JWT handling if JWT authentication is used.

---

## Security

Never hardcode:

- passwords
- API keys
- database URLs
- JWT secrets
- access tokens

Use environment variables.

Never commit:

.env

Always validate user input.

Do not expose stack traces in production.

Use appropriate security middleware when required.

---

# FRONTEND RULES

## React

Use functional components.

Prefer:

function ProductCard() {
  return (...)
}

or

const ProductCard = () => {
  return (...)
}

Do not use class components unless required by existing code.

---

## React Component Rules

Keep components small and reusable.

Separate:

Pages
Components
Hooks
Services
Utilities

Recommended structure:

src/
├── components/
├── pages/
├── hooks/
├── services/
├── utils/
├── context/
├── assets/
└── App.jsx

---

## API Calls

Do not put repeated API logic directly inside components.

Keep API functions in:

services/

Example:

services/userService.js

Components should call service functions.

---

## State Management

Use local state for component-specific state.

Use Context only for appropriate global state.

Do not introduce Redux or another state-management library unless the project actually needs it or it already exists.

Avoid unnecessary state.

---

## React Hooks

Follow React Hooks rules.

- Never call hooks conditionally.
- Use custom hooks for reusable stateful logic.
- Avoid unnecessary useEffect usage.
- Always review useEffect dependencies.
- Clean up subscriptions/listeners when required.

---

## Forms

- Validate user input.
- Display useful validation messages.
- Prevent duplicate submissions.
- Show loading state while submitting.
- Handle API errors properly.

---

## UI States

Every API-driven page should consider:

Loading
Success
Empty
Error

Do not leave users with a blank screen when an API request fails.

---

# ENVIRONMENT VARIABLES

Frontend:

VITE_API_URL=

Backend:

PORT=
MONGO_URI=
JWT_SECRET=

Never expose backend secrets through frontend environment variables.

Remember that VITE_* variables are available to frontend code.

---

# GIT RULES

Do not:

- automatically push code
- force push
- delete branches
- commit .env
- commit secrets

unless explicitly requested.

Use meaningful commit messages.

Examples:

feat: add user authentication

fix: handle expired JWT token

refactor: move user logic to service

---

# AGENT BEHAVIOR

Before changing code:

1. Understand the existing project structure.
2. Check how similar functionality is currently implemented.
3. Follow existing project patterns.
4. Avoid introducing unnecessary dependencies.

When fixing bugs:

1. Identify the root cause.
2. Make the smallest reasonable change.
3. Do not rewrite unrelated working code.
4. Check whether the change affects other functionality.

When creating new features:

1. Follow the existing architecture.
2. Reuse existing components/utilities where possible.
3. Keep frontend and backend responsibilities separated.
4. Add validation and error handling.
5. Consider security and edge cases.

Before considering work complete:

- Check syntax errors.
- Check imports.
- Check unused variables.
- Check error handling.
- Check API status codes.
- Check validation.
- Check security issues.
- Check edge cases.
- Check existing functionality is not broken.

---

# IMPORTANT

Do not change the project's technology stack without permission.

Do not convert JavaScript to TypeScript.

Do not introduce new frameworks unnecessarily.

Do not change existing API contracts without informing me.

Do not remove existing functionality to fix another issue.

Do not modify unrelated files.

Do not expose secrets.

Do not push code automatically.

Ask before making major architectural changes.