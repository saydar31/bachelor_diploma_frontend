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
    }
}