import axios from 'axios'; // Add 'from' keyword

import store from '@/store';
import router from '@/router';

const apiClient = axios.create({
    baseURL: 'http://localhost:0308/api',
});

apiClient.interceptors.request.use(async config =>{
    const token = await store.getters.getToken;
    config.headers.Authorization  = token;

    return config;
});

apiClient.interceptors.response.use(
    (response) => {
        if(response.data.responseCode === '03'){
            store.commit('setToken', null); 
            router.push('/');
        }
        return response;
    },
);

export default apiClient;
