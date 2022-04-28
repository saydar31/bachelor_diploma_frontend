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
        <p>Площадь: {{ task.square }}</p>
        <p>Тип задачи: {{ task.type.description }}</p>
        <p>Теги</p>
        <ul class="list-group">
          <li v-for="prop in task.properties" :key="prop.name" class="list-group-item"><span>{{ prop.name }}</span></li>
        </ul>
      </div>
      <div class="col">
        <div class="progress">
          <div class="progress-bar" :class="{'bg-danger': factPercent > 100}" aria-valuenow="50" aria-valuemin="0"
               aria-valuemax="100"
               :style="{width: Math.min(100, factPercent) + '%'}">
            {{ factPercent }}%
          </div>
        </div>
        <p>Предполагаемое количество часов: {{ task.estimate }}</p>
        <p>Фактически затрачено: {{ task.factTime }}&nbsp;</p>
        <form>
          <p><label class="form-label">Часы<input v-model="timeEntry.time" class="form-control" type="number"></label>
          </p>
          <p><label class="form-label">Дата
            <Datepicker v-model="timeEntry.date" :enable-time-picker="false"/>
          </label></p>
          <p><label class="form-label">Комментарий<textarea v-model="timeEntry.comment" class="form-control"></textarea></label>
          </p>
          <button class="btn btn-primary" type="button" @click.prevent="track">Добавить</button>
          <button class="btn btn-primary" type="button"
                  style="padding-right: 12px;margin-left: 6px;background: var(--bs-gray);">Отменить
          </button>
        </form>
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
  computed: {
    factPercent() {
      return Math.round(this.task.factTime / this.task.estimate * 100 * 100) / 100
    }
  },

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