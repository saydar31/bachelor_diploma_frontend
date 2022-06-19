<template>
  <div class="container">
    <div>
      <ul class="nav nav-tabs" role="tablist">
        <li class="nav-item" role="presentation"><a class="nav-link active" role="tab" data-bs-toggle="tab"
                                                    href="#tab-1">Открытые</a></li>
        <li class="nav-item" role="presentation"><a class="nav-link" role="tab" data-bs-toggle="tab" href="#tab-2">Закрытые</a>
        </li>
      </ul>
      <div class="tab-content">
        <div class="tab-pane active" role="tabpanel" id="tab-1">
          <div class="table-responsive">
            <table class="table">
              <thead>
              <tr>
                <th>Проект</th>
                <th>Описание</th>
                <th>Вид работ</th>
                <th>Исполнитель</th>
                <th>Оценка</th>
                <th>Уже затрачено часов</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="task in tasks" :key="task.id">
                <td>{{ task.project.name }}</td>
                <td>
                  {{ task.description }}
                  <span v-if="!task.assignee"> <input class="form-check-input" type="checkbox" v-model="task.selected"
                  > распределить</span>
                </td>
                <td>{{ task.type.description }}</td>
                <td>{{ !task.assignee ? 'Не назначено' : `${task.assignee.firstName} ${task.assignee.lastName}` }}</td>
                <td>{{ task.estimate.toFixed(2) }}</td>
                <td>{{ task.factTime.toFixed(2) }}
                  <router-link :to="{name: 'time-tracker', params:{id: task.id}}" v-show="isEmployee">Внести
                    трудозатраты
                  </router-link>
                </td>
              </tr>
              </tbody>
            </table>

          </div>
          <div class="container-sm" v-show="selectedTasks.length">
            <div class="row">
              <div class="col-4">
                <Datepicker v-model="deadline" :min-date="new Date()" :enable-time-picker="false"/>
                <button @click.prevent="distribute" class="btn btn-primary" type="button" style="margin-top: 4px">
                  Распределить
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="tab-pane" role="tabpanel" id="tab-2">
          <div class="table-responsive">
            <table class="table">
              <thead>
              <tr>
                <th>Проект</th>
                <th>Описание</th>
                <th>Вид работ</th>
                <th>Исполнитель</th>
                <th>Оценка</th>
                <th>Уже затрачено часов</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="task in closedTasks" :key="task.id">
                <td>{{ task.project.name }}</td>
                <td>
                  {{ task.description }}
                </td>
                <td>{{ task.type.description }}</td>
                <td>{{ !task.assignee ? 'Не назначено' : `${task.assignee.firstName} ${task.assignee.lastName}` }}</td>
                <td>{{ task.estimate.toFixed(2) }}</td>
                <td>{{ task.factTime.toFixed(2) }}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tasks from "@/api/tasks";
import {mapGetters} from "vuex";
import Datepicker from '@vuepic/vue-datepicker';
import moment from "moment";

export default {
  name: "TaskList",
  components: {Datepicker},
  data: () => ({
    deadline: moment().add(7, 'days').toDate(),
    tasks: [],
    closedTasks: []
  }),
  computed: {
    ...mapGetters('user', ['isEmployee', 'isProjectSupervisor']),
    selectedTasks() {
      return this.tasks.filter(t => t.selected)
    }
  },
  async created() {
    this.tasks = await tasks.getTasks()
    this.closedTasks = await tasks.getClosedTasks()
  },
  methods: {
    async distribute() {
      let taskIdList = this.selectedTasks.map(e => e.id)
      let distributedTasks = await tasks.distribute(taskIdList, this.deadline)
      for (const distributedTask of distributedTasks) {
        this.tasks.find(e => e.id === distributedTask.id).assignee = distributedTask.assignee
      }
    }
  }
}
</script>

<style scoped>

</style>