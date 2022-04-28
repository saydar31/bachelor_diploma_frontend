import {createStore} from 'vuex'
import createPersistedState from "vuex-persistedstate";
import user from './modules/user'
import task from "@/store/modules/task";

export default createStore({
    modules: {user, task},
    plugins: [createPersistedState()]
})