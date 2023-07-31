import { toast } from "react-hot-toast";
import { authentication } from './helper';
/**username validation */
export function usernameValidate(values) {
    const errors = usernameVerify({}, values)
    if (values.username) {
        const { status } = authentication(values.username);
        if (status !== 200) {
            errors.exists = toast.error('User does not exist...!')
        }
    }

    return errors;
}
/**password validation */
export function passwordValidate(values) {
    const errors = passwordVerify({}, values)

    return errors;
}

/**reset password validation */
export function resetPasswordValidate(values) {
    const errors = passwordVerify({}, values)

    if (values.password !== values.confirm_pwd) {
        errors.exists = toast.error("Password does not match")
    }

    return errors;
}

/**register form validation */
export async function registerValidation(values) {
    const errors = usernameVerify({}, values);
    passwordVerify(errors, values);
    emailVerify(errors, values);

    return errors;
}


/**password validation function */
function passwordVerify(error = {}, values) {
    const specialChars = /[`!@#$%^&*()_+-=[\]{};':"|,.<>?~]/;

    if (!values.password) {
        error.username = toast.error("password required...!")
    } else if (values.password.includes(" ")) {
        error.username = toast.error("Invalid password...!")
    } else if (values.password.length < 6) {
        error.username = toast.error("Password should be more then 6 characters long...!")
    } else if (!specialChars.test(values.password)) {
        error.username = toast.error("Password must have special characters...!")
    }
    return error;
}

/**username validation function */
function usernameVerify(error = {}, values) {
    if (!values.username) {
        error.username = toast.error("Username required...!")
    } else if (values.username.includes(" ")) {
        error.username = toast.error("Invalid username...!")
    }
    return error;
}

/** validate email */
function emailVerify(error = {}, values) {
    if (!values.email) {
        error.email = toast.error("Email Required...!");
    } else if (values.email.includes(" ")) {
        error.email = toast.error("Wrong Email...!")
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        error.email = toast.error("Invalid email address...!")
    }

    return error;
}

/**validate profile page */
export async function profileValidation(values) {
    const errors = emailVerify({}, values);
    return errors;
}