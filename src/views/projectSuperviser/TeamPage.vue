<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-3"><p>{{ team.name }}</p>
        <p>{{ team.supervisor.firstName }} {{ team.supervisor.lastName }}</p></div>
      <div class="col-sm-6">
        <div class="list-group">
          <div class="list-group-item list-group-item-action" v-for="member in members" :key="member.id">
            {{ `${member.firstName} ${member.lastName}` }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import teams from "@/api/teams";

export default {
  name: "TeamPage",
  data: () => ({
    team: {
      supervisor: {
        id: 0,
        firstName: '',
        lastName: ''
      }
    },
    members: [
      {
        id: 0,
        firstName: '',
        lastName: ''
      }
    ]
  }),
  async created() {
    let id = this.$route.params.id
    this.team = await teams.getTeamData(id)
    this.members = await teams.getTeamMembers(id)
  }
}
</script>

<style scoped>

</style>