<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-3">
        <h2>{{ task.name }}</h2>
        <p>{{ task.description }}</p>
        <p>Площадь помещения: {{ task.square }}</p>
        <p>Теги</p>
        <ul>
          <li v-for="tag in task.properties" :key="tag.id">
            {{ tag.name }}
          </li>
        </ul>
      </div>
      <div class="col-sm-6">
        <div>
          <div class="mb-3 mt-3">
            <label for="time" class="form-label">Затраченное время:</label>
            <input type="number" class="form-control" id="time" placeholder="Затраченное время" name="time"
                   v-model="timeEntry.duration">
          </div>
          <Datepicker v-model="timeEntry.date" :format="dateFormat"></Datepicker>
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
import httpClient from "@/httpClient";

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
      duration: .0,
      date: new Date(),
      comment: ''
    }
  }),

  async created() {
    this.task = (await httpClient.get(`/task/${this.$route.params.id}`)).data
  },

  methods: {
    dateFormat: (date) => `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`,
    async track() {
      try {
        await httpClient.post(`/task/${this.task.id}/track`, this.timeEntry)
      } catch (err) {
        console.log(err)
      }
    }

  }
}
</script>

<style scoped>

</style>