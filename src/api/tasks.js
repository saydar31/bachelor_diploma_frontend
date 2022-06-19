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
    },
    create: async (task) => {
        await httpClient.post('/task', task)
    },
    getClosedTasks: async () => {
        let response = await httpClient.get('/task?closed')
        return response.data;
    },
    distribute: async (idList, deadline) => {
        let response = await httpClient.post('/task/distribute', {
            taskIdList: idList,
            deadline: deadline
        })
        return response.data
    },
    getEntries: async (id) => {
        let response = await httpClient.get(`/task/${id}/timeEntries`)
        return response.data
    },
    close: async (id) => await httpClient.post(`/task/${id}/close`)

}