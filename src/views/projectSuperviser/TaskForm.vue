<template>
  <div class="container">
    <div class="row">
      <div class="col-md-2">
      </div>
      <div class="col-md-8">
        <p>Проект</p>
        <select v-model="task.project">
          <option v-for="(project, index) in projects" :key="project.id" :value="project" :selected="index === 0">{{
              project.name
            }}
          </option>
        </select>
        <p>Значение основного показателя:</p>
        <p><input v-model="task.unitValue" type="number"></p>
        <p>Вид работ:</p>
        <p><select v-model="task.type">
          <option v-for="(type, index) in types" :key="type.id" :value="type" :selected="index === 0">{{
              type.description
            }}
          </option>
        </select></p>
        <p>Оценка времени выполнения, без учета должности: {{ estimate }}</p>
        <p>Оценки с учетом должностей</p>
        <table class="table">
          <thead>
          <tr>
            <td>Должность</td>
            <td>оценка</td>
          </tr>
          </thead>
          <tbody>
          <tr v-for="grade in grades" :key="grade.id">
            <td>{{ grade.name }}</td>
            <td>{{ (estimate * grade.coefficient).toFixed(2) }}</td>
          </tr>
          </tbody>
        </table>
        <p>
          <button @click="create" class="btn btn-primary">Создать</button>
        </p>
      </div>
      <div class="col-md-2"></div>
    </div>
  </div>
</template>

<script>
import tasks from "@/api/tasks";
import taskTypes from "@/api/taskTypes";
import users from "@/api/users";
import projects from "@/api/projects";

export default {
  name: "TaskForm",
  data: () => ({
    types: [
      {
        name: 'Электросети жилая комната',
        id: 2,
        coefficients: {
          manHourPerUnit: 0.25,
          constantBias: 1
        }
      },
      {
        name: 'Газовая система жилая комната',
        id: 1,
        coefficients: {
          manHourPerUnit: 0.2,
          constantBias: 3
        }
      }
    ],
    grades: [
      {
        id: 1,
        name: 'Инженер высшей категории',
        coefficient: 1.0
      },
      {
        id: 2,
        name: 'Стажер',
        coefficient: 1.2
      }
    ],
    projects: [
      {
        id: 1,
        name: 'Жилой дом 4 этажа'
      },
      {
        id: 2,
        name: 'Общежитие 100 мест'
      }
    ],
    task: {
      name: '',
      unitValue: 1.0,
      type: {
        id: 1,
        name: 'Газовая система жилая комната',
        coefficients: {
          manHourPerUnit: 0.2,
          constantBias: 3
        }
      },
      project: {
        id: 1,
        name: 'Жилой дом 4 этажа'
      }
    }
  }),
  computed: {
    estimate() {
      let {manHourPerUnit, constantBias} = this.task.type.coefficients
      return (manHourPerUnit * this.task.unitValue + constantBias).toFixed(2)
    }
  },

  async created() {
    try {
      this.types = await taskTypes.getTypes()
      if (this.types.length) {
        this.task.type = this.types[0]
      }
      this.grades = await users.getGrades()
      this.projects = await projects.getProjects()
      if (this.projects.length) {
        this.task.project = this.projects[0]
      }
    } catch (e) {
      console.log(e)
    }
  },

  methods: {
    async create() {
      await tasks.create(this.task)
      await this.$router.push({name: 'tasks'})
    }
  }
}
</script>

<style scoped>

</style>