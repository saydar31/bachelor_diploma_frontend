import axios from "axios";
import store from './store'
import cosnts from "@/cosnts";

const client = axios.create({
    baseURL: cosnts.API_ROOT
})
client.interceptors.request.use(
    (config) => {
        let token = store.getters["user/user"].accessToken
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        } else {
            delete config.headers['Authorization']
        }
        return config
    }
)
export default {
    ...client
}