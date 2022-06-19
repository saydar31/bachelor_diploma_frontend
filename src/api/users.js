import httpClient from "@/httpClient";

export default {
    getEmployees: async () => {
        let response = await httpClient.get('/user/employees')
        return response.data
    },
    getTeamSupervisors: async () => {
        let response = await httpClient.get('/user/team-supervisors')
        return response.data
    },
    getGrades: async () => {
        let response = await httpClient.get('/grade')
        return response.data
    }
}