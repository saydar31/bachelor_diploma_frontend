import {createStore} from 'vuex'
import user from './modules/user'
import task from "@/store/modules/task";

export default createStore({
    modules: {user, task}
})