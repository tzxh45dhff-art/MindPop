const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const fetchProfileOptions = async () => {
    const res = await fetch(`${API_BASE}/profile/options`);
    if (!res.ok) throw new Error('Failed to fetch profile options');
    return res.json();
};
