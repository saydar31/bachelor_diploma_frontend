<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-3"></div>
      <div class="col-sm-6">
        <div v-if="isEmployee" class="list-group">

          <div class="list-group-item list-group-item-action" v-for="task in tasks" :key="task.id">
            {{ task.project.name + '-' + task.id }}
            <router-link :to="{name: 'time-tracker', params:{id: task.id}}">Внести трудозатраты</router-link>
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

export default {
  name: "TaskList",
  data: () => ({
    tasks: [
      {id: 1, name: 'foo', project: {name: '', id: 1}},
      {id: 2, name: 'bar'}
    ]
  }),
  computed: {
    ...mapGetters('user', ['isEmployee'])
  },
  async created() {
    this.tasks = await tasks.getTasks()
  }
}
</script>

<style scoped>

</style>