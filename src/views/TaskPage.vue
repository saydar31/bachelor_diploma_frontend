<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1>Задача</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-2">
        <p>{{ task.name }}</p>
        <p>Исполнитель: {{ task.assignee.firstName }} {{ task.assignee.lastName }}</p>
        <p>Основной показатель: {{ task.unitValue.toFixed(2) }}</p>
        <p>Тип задачи: {{ task.type.description }}</p>
      </div>
      <div class="col">
        <div class="progress">
          <div class="progress-bar" :class="{'bg-danger': factPercent > 100}" aria-valuenow="50" aria-valuemin="0"
               aria-valuemax="100"
               :style="{width: Math.min(100, factPercent) + '%'}">
            {{ factPercent }}%
          </div>
        </div>
        <p>Предполагаемое количество часов: {{ task.estimate.toFixed(2) }}</p>
        <p>Фактически затрачено: {{ task.factTime.toFixed(2) }}&nbsp;</p>
        <p v-if="timeEntries.length">Трудозатраты</p>
        <div class="list-group">
          <div v-for="te in timeEntries" :key="te.id" href="#" class="list-group-item ">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">{{ te.time.toFixed(2) }} часов</h5>
              <small>{{ te.date }}</small>
            </div>
            <p class="mb-1">{{ te.comment }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import tasks from "@/api/tasks";

export default {
  name: "TaskPage",
  data: () => ({
    task: {},
    timeEntries: []
  }),
  computed: {
    factPercent() {
      return Math.round(this.task.factTime / this.task.estimate * 100 * 100) / 100
    },
  },
  async created() {
    this.task = await tasks.getTask(this.$route.params.id)
    this.timeEntries = await tasks.getEntries(this.$route.params.id)
  }
}
</script>

<style scoped>

</style>