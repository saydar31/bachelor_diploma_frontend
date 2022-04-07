import {createRouter, createWebHistory} from 'vue-router'
import NotFoundPage from "@/views/NotFoundPage";
import TimeTracker from "@/views/employee/TimeTracker";
import TaskList from "@/views/TaskList";
import TaskPage from "@/views/TaskPage";

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: 'time-tracker',
            path: '/task/:id/track',
            component: TimeTracker
        },
        {
            name: 'task',
            path: '/task/:id',
            component: TaskPage
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