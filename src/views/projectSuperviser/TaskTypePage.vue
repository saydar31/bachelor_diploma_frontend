<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-4 col-xl-4">
        <h1>{{ taskType.description }}</h1>
        <p>Параметры оценки задач</p>
        <p>Человеко-часы за единицу измерения: {{ taskType.coefficients.manHourPerUnit }}</p>
        <p>Постоянные трудозатраты: {{ taskType.coefficients.constantBias }}<br></p>
        <div v-if="taskType.coefficientsDraft">
          <p>Обновление параметров:</p>
          <p>Человеко-часы за метр квадратный: {{ taskType.manHourPerSquareMeterDraft }}</p>
          <p>Постоянные трудозатраты: {{ taskType.constantBiasDraft }}<br></p>
          <button @click="confirmParamsChange" class="btn btn-primary" type="button">Применить</button>
          <button @click="showTaskChanges = false" class="btn btn-primary" type="button"
                  style="--bs-secondary: #6c757d;--bs-secondary-rgb: 108,117,125;margin-right: 1px;margin-left: 6px;background: var(--bs-gray);">
            Откланить
          </button>
        </div>
      </div>
      <div class="col-lg-9 col-xl-7">
        <p>График Задач</p>
        <div>
          <canvas id="chart"></canvas>
        </div>
        <p>Аномалии:</p>
        <ul class="list-group">
          <li v-for="anomaly in anomalies" :key="anomaly.id" class="list-group-item"><a href="#">{{ anomaly.name }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import taskTypes from "@/api/taskTypes";
import {Chart, registerables} from 'chart.js'

Chart.register(...registerables)

export default {
  name: "TaskTypePage",
  data: () => ({
    taskType: {
      description: '...',
      constantBias: .0,
      manHourPerSquareMeter: .0,
      constantBiasDraft: .0,
      manHourPerSquareMeterDraft: .0,
      lastParamsUpdate: new Date()
    },
    anomalies: [],
    estimates: [],
    facts: [],
  }),
  async created() {
    this.taskType = await taskTypes.getTaskType(this.$route.params.id)
    this.anomalies = await taskTypes.getAnomalies(this.$route.params.id)
    let {facts, estimates, squares} = await taskTypes.getChartData(this.$route.params.id)
    console.log(facts)
    console.log(estimates)
    let ctx = document.getElementById('chart').getContext('2d')
    new Chart(ctx, {
      type: 'scatter',
      data: {
        labels: squares,
        datasets: [
          {
            label: 'Запланировано',
            data: estimates,
            backgroundColor: '#86c658',
            showLine: true,
            borderColor: '#86c658'
          },
              {
                label: 'Фактически потрачено',
                data: facts,
                backgroundColor: '#36a2eb'
              }
            ]
          },
          options: {
            scales: {
              x: {
                beginAtZero: true
              }
            }
          }
        }
    )
  },
  methods: {
    async confirmParamsChange() {
      await taskTypes.confirmParamsChange(this.taskType.id)
    }
  }
}
</script>

<style scoped>

</style>