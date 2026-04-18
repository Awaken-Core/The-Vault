import axios from 'axios';
import { API_BASE } from '@/utils/constants';

const apiClient = axios.create({
    baseURL: API_BASE,
    withCredentials: true,
});

export default apiClient;
