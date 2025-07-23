import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import LoginForm from './LoginForm';
import { invalidUsers, validUsers } from './Testcases';

let mockedHook: any;

jest.mock('../customhooks/useLogin', () => ({
    __esModule: true,
    default: () => mockedHook,
}));

describe('LoginForm Basic Rendering & Behavior', () => {
    const setup = (overrides = {}) => {
        mockedHook = {
            username: '',
            setUsername: jest.fn(),
            password: '',
            setPassword: jest.fn(),
            rememberMe: false,
            setRememberMe: jest.fn(),
            showPassword: false,
            setShowPassword: jest.fn(),
            loginEnabled: true,
            loading: false,
            emailValid: true,
            passwordValid: true,
            passwordStrength: 0,
            handleSubmit: jest.fn((e: any) => e.preventDefault()),
            ...overrides,
        };

        render(<LoginForm />);
    };

    it('renders all required fields', () => {
        setup();
        expect(screen.getByLabelText(/Username \(Email\)/i)).toBeInTheDocument();
        expect(screen.getByLabelText('Password', { selector: 'input' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
        expect(screen.getByLabelText(/Remember Me/i)).toBeInTheDocument();
        expect(screen.getByText(/Forgot Password\?/i)).toBeInTheDocument();
    });

    it('disables button when login is disabled', () => {
        setup({ loginEnabled: false });
        expect(screen.getByRole('button', { name: /Login/i })).toBeDisabled();
    });

    it('shows loading text when loading is true', () => {
        setup({ loading: true });
        expect(screen.getByRole('button', { name: /Logging in\.\.\./i })).toBeDisabled();
    });

    it('calls handleSubmit on submit', async () => {
        const user = userEvent.setup();
        const handleSubmit = jest.fn((e) => e.preventDefault());
        setup({ handleSubmit });

        await user.click(screen.getByRole('button', { name: /Login/i }));
        expect(handleSubmit).toHaveBeenCalled();
    });

    it('toggles password visibility', async () => {
        const user = userEvent.setup();
        const setShowPassword = jest.fn();
        setup({ setShowPassword });

        const toggleBtn = screen.getByLabelText(/toggle password visibility/i);
        await user.click(toggleBtn);
        expect(setShowPassword).toHaveBeenCalled();
    });

    it('shows progress bar when password is typed', () => {
        setup({ password: '12345678', passwordStrength: 2 });
        expect(screen.getByTestId('password-strength-bar')).toBeInTheDocument();
    });

    it('shows email error', () => {
        setup({ username: 'bademail', emailValid: false });
        expect(screen.getByText(/Enter a valid email address/i)).toBeInTheDocument();
    });

    it('shows password error', () => {
        setup({ password: '123', passwordValid: false });
        expect(screen.getByText(/Min 8 chars, at least 1 letter & 1 number/i)).toBeInTheDocument();
    });

    it('checks remember me checkbox', async () => {
        const user = userEvent.setup();
        const setRememberMe = jest.fn();
        setup({ rememberMe: false, setRememberMe });

        await user.click(screen.getByLabelText(/Remember Me/i));
        expect(setRememberMe).toHaveBeenCalledWith(true);
    });
});

describe('LoginForm Dynamic Input Validation', () => {
    const user = userEvent.setup();

    beforeEach(() => {
        mockedHook = {
            username: '',
            setUsername: jest.fn(),
            password: '',
            setPassword: jest.fn(),
            rememberMe: false,
            setRememberMe: jest.fn(),
            showPassword: false,
            setShowPassword: jest.fn(),
            loginEnabled: true,
            loading: false,
            emailValid: true,
            passwordValid: true,
            passwordStrength: 3,
            handleSubmit: jest.fn((e: React.FormEvent) => e.preventDefault()),
        };
    });

    it.each(validUsers)(
        'accepts valid credentials: %s',
        async ({ username, password }) => {
            mockedHook.username = username;
            mockedHook.password = password;
            render(<LoginForm />);

            const form = screen.getByTestId('login-form');
            const emailInput = within(form).getByLabelText(/Username \(Email\)/i);
            const passwordInput = within(form).getByLabelText('Password', { selector: 'input' });
            const loginButton = within(form).getByRole('button', { name: /Login/i });

            await user.clear(emailInput);
            if (username) {
                await user.type(emailInput, username);
            }

            await user.clear(passwordInput);
            if (password) {
                await user.type(passwordInput, password);
            }

            mockedHook.loginEnabled = true; // Explicitly set to true for valid users to ensure button is enabled

            await user.click(loginButton);

            expect(mockedHook.handleSubmit).toHaveBeenCalled();
            expect(loginButton).toBeEnabled(); // Ensure button is enabled for valid credentials
        }
    );

    it.each(invalidUsers)(
        'rejects invalid credentials: %s',
        async ({ username, password }) => {
            mockedHook.username = username;
            mockedHook.password = password;

            // Updated and more robust email validation logic for mocks
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            mockedHook.emailValid = emailRegex.test(username);

            mockedHook.passwordValid = password.length >= 8 && /[a-zA-Z]/.test(password) && /\d/.test(password);

            // loginEnabled should be false if either email or password is not valid
            mockedHook.loginEnabled = mockedHook.emailValid && mockedHook.passwordValid;

            render(<LoginForm />);

            const form = screen.getByTestId('login-form');
            const emailInput = within(form).getByLabelText(/Username \(Email\)/i);
            const passwordInput = within(form).getByLabelText('Password', { selector: 'input' });
            const loginButton = within(form).getByRole('button', { name: /Login/i });

            await user.clear(emailInput);
            if (username) {
                await user.type(emailInput, username);
            }

            await user.clear(passwordInput);
            if (password) {
                await user.type(passwordInput, password);
            }

            // Assertions for helper text and button disabled state
            if (!mockedHook.emailValid) {
                if (username) { // Only check for helper text if username was provided and is invalid
                    expect(screen.getByText(/Enter a valid email address/i)).toBeInTheDocument();
                }
            }

            if (!mockedHook.passwordValid) {
                if (password) { // Only check for helper text if password was provided and is invalid
                    expect(screen.getByText(/Min 8 chars, at least 1 letter & 1 number/i)).toBeInTheDocument();
                }
            }

            expect(mockedHook.handleSubmit).not.toHaveBeenCalled();
            expect(loginButton).toBeDisabled(); // The login button should be disabled for invalid credentials
        }
    );
});