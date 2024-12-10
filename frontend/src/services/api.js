import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://f60c-2409-408c-bebe-6bf0-254a-111e-512a-7d70.ngrok-free.app';
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await api.post('/api/upload', formData);
    return response.data;
  } catch (error) {
    console.error('Upload failed:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export default api;
