<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-3"></div>
      <div class="col-sm-6">
        <div class="list-group">
          <div class="list-group-item list-group-item-action" v-for="taskType in taskTypes" :key="taskType.id">
            {{ taskType.description }}
          </div>
        </div>
      </div>
      <div class="col-sm-3"></div>
    </div>
  </div>
</template>

<script>
import taskTypes from "@/api/taskTypes";

export default {
  name: "TaskTypes",
  data: () => ({
    taskTypes: [{id: 0, description: ''}]
  }),
  async created() {
    this.taskTypes = await taskTypes.getTypes()
  }
}
</script>

<style scoped>

</style>