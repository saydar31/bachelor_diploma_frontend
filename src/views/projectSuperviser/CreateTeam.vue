<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-3"></div>
      <div class="col-sm-6">
        <form>
          <input placeholder="Название" v-model="team.name"><br>
          <select v-model="team.supervisor">
            <option v-for="user in supervisorOptions" :value="user" :key="user.id">
              {{ user.firstName }} {{ user.lastName }}
            </option>
          </select>
          <div class="list-group">
            <div class="list-group-item list-group-item-action" v-for="member in team.members" :key="member.id">
              {{ `${member.firstName} ${member.lastName}` }}
              <button>-</button>
            </div>
          </div>
          <div>
            <select v-model="selectedUser">
              <option v-for="user in userOptions" :key="user.id" :value="user">
                {{ `${user.firstName} ${user.lastName}` }}
              </option>
            </select>
            <button @click.prevent="addUserToList">+</button>
          </div>
          <button @click.prevent="save">Сохранить</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import users from "@/api/users";
import teams from "@/api/teams";

export default {
  name: "CreateTeam",
  data: () => ({
    team: {
      name: '',
      members: [],
      supervisor: {}
    },
    userOptions: [],
    supervisorOptions: [],
    selectedUser: []
  }),

  async created() {
    this.supervisorOptions = await users.getTeamSupervisors()
    this.userOptions = await users.getEmployees()
  },

  methods: {
    addUserToList() {
      this.selectedUser.new = true
      this.team.members.push(this.selectedUser)
      this.userOptions = this.userOptions.filter(u => u.id !== this.selectedUser.id)
    },
    async save() {
      let data = {
        name: this.team.name,
        supervisorId: this.team.supervisor.id,
        userIdList: this.team.members.map(u => u.id)
      }
      let team = await teams.create(data)
      await this.$router.push({name: 'team-page', params: {id: team.id}})
    }
  }
}
</script>

<style scoped>

</style>