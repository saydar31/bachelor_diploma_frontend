<template>
  <div v-show="show">
    <select v-model="selected">
      <option v-for="option in options" :value="option" :key="option.id">
        {{ option.name }}
      </option>
    </select>
    <button @click="assign">Назначить</button>
  </div>
</template>

<script>
import tasks from "@/api/tasks";

export default {
  name: "ExecutorAssign",
  props: ['options', 'type', 'taskId'],
  data: () => ({
    selected: {},
    show: true
  }),
  methods: {
    async assign() {
      await tasks.assign(this.taskId, this.type, this.selected.id)
      this.show = false
    }
  }
}
</script>

<style scoped>

</style>