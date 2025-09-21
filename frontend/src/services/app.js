// NOTE: user preference: call axios using `${process.env.REACT_APP_API_URL}/api/...`
// For Vite, environment var is VITE_API_URL
import axios from 'axios';

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:1000';

// helper to include token
export const axiosWithAuth = (token) => {
  return axios.create({
    baseURL: `${API_URL}/api`,
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  });
};
