import httpClient from "@/httpClient";

export default {
    getProjects: async () => {
        let response = await httpClient.get('/project')
        return response.data
    },
    getTasksByProject: async (projectId) => {
        let response = await httpClient.get(`/project/${projectId}/tasks`)
        return response.data
    },
    getProjectData: async (projectId) => {
        let response = await httpClient.get(`/project/${projectId}`)
        return response.data
    }
}