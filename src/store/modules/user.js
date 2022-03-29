const state = () => ({
    user: {
        state: 'ANONYMOUS',
        firstName: 'Валерий',
        lastName: 'Жмышенко',
        accessToken: '1'
    }
})

const getters = {
    user: (state) => state.user
}


const actions = {

}

const mutations = {}


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}