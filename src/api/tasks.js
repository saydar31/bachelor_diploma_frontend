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
        timeEntry.time = timeEntry.minutes / 60 + timeEntry.hours
        delete timeEntry.hours
        delete timeEntry.minutes
        await httpClient.post(`/task/${id}/track`, timeEntry)
    },
    getTasks: async () => {
        let tasks = (await httpClient.get('/task')).data
        tasks.forEach(task => task.name = taskName(task))
        return tasks
    },
    assign: async (id, type, assigneeId) => {
        await httpClient.post(`/task/${id}/assign-${type}/${assigneeId}`)
    }
}