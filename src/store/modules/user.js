import consts from "@/cosnts";
import httpClient from "@/httpClient";
const state = () => ({
    user: {
        firstName: 'Валерий',
        lastName: 'Жмышенко',
        position: consts.Position.EMPLOYEE,
    },
    state: consts.AuthState.ANONYMOUS,
    tokens: {
        accessToken: '2',
        refreshToken: ''
    }
})

const getters = {
    user: (state) => state.user,
    isEmployee: (state) => state.user.position === consts.Position.EMPLOYEE,
    isTeamSupervisor: (state) => state.user.position === consts.Position.TEAM_SUPERVISOR,
    isProjectSupervisor: (state) => state.user.position === consts.Position.PROJECT_SUPERVISOR,
    isLoggedIn: (state) => state.state === consts.AuthState.LOGGED_IN,
    accessToken: (state) => state.tokens.accessToken
}


const actions = {
    login: async ({commit}, loginAndPassword) => {
        let response = await httpClient.post('/login', loginAndPassword)
        commit('SET_TOKENS', response.data)
    },

    getMe: async ({commit}) => {
        let response = await httpClient.get('/user/me')
        commit('SET_USER', response.data)
    },
    foo: (s) => s
}

const mutations = {
    SET_TOKENS: (state, tokens) => {
        state.tokens.accessToken = tokens.accessToken
        state.tokens.refreshToken = tokens.refreshToken
    },
    SET_USER: (state, user) => {
        state.user = user
    }
}


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}