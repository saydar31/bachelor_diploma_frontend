import consts from "@/cosnts";

const state = () => ({
    user: {
        state: consts.AuthState.ANONYMOUS,
        firstName: 'Валерий',
        lastName: 'Жмышенко',
        accessToken: '2',
        position: consts.Position.EMPLOYEE
    }
})

const getters = {
    user: (state) => state.user,
    isEmployee: (state) => state.user.position === consts.Position.EMPLOYEE,
    isTeamSupervisor: (state) => state.user.position === consts.Position.TEAM_SUPERVISOR,
    isProjectSupervisor: (state) => state.user.position === consts.Position.PROJECT_SUPERVISOR,
    isLoggedIn: (state) => state.user.state === consts.AuthState.LOGGED_IN
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