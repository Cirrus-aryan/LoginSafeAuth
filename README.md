# Deloitte Task: Login Page Assignment

## Overview

This project requires you to create a functional and well-styled login page using **React** and **TypeScript**, demonstrating your understanding of component-based development, state management, form handling, and basic data mocking.

---

## Objective

Build a responsive login page with the following features:

- Clean, modern UI using Material-UI (MUI)
- TypeScript for type safety
- Mock authentication logic
- Form validation and error handling
- Responsive design

---

## Technologies

- **React**: User interface
- **TypeScript**: Type safety and maintainability
- **Material-UI (MUI)**: Styling and UI components
- **Lucide React**: Icons (use if MUI Icons are insufficient)

---

## Core Requirements

### 1. Login Form

- Responsive, centered login form
- Fields:
  - **Username/Email** (MUI `TextField`)
  - **Password** (MUI `TextField`)
  - **Remember Me** checkbox (MUI `Checkbox` + `FormControlLabel`) *(optional, but recommended)*
  - **Forgot Password?** link (MUI `Link`, dummy)
  - **Login** button (MUI `Button`)
- Use appropriate HTML input types (`type="email"`, `type="password"`)

### 2. Form Validation

- **Username/Email**: Required, valid email format (simple regex)
- **Password**: Required
- Show error messages below fields (use MUI `error` and `helperText`)
- Disable Login button until both fields are valid

### 3. Mock Authentication

- Use a mock data structure for user credentials, e.g.:
  ```ts
  const mockUsers = [
    { username: 'user1', password: 'password123' },
    { username: 'admin', password: 'adminpassword' },
  ];
  ```
- On login:
  - Check credentials against `mockUsers`
  - Show success message if valid:  
    _"Login Successful! Welcome, [Username]!"_
  - Show error message if invalid:  
    _"Invalid username or password."_
  - Simulate loading delay (1–2 seconds) with `setTimeout`

### 4. Styling

- Use MUI components and props for styling
- Ensure full responsiveness (desktop & mobile)
- Center form using MUI `Box` or `Container`
- Optionally use MUI theming for consistent design
- Use icons from `@mui/icons-material` or Lucide React as needed

### 5. TypeScript Usage

- Define interfaces/types for:
  - Component props (if any)
  - State variables
  - Mock user data
- Ensure all variables/functions are typed

### 6. Code Structure & Best Practices

- Organize code into logical components (e.g., `LoginPage.tsx`, `Input.tsx`, `Button.tsx`)
- Use functional components and React Hooks (`useState`, `useEffect`, etc.)
- Add comments for complex logic
- Follow standard React/TypeScript conventions

---

## Testing

- Write test cases using **Jest**
- Ensure all core behaviors and edge cases are covered

---

## Example Jest Output

<details>
<summary>Click to expand</summary>

```
PASS  src/components/LoginForm.test.tsx (35.892 s)
  LoginForm Basic Rendering & Behavior
    √ renders all required fields (103 ms)
    √ disables button when login is disabled (20 ms)
    ...
    √ rejects invalid credentials: { username: 'test@domain.com', password: 'PASSWORD!' } (547 ms)

Test Suites: 1 passed, 1 total
Tests:       69 passed, 69 total
Snapshots:   0 total
Time:        36.417 s, estimated 37 s
Ran all test suites.
```
</details>

---

## Questions?

If you have any questions about the requirements, please ask.

---

**Note:**  
You are expected to start the task on Monday. If you have not been assigned a task yet, try to work on this. I will connect with you on Wednesday.

**Running**
npm run dev

**Initialization**
npm i

**Run Testing**
npm test"# LoginSafeAuth" 
"# LoginSafeAuth" 
"# LoginSafeAuth" 
"# LoginSafeAuth" 
