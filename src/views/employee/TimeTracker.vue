<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-3">
        <h2>{{ task.name }}</h2>
        <p>Площадь {{ task.square }}</p>
        <p>Запланировано {{ task.estimate }}</p>
        <p>Уже затрекано {{ task.factTime }}</p>
      </div>
      <div class="col-sm-6">
        <div>
          <div class="mb-3 mt-3">
            <label for="time" class="form-label">Затраченное время:</label>
            <input type="number" class="form-control" id="time" placeholder="Затраченное время" name="time"
                   v-model="timeEntry.time">
          </div>
          <Datepicker v-model="timeEntry.date" :enable-time-picker="false"></Datepicker>
          <label for="comment">Комментарий:</label>
          <textarea class="form-control" rows="5" id="comment" v-model="timeEntry.comment"></textarea>
          <button type="submit" class="btn btn-primary" @click="track">Добавить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import tasks from "@/api/tasks";

export default {
  name: "TimeTracker",
  components: {
    Datepicker,
  },
  data: () => ({
    task: {
      id: 2,
      name: 'Task',
      description: 'do this',
      square: .0,
      properties: [
        {id: 1, name: 'Электрика'},
        {id: 2, name: 'Жилой дом'},
      ]
    },
    timeEntry: {
      time: .0,
      date: new Date(),
      comment: ''
    }
  }),

  async created() {
    this.task = await tasks.getTask(this.$route.params.id)
  },

  methods: {
    async track() {
      let timeEntry = Object.assign({}, this.timeEntry)
      timeEntry.date = timeEntry.date.toISOString().substring(0, 10)
      await tasks.track(this.task.id, timeEntry)
      this.task = await tasks.getTask(this.$route.params.id)
    }
  }
}
</script>

<style scoped>

</style>