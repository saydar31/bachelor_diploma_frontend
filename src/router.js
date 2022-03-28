import {createRouter, createWebHistory} from 'vue-router'
import NotFoundPage from "@/views/NotFoundPage";
import TimeTracker from "@/views/employee/TimeTracker";

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/task/:id/track',
            component: TimeTracker
        },
        {
            path: '/foo',
            component: NotFoundPage
        }
    ]
})