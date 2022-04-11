<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-3"></div>
      <div class="col-sm-6">
        <div class="list-group">

          <div class="list-group-item list-group-item-action" v-for="task in tasks" :key="task.id">
            {{ task.name }}
            <router-link :to="{name: 'time-tracker', params:{id: task.id}}" v-show="isEmployee">Внести трудозатраты
            </router-link>
            <executor-assign v-if="isProjectSupervisor" :options="executorOptions" :task-id="task.id"
                             :type="'team'"></executor-assign>
          </div>
        </div>
      </div>
      <div class="col-sm-3"></div>
    </div>
  </div>
</template>

<script>
import tasks from "@/api/tasks";
import {mapGetters} from "vuex";
import ExecutorAssign from "@/components/ExecutorAssign";
import teams from "@/api/teams";
import users from "@/api/users";

export default {
  name: "TaskList",
  components: {ExecutorAssign},
  data: () => ({
    tasks: [
      {id: 1, name: 'foo', project: {name: '', id: 1}},
      {id: 2, name: 'bar'}
    ],
    executorOptions: []
  }),
  computed: {
    ...mapGetters('user', ['isEmployee', 'isProjectSupervisor'])
  },
  async created() {
    this.tasks = await tasks.getTasks()
    if (this.isProjectSupervisor) {
      this.executorOptions = await teams.getTeams()
    } else {
      let members = await users.getTeamMembers()
      members.forEach(e => e.name = `${e.firstName} ${e.lastName}`)
      this.executorOptions = members
    }
  }
}
</script>

<style scoped>

</style>