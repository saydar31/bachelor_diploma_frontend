<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-4 col-xl-4">
        <h1>{{taskType.description}}</h1>
        <p v-if="taskType.taskTypeProperties">Теги</p>
        <ul>
          <li v-for="prop in taskType.taskTypeProperties" :key="prop.id">{{ prop.description }}</li>
        </ul>
        <p>Параметры оценки задач</p>
        <p>Человеко-часы за метр квадратный: {{ taskType.manHourPerSquareMeter }}</p>
        <p>Постоянные трудозатраты: {{ taskType.constantBias }}<br></p>
        <div v-if="showTaskChanges">
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
          <canvas
              data-bss-chart="{&quot;type&quot;:&quot;bar&quot;,&quot;data&quot;:{&quot;labels&quot;:[&quot;January&quot;,&quot;February&quot;,&quot;March&quot;,&quot;April&quot;,&quot;May&quot;,&quot;June&quot;],&quot;datasets&quot;:[{&quot;label&quot;:&quot;Revenue&quot;,&quot;backgroundColor&quot;:&quot;#4e73df&quot;,&quot;borderColor&quot;:&quot;#4e73df&quot;,&quot;data&quot;:[&quot;4500&quot;,&quot;5300&quot;,&quot;6250&quot;,&quot;7800&quot;,&quot;9800&quot;,&quot;15000&quot;]}]},&quot;options&quot;:{&quot;maintainAspectRatio&quot;:true,&quot;legend&quot;:{&quot;display&quot;:false,&quot;labels&quot;:{&quot;fontStyle&quot;:&quot;normal&quot;}},&quot;title&quot;:{&quot;fontStyle&quot;:&quot;bold&quot;},&quot;scales&quot;:{&quot;xAxes&quot;:[{&quot;ticks&quot;:{&quot;fontStyle&quot;:&quot;normal&quot;}}],&quot;yAxes&quot;:[{&quot;ticks&quot;:{&quot;fontStyle&quot;:&quot;normal&quot;}}]}}}"></canvas>
        </div>
        <p>Аномалии:</p>
        <ul class="list-group">
          <li v-for="anomaly in anomalies" :key="anomaly.id" class="list-group-item"><a href="#">{{anomaly.name}}</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import taskTypes from "@/api/taskTypes";

export default {
  name: "TaskTypePage",
  data: () => ({
    taskType:{
      description: '...',
      constantBias: .0,
      manHourPerSquareMeter: .0,
      constantBiasDraft: .0,
      manHourPerSquareMeterDraft: .0,
      lastParamsUpdate: new Date()
    },
    anomalies: [],
    showTaskChanges: true
  }),
  async created() {
    this.taskType = await taskTypes.getTaskType(this.$route.params.id)
    this.anomalies = await taskTypes.getAnomalies(this.$route.params.id)
    
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