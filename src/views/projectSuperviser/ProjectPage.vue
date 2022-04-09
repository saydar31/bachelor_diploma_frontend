<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-3"><h2>{{ project.name }}</h2></div>
      <div class="col-sm-6">
        <div class="list-group">
          <div class="list-group-item list-group-item-action" v-for="task in tasks" :key="task.id">
            {{ task.name }}
          </div>
        </div>
      </div>
      <div class="col-sm-3"></div>
    </div>
  </div>
</template>

<script>
import projects from "@/api/projects";

export default {
  name: "ProjectPage",
  data: () => ({
    tasks: [],
    project: {id: 0, name: ''}
  }),

  async created() {
    this.project = await projects.getProjectData(this.$route.params.id)
    this.tasks = await projects.getTasksByProject(this.$route.params.id)
  }
}
</script>

<style scoped>

</style>