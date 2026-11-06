const BASE_URL = import.meta.env.VITE_API_BASE_URL || ''; // Relative path leverages Vite dev proxy & same-origin prod

async function parseResponse(res) {
  const contentType = res.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Request failed');
    return data;
  }
  const text = await res.text();
  throw new Error(`Server returned non-JSON response (${res.status}): ${text.slice(0, 40)}...`);
}

export const api = {
  // Public Data
  async getPublicData() {
    try {
      const res = await fetch(`${BASE_URL}/api/public/all`);
      return await parseResponse(res);
    } catch (err) {
      console.warn('[Portfolio API] Public data fetch failed, using built-in data:', err.message);
      return { success: false, error: err.message };
    }
  },

  async getProfile() {
    const res = await fetch(`${BASE_URL}/api/public/profile`);
    return parseResponse(res);
  },

  async getAcademics() {
    const res = await fetch(`${BASE_URL}/api/public/academics`);
    return parseResponse(res);
  },

  async getProjects() {
    const res = await fetch(`${BASE_URL}/api/public/projects`);
    return parseResponse(res);
  },

  async getCompanyVisits() {
    const res = await fetch(`${BASE_URL}/api/public/company-visits`);
    return parseResponse(res);
  },

  async getActivities() {
    const res = await fetch(`${BASE_URL}/api/public/activities`);
    return parseResponse(res);
  },

  async getEvents() {
    const res = await fetch(`${BASE_URL}/api/public/events`);
    return parseResponse(res);
  },

  async getSkills() {
    const res = await fetch(`${BASE_URL}/api/public/skills`);
    return parseResponse(res);
  },

  async getCertificates() {
    const res = await fetch(`${BASE_URL}/api/public/certificates`);
    return parseResponse(res);
  },

  async getReflection() {
    const res = await fetch(`${BASE_URL}/api/public/reflection`);
    return parseResponse(res);
  },

  // Contact
  async submitContact(formData) {
    const res = await fetch(`${BASE_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    return parseResponse(res);
  },

  // Auth
  async login(username, password) {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ username, password })
    });
    return parseResponse(res);
  },

  async changePassword(currentPassword, newPassword, token) {
    const res = await fetch(`${BASE_URL}/api/auth/change-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      credentials: 'include',
      body: JSON.stringify({ currentPassword, newPassword })
    });
    return parseResponse(res);
  },

  async checkAuth(token) {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const res = await fetch(`${BASE_URL}/api/auth/me`, {
      headers,
      credentials: 'include'
    });
    return parseResponse(res);
  },

  async logout() {
    const res = await fetch(`${BASE_URL}/api/auth/logout`, {
      method: 'POST',
      credentials: 'include'
    });
    return parseResponse(res);
  },

  // Admin Overview
  async getAdminOverview(token) {
    const res = await fetch(`${BASE_URL}/api/admin/overview`, {
      headers: { Authorization: `Bearer ${token}` },
      credentials: 'include'
    });
    return parseResponse(res);
  },

  // Admin Profile (includes dateOfBirth)
  async getAdminProfile(token) {
    const res = await fetch(`${BASE_URL}/api/admin/profile`, {
      headers: { Authorization: `Bearer ${token}` },
      credentials: 'include'
    });
    return parseResponse(res);
  },

  async updateAdminProfile(profileData, token) {
    const res = await fetch(`${BASE_URL}/api/admin/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      credentials: 'include',
      body: JSON.stringify(profileData)
    });
    return parseResponse(res);
  },

  // Generic Admin CRUD Helper
  async adminGet(endpoint, token) {
    const res = await fetch(`${BASE_URL}/api/admin/${endpoint}`, {
      headers: { Authorization: `Bearer ${token}` },
      credentials: 'include'
    });
    return parseResponse(res);
  },

  async adminCreate(endpoint, payload, token) {
    const res = await fetch(`${BASE_URL}/api/admin/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      credentials: 'include',
      body: JSON.stringify(payload)
    });
    return parseResponse(res);
  },

  async adminUpdate(endpoint, id, payload, token) {
    const url = id ? `${BASE_URL}/api/admin/${endpoint}/${id}` : `${BASE_URL}/api/admin/${endpoint}`;
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      credentials: 'include',
      body: JSON.stringify(payload)
    });
    return parseResponse(res);
  },

  async adminDelete(endpoint, id, token) {
    const res = await fetch(`${BASE_URL}/api/admin/${endpoint}/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
      credentials: 'include'
    });
    return parseResponse(res);
  },

  // Upload File
  async uploadFile(file, category, name, token) {
    const formData = new FormData();
    formData.append('file', file);
    if (category) formData.append('category', category);
    if (name) formData.append('name', name);

    const res = await fetch(`${BASE_URL}/api/upload`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      credentials: 'include',
      body: formData
    });
    return parseResponse(res);
  },

  // Get Documents List
  async getDocuments(token) {
    const res = await fetch(`${BASE_URL}/api/upload/documents`, {
      headers: { Authorization: `Bearer ${token}` },
      credentials: 'include'
    });
    return parseResponse(res);
  },

  async deleteDocument(id, token) {
    const res = await fetch(`${BASE_URL}/api/upload/documents/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
      credentials: 'include'
    });
    return parseResponse(res);
  }
};
