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
    confirmParamsChange: async (id) => httpClient.post(`/task-type/${id}/confirm`),
    getAnomalies: async (id) => {
        let response = await httpClient.get(`/task-type/${id}/anomalies`)
        return response.data
    },
    getChartData: async (id) => {
        let response = await httpClient.get(`/task-type/${id}/chart-data`)
        let tasks = response.data
        let estimates = tasks.map(t => ({
            x: t.unitValue,
            y: t.estimate
        }))
        let facts = tasks.map(t => ({
            x: t.unitValue,
            y: t.factTime
        }))
        let squares = tasks.map(t => t.unitValue)
        return {
            estimates: estimates,
            facts: facts,
            squares: squares
        }
    }

}