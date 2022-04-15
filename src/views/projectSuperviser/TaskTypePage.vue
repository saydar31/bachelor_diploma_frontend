<template>
<div class="container-fluid">
  <div class="row">
    <div class="col-sm-3">
      <p>Описание: {{taskType.description}}</p>
    </div>
    <div class="col-sm-8">
      <p>Параметры вычисления оцнеки трудозатрат в зависимости от площади помещения</p>
      <p>Постоянные трудозатраты: {{taskType.constantBias}}</p>
      <p>Человеко-часы за метр квадратный: {{taskType.manHourPerSquareMeter}}</p>
      <div v-if="taskType.constantBiasDraft && taskType.manHourPerSquareMeterDraft">
        <p>Изменились параметры для расчета оценки. Дата изменения: {{taskType.lastParamsUpdate}}</p>
        <p>Постоянные трудозатраты: {{taskType.constantBiasDraft}}</p>
        <p>Человеко-часы за метр квадратный: {{taskType.manHourPerSquareMeterDraft}}</p>
        <button @click="confirmParamsChange">применить изменения параметров</button>
      </div>
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
    }
  }),
  async created() {
    this.taskType = await taskTypes.getTaskType(this.$route.params.id)
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