export const API_URL = "http://localhost:5001";

export async function getPlaces() {
    const response = await fetch(`${API_URL}/api/logs`);
    return response.json();
}

export async function createLogEntry(entry) {
    const response = await fetch(`${API_URL}/api/logs`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(entry),
    });
    return response.json();
}

export async function loginUser(credentials) {
    const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });
    return response.json();
}

export async function registerUser(credentials) {
    const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });
    return response.json();
}

export async function updatePlaceStatus(userId, placeId, status) {
    const response = await fetch(`${API_URL}/api/logs/status`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, placeId, status }),
    });
    return response.json();
}

export async function getUserPlaces(userId) {
    const response = await fetch(`${API_URL}/api/logs/user/${userId}`);
    return response.json();
}
