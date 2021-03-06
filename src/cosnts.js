export default Object.freeze({
    API_ROOT: process.env.VUE_APP_API_ROOT,
    Position: {
        EMPLOYEE: 'EMPLOYEE',
        TEAM_SUPERVISOR: 'TEAM_SUPERVISOR',
        PROJECT_SUPERVISOR: 'PROJECT_SUPERVISOR'
    },
    AssignType: {
        TEAM: 'team',
        EMPLOYEE: 'employee'
    },
    AuthState: {
        ANONYMOUS: 'ANONYMOUS',
        LOGGED_IN: 'LOGGED_IN'
    }
})