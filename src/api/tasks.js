import httpClient from "@/httpClient";

const taskName = (task) => `${task.project.name}-${task.id}`

export default {
    getTask: async (id) => {
        let response = await httpClient.get(`/task/${id}`)
        let task = response.data
        task.name = taskName(task)
        return task
    },
    track: async (id, timeEntry) => {
        await httpClient.post(`/task/${id}/track`, timeEntry)
    },
    getTasks: async () => {
        let tasks = (await httpClient.get('/task')).data
        tasks.forEach(task => task.name = taskName(task))
        return tasks
    }
}