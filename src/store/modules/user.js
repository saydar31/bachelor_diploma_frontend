import cosnts from "@/cosnts";

const state = () => ({
    user: {
        state: 'ANONYMOUS',
        firstName: 'Валерий',
        lastName: 'Жмышенко',
        accessToken: '1',
        position: cosnts.Position.EMPLOYEE
    }
})

const getters = {
    user: (state) => state.user,
    isEmployee: (state) => state.user.position === cosnts.Position.EMPLOYEE,
    isTeamSupervisor: (state) => state.user.position === cosnts.Position.TEAM_SUPERVISOR,
    isProjectSupervisor: (state) => state.user.position === cosnts.Position.PROJECT_SUPERVISOR,
}


const actions = {}

const mutations = {}


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}