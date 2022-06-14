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
        <p>Основной показатель: {{ task.square }}</p>
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
        <p>Предполагаемое количество часов: {{ task.estimate }}</p>
        <p>Фактически затрачено: {{ task.factTime }}&nbsp;</p>
        <form>
          <p>
            <label class="form-label">Часы
              <input v-model="timeEntry.hours" min="0" class="form-control" type="number">
            </label>
            <label class="form-label" style="margin-left: 8px;">Минуты
              <input v-model="timeEntry.minutes" min="0" class="form-control" type="number">
            </label>
            <button @click.prevent="startTimer" :disabled="timerIsStarted(task.id)" class="btn btn-primary"
                    type="button" style="margin-left: 8px;margin-bottom: 6px;">
              запустить таймер
            </button>
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
import {mapGetters} from "vuex";

export default {
  name: "TimeTracker",
  components: {
    Datepicker,
  },
  data: () => ({
    task: {
      id: 2,
      name: 'Пояснительная записка',
      description: 'Составить пояснительную записку для проекта Трасса-60',
      square: 14,
      estimate: 7,
      factTime: 2,
      type: {
        description: 'Пояснительная записка для скоростной магистрали'
      }
    },
    timeEntry: {
      hours: 0,
      minutes: 0,
      date: new Date(),
      comment: ''
    }
  }),
  computed: {
    factPercent() {
      return Math.round(this.task.factTime / this.task.estimate * 100 * 100) / 100
    },
    ...mapGetters('task', ['timerIsStarted', 'getTimeById'])
  },

  async created() {
    try {
      this.task = await tasks.getTask(this.$route.params.id)
    } catch (e) {
      console.log(e)
    }
    let {hours, minutes} = this.getTimeById(this.task.id)
    this.timeEntry.hours = hours
    this.timeEntry.minutes = minutes
    console.log(this.timeEntry)
  },

  methods: {
    async track() {
      let timeEntry = Object.assign({}, this.timeEntry)
      timeEntry.date = timeEntry.date.toISOString().substring(0, 10)
      await tasks.track(this.task.id, timeEntry)
      this.task = await tasks.getTask(this.$route.params.id)
    },
    startTimer() {
      let te = this.timeEntry
      setInterval(() => {
        let m = te.minutes + 1
        let h = te.hours
        if (m === 60) {
          h = h + 1
          m = 0
        }
        te.hours = h
        te.minutes = m
      }, 60 * 1000)
      this.$store.commit('task/START_TIMER', this.task.id)
    }
  }
}
</script>

<style scoped>

</style>