const BASE_URL = ''; // Relative path leverages Vite dev proxy & same-origin prod

export const api = {
  // Public Data
  async getPublicData() {
    const res = await fetch(`${BASE_URL}/api/public/all`);
    if (!res.ok) throw new Error('Failed to load portfolio data');
    return res.json();
  },

  async getProfile() {
    const res = await fetch(`${BASE_URL}/api/public/profile`);
    return res.json();
  },

  async getAcademics() {
    const res = await fetch(`${BASE_URL}/api/public/academics`);
    return res.json();
  },

  async getProjects() {
    const res = await fetch(`${BASE_URL}/api/public/projects`);
    return res.json();
  },

  async getCompanyVisits() {
    const res = await fetch(`${BASE_URL}/api/public/company-visits`);
    return res.json();
  },

  async getActivities() {
    const res = await fetch(`${BASE_URL}/api/public/activities`);
    return res.json();
  },

  async getEvents() {
    const res = await fetch(`${BASE_URL}/api/public/events`);
    return res.json();
  },

  async getSkills() {
    const res = await fetch(`${BASE_URL}/api/public/skills`);
    return res.json();
  },

  async getCertificates() {
    const res = await fetch(`${BASE_URL}/api/public/certificates`);
    return res.json();
  },

  async getReflection() {
    const res = await fetch(`${BASE_URL}/api/public/reflection`);
    return res.json();
  },

  // Contact
  async submitContact(formData) {
    const res = await fetch(`${BASE_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Error submitting message');
    return data;
  },

  // Auth
  async login(username, password) {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Login failed');
    return data;
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
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to change password');
    return data;
  },

  async checkAuth(token) {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const res = await fetch(`${BASE_URL}/api/auth/me`, {
      headers,
      credentials: 'include'
    });
    if (!res.ok) throw new Error('Not authenticated');
    return res.json();
  },

  async logout() {
    const res = await fetch(`${BASE_URL}/api/auth/logout`, {
      method: 'POST',
      credentials: 'include'
    });
    return res.json();
  },

  // Admin Overview
  async getAdminOverview(token) {
    const res = await fetch(`${BASE_URL}/api/admin/overview`, {
      headers: { Authorization: `Bearer ${token}` },
      credentials: 'include'
    });
    if (!res.ok) throw new Error('Failed to load overview data');
    return res.json();
  },

  // Admin Profile (includes dateOfBirth)
  async getAdminProfile(token) {
    const res = await fetch(`${BASE_URL}/api/admin/profile`, {
      headers: { Authorization: `Bearer ${token}` },
      credentials: 'include'
    });
    return res.json();
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
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update profile');
    return data;
  },

  // Generic Admin CRUD Helper
  async adminGet(endpoint, token) {
    const res = await fetch(`${BASE_URL}/api/admin/${endpoint}`, {
      headers: { Authorization: `Bearer ${token}` },
      credentials: 'include'
    });
    return res.json();
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
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || `Failed to create item in ${endpoint}`);
    return data;
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
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || `Failed to update ${endpoint}`);
    return data;
  },

  async adminDelete(endpoint, id, token) {
    const res = await fetch(`${BASE_URL}/api/admin/${endpoint}/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
      credentials: 'include'
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || `Failed to delete ${endpoint}`);
    return data;
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
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'File upload failed');
    return data;
  },

  // Get Documents List
  async getDocuments(token) {
    const res = await fetch(`${BASE_URL}/api/upload/documents`, {
      headers: { Authorization: `Bearer ${token}` },
      credentials: 'include'
    });
    return res.json();
  },

  async deleteDocument(id, token) {
    const res = await fetch(`${BASE_URL}/api/upload/documents/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
      credentials: 'include'
    });
    return res.json();
  }
};

