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
    getTeamMembers: async (teamId) => {
        let response = await httpClient.get(`/team/${teamId}/members`)
        return response.data;
    },
    getAvailableUsers: async (id) => {
        let response = await httpClient.get(`/team/${id}/availableUsers`)
        return response.data
    },
    save: async (id, data) => {
        let response = await httpClient.post(`/team/${id}`, data)
        return response.data
    },
    create: async (data) => {
        let response = await httpClient.post('/team/', data)
        return response.data
    }
}