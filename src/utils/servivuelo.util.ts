import axios from 'axios'
import qs from 'qs'

const instance = axios.create({
    baseURL: 'http://localhost:80/servivuelo',
    headers: {
        'Content-Type': 'application/json',
    },
    paramsSerializer: {
        serialize: (params: any) =>
            qs.stringify(params, { arrayFormat: 'comma' }),
    },
})

instance.interceptors.response.use((response) => response.data)

export default instance