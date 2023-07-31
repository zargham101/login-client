import axios from 'axios';


// axios.defaults.baseURL = 'http://localhost:8080';

export async function authentication(username) {
    try {
        return await axios.post('/api/auth', { username })
    } catch (error) {
        return { error: "Username does not exit...!" };
    }
}

export async function getUser(username) {
    try {
        const { data } = await axios.get(`/api/user/${username}`);
        return { data }
    } catch (error) {
        return { error: "Password  does not match...!" };
    }
}

export async function registerUser(credentials) {
    try {
        const { data: { msg }, status } = await axios.post('http://127.0.0.1:8080/api/register', credentials);
        let { username, email } = credentials
        if (status === 201) {
            await axios.post('http://127.0.0.1:8080/api/registerMail', { username, userEmail: email, text: msg })
        }
        return Promise.resolve(msg);

    } catch (error) {
        return Promise.reject({ error });

    }
}

export async function verifyPassword({ username, password }) {
    try {
        if (username) {
            const { data } = axios.post('/api/login', { username, password });
            return Promise.resolve({ data });
        }
    } catch (error) {
        return Promise.reject({ error: "Invalid password" });
    }
}

export async function updateUser(response) {
    try {
        const { token, } = await localStorage.getItem('token');
        const { data } = await axios.put('/api/updateuser', response, { headers: { "Authorization": `Bearer ${token}` } });
        return Promise.resolve({ data });
    } catch (error) {
        return Promise.reject({ error: "Can not update user" });
    }
}

export async function generateOTP(username) {
    try {
        const { data: { code }, status } = await axios.get('/api/generateOTP', { params: { username } });
        if (status === 201) {
            let { data: { email } } = await getUser({ username });
            let text = `Your Password Recovery OTP is ${code}. Verify and recover your password `;
            await axios.post('/api/registerMail', { username, userEmail: email, text, subject: "Password Recovery OTP" });

        }
        return Promise.resolve(code);
    } catch (error) {
        return Promise.reject({ error: "Can not generate OTP" });
    }
}

export async function verifyOTP({ username, code }) {
    try {
        const { data, status } = await axios.get('/api/verifyOTP', { params: { username, code } })
        return { data, status }
    } catch (error) {
        return Promise.reject({ error })
    }
}

export async function resetPassword(username, password) {
    try {
        const { data, status } = await axios.put('/api/resetPassword', { username, password })
        return Promise.resolve({ data, status })
    } catch (error) {
        return Promise.reject({ error });
    }
}