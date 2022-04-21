import {createRouter, createWebHistory} from 'vue-router'
import NotFoundPage from "@/views/NotFoundPage";
import TimeTracker from "@/views/employee/TimeTracker";
import TaskList from "@/views/TaskList";
import TaskPage from "@/views/TaskPage";
import ProjectList from "@/views/projectSuperviser/ProjectList";
import store from "@/store";
import ProjectPage from "@/views/projectSuperviser/ProjectPage";
import TeamList from "@/views/projectSuperviser/TeamList";
import TeamPage from "@/views/projectSuperviser/TeamPage";
import CreateTeam from "@/views/projectSuperviser/CreateTeam";
import TaskTypes from "@/views/projectSuperviser/TaskTypes";
import TaskTypePage from "@/views/projectSuperviser/TaskTypePage";

export default createRouter({
    history: createWebHistory(),
    routes: [
        //Стрвницы доступные для всех пользователей
        {
            name: 'project-page',
            path: '/project/:id',
            component: ProjectPage
        },
        //Страницы работника
        {
            name: 'time-tracker',
            path: '/task/:id/track',
            component: TimeTracker,
            beforeEnter: () => store.getters["user/isEmployee"]
        },
        {
            name: 'task',
            path: '/task/:id',
            component: TaskPage
        },
        {
            name: 'task-list',
            path: '/tasks',
            component: TaskList
        },
        //Страницы начальника проекта
        {
            name: 'project-list',
            path: '/projects',
            component: ProjectList,
            beforeEnter: () => store.getters['user/isProjectSupervisor']
        },
        {
            name: 'team-list',
            path: '/teams',
            component: TeamList,
            beforeEnter: () => store.getters["user/isProjectSupervisor"]
        },
        {
            name: 'team-page',
            path: '/team/:id',
            component: TeamPage,
            beforeEnter: () => store.getters['user/isProjectSupervisor']
        },
        {
            name: 'new-team',
            path: '/team/new',
            component: CreateTeam,
            beforeEnter: () => store.getters['user/isProjectSupervisor']
        },
        {
            name: 'task-type-list',
            path: '/task-types',
            component: TaskTypes
        },
        {
          name: 'task-type-page',
          path: '/task-type/:id',
          component: TaskTypePage,
          beforeEnter: () => store.getters['user/isProjectSupervisor']
        },
        {
            path: '/foo',
            component: NotFoundPage
        }
    ]
})