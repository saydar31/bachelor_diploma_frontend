import httpClient from "@/httpClient";

const actions = {
    async getCurrentTasks() {
        try {
            let response = await httpClient.client.get('/task')
            return response.data
        } catch (error) {
            console.log(error)
        }
    }
}

export default {
    namespaced: true,
    actions
}