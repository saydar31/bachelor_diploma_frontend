<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-4 col-xl-4">
        <h1>{{ taskType.description }}</h1>
        <p>Параметры оценки задач</p>
        <p>Человеко-часы за единицу измерения: {{ taskType.coefficients.manHourPerUnit.toFixed(2) }}</p>
        <p>Постоянные трудозатраты: {{ taskType.coefficients.constantBias.toFixed(2) }}<br></p>
        <div
            v-if="taskType.coefficientsDraft.manHourPerUnit.toFixed(2) !== taskType.coefficients.manHourPerUnit.toFixed(2)">
          <p>Обновление параметров:</p>
          <p>Человеко-часы за метр квадратный: {{ taskType.coefficientsDraft.manHourPerUnit.toFixed(2) }}</p>
          <p>Постоянные трудозатраты: {{ taskType.coefficientsDraft.constantBias.toFixed(2) }}<br></p>
          <button @click="confirmParamsChange" class="btn btn-primary" type="button">Применить</button>

        </div>
      </div>
      <div class="col-lg-9 col-xl-7">
        <p>График Задач</p>
        <div>
          <canvas id="chart"></canvas>
        </div>
        <p>Аномалии:</p>
        <ul class="list-group">
          <li v-for="anomaly in anomalies" :key="anomaly.id" class="list-group-item">
            <router-link :to="{name:'task', params: {id: anomaly.id}}">{{ anomaly.name }} Плановое время:
              {{ anomaly.estimate.toFixed(2) }} Фактическое время: {{ anomaly.factTime.toFixed(2) }}
            </router-link>
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