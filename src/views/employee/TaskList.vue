<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-3"></div>
      <div class="col-sm-6">
        <div class="list-group">
          <a href="#" class="list-group-item list-group-item-action" v-for="task in tasks" :key="task.id">
            {{ task.name }}
          </a>
        </div>
      </div>
      <div class="col-sm-3"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TaskList",
  data: () => ({
    tasks: [
      {id: 1, name: 'foo'},
      {id: 2, name: 'bar'}
    ]
  }),
  mounted() {
  }
}
</script>

<style scoped>

</style>