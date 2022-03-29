import httpClient from "@/httpClient";

const actions = {
    getCurrentTasks: async () => {
        try {
            let response = await httpClient.get('/task')
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