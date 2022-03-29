import {createRouter, createWebHistory} from 'vue-router'
import NotFoundPage from "@/views/NotFoundPage";
import TimeTracker from "@/views/employee/TimeTracker";
import TaskList from "@/views/employee/TaskList";

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/task/:id/track',
            component: TimeTracker
        },
        {
            path: '/tasks',
            component: TaskList
        },
        {
            path: '/foo',
            component: NotFoundPage
        }
    ]
})