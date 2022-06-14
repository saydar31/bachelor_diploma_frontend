import moment from "moment";

const actions = {}

const state = () => ({
    tasks: []
})

const mutations = {
    START_TIMER: (state, taskId) => state.tasks.push({taskId: taskId, time: moment()}),
    STOP_TIMER: (state, taskId) => {
        state.tasks = state.tasks.filter(e => e.taskId !== taskId)
    }
}

const getters = {
    getTimeById: (state) => (id) => {
        let time = state.tasks.find(e => e.taskId === id).time
        let now = moment()
        return {
            hours: now.diff(time, 'hours'),
            minutes: now.diff(time, 'minutes')
        }
    },
    timerIsStarted: (state) => (id) => state.tasks.some(e => e.taskId === id)
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}