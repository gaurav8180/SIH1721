import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://e083-2409-4081-dcb-7da7-320a-b946-1cd3-5cac.ngrok-free.app/';

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