import httpClient from "@/httpClient";

export default {
    getTypes: async () => {
        let response = await httpClient.get('/task-type')
        return response.data
    },
    getTaskType: async (id) => {
        let response = await httpClient.get(`/task-type/${id}`)
        return response.data
    },
    confirmParamsChange: (id) => httpClient.post(`/task-type/${id}/confirm`)

}