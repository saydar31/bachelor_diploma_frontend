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
            config.headers['Authorization'] = token
        } else {
            delete config.headers['Authorization']
        }
    }
)
export default {
    client
}