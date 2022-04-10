<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-3">
        <p v-show="!editing">{{ team.name }}</p>
        <p v-show="editing"><input placeholder="Новое имя" v-model="newName"></p>
        <p>{{ team.supervisor.firstName }} {{ team.supervisor.lastName }}</p>
        <button v-show="!editing" @click="turnEditingMode">Редактировать</button>
        <button v-show="editing" @click="editing = false">Отменить</button>
      </div>
      <div class="col-sm-6">
        <div class="list-group">
          <div class="list-group-item list-group-item-action" v-for="member in members" :key="member.id">
            {{ `${member.firstName} ${member.lastName}` }}
            <button v-show="editing">-</button>
          </div>
        </div>
        <form v-show="editing && this.userOptions.length > 0">
          <select v-model="selectedUser">
            <option v-for="user in userOptions" :key="user.id" :value="user">
              {{ `${user.firstName} ${user.lastName}` }}
            </option>
          </select>
          <button @click.prevent="addUserToList">+</button>
        </form>
        <button @click="save" v-show="editing">
          Сохранить
        </button>
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
    ],
    editing: false,
    userOptions: [
      {
        id: 0,
        firstName: '',
        lastName: ''
      }
    ],
    selectedUser: {},
    newName: ''
  }),
  async created() {
    let id = this.$route.params.id
    this.team = await teams.getTeamData(id)
    this.newName = this.team.name
    this.members = await teams.getTeamMembers(id)
  },
  methods: {
    async turnEditingMode() {
      this.userOptions = await teams.getAvailableUsers(this.team.id)
      this.editing = true;
    },

    addUserToList() {
      this.selectedUser.new = true
      this.members.push(this.selectedUser)
      this.userOptions = this.userOptions.filter(u => u.id !== this.selectedUser.id)
    },
    async save() {
      let data = {
        name: this.newName,
        userIdList: this.members.map(e => e.id)
      }
      this.team = await teams.save(this.team.id, data);
      this.editing = false
    }
  },
}
</script>

<style scoped>

</style>