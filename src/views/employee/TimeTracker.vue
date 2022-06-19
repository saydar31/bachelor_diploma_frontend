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
        <p>Основной показатель: {{ task.unitValue }}</p>
        <p>Тип задачи: {{ task.type.description }}</p>
        <p>
          <button @click.prevent="closeTask()" class="btn btn-primary"
                  type="button" style="margin-left: 8px;margin-bottom: 6px;">
            Закрыть
          </button>
        </p>
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
        <form>
          <p>
            <label class="form-label">Часы
              <input v-model="timeEntry.hours" min="0" class="form-control" type="number">
            </label>
            <label class="form-label" style="margin-left: 8px;">Минуты
              <input v-model="timeEntry.minutes" min="0" class="form-control" type="number">
            </label>
            <button @click.prevent="toggleTimer" class="btn btn-primary"
                    type="button" style="margin-left: 8px;margin-bottom: 6px;">
              {{ timerIsStarted(task.id) ? 'остановить таймер' : 'запустить таймер' }}
            </button>
          </p>
          <p><label class="form-label">Дата
            <Datepicker v-model="timeEntry.date" :enable-time-picker="false"/>
          </label></p>
          <p><label class="form-label">Комментарий<textarea v-model="timeEntry.comment" class="form-control"></textarea></label>
          </p>
          <button class="btn btn-primary" type="button" @click.prevent="track">Добавить</button>
        </form>
        <p v-if="timeEntries.length">Предыдущие трудозатраты</p>
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
      unitValue: 14,
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
    },
    timeEntries: [],
    timer: {}
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
      this.timeEntries = await tasks.getEntries(this.task.id)
    } catch (e) {
      console.log(e)
    }
    let {hours, minutes} = this.getTimeById(this.task.id)
    this.timeEntry.hours = hours
    this.timeEntry.minutes = minutes
  },

  methods: {
    async track() {
      let timeEntry = Object.assign({}, this.timeEntry)
      timeEntry.date = timeEntry.date.toISOString().substring(0, 10)
      await tasks.track(this.task.id, timeEntry)
      this.task = await tasks.getTask(this.$route.params.id)
    },
    async closeTask() {
      await tasks.close(this.task.id)
      await this.$router.push({path: '/tasks'})
    },
    toggleTimer() {
      if (!this.timerIsStarted((this.task.id))) {
        let te = this.timeEntry
        this.timer = setInterval(() => {
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
      } else {
        clearInterval(this.timer)
        this.$store.commit('task/STOP_TIMER', this.task.id)
      }
    }
  }
}
</script>

<style scoped>

</style>