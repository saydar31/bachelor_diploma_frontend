<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-3"></div>
      <div class="col-sm-6">
        <div class="list-group">
          <div class="list-group-item list-group-item-action" v-for="team in teams" :key="team.id">
            <router-link :to="{name:'team-page', params: {id: team.id}}">{{ team.name }}</router-link>
          </div>
        </div>
      </div>
      <div class="col-sm-3"></div>
    </div>
  </div>
</template>

<script>
import teams from "@/api/teams";

export default {
  name: "TeamList",
  data: () => ({
    teams: [{name: '', id: 0, supervisor: {}}]
  }),

  async created() {
    this.teams = await teams.getTeams()
  }
}
</script>

<style scoped>

</style>