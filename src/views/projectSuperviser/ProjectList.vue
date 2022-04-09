<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-3"></div>
      <div class="col-sm-6">
        <div class="list-group">
          <div class="list-group-item list-group-item-action" v-for="project in projects" :key="project.id">
            <router-link :to="{name:'project-page', params: {id: project.id}}">{{ project.name }}</router-link>
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
  name: "ProjectList",
  data: () => ({
    projects: [{id: 1, name: 'foo'}]
  }),
  async created() {
    this.projects = await projects.getProjects();
  }
}
</script>

<style scoped>

</style>