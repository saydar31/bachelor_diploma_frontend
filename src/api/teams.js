import httpClient from "@/httpClient";

export default {
    getTeams: async () => {
        let response = await httpClient.get('/team')
        return response.data
    },
    getTeamData: async (teamId) => {
        let response = await httpClient.get(`/team/${teamId}`)
        return response.data
    },
    getTeamMembers: async (projectId) => {
        let response = await httpClient.get(`/team/${projectId}/members`)
        return response.data;
    },
    async getAvailableUsers(id) {
        let response = await httpClient.get(`/team/${id}/availableUsers`)
        return response.data
    },
    async save(id, data) {
        let response = await httpClient.post(`/team/${id}`, data)
        return response.data
    }
}