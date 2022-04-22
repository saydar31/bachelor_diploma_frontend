<template>
  <nav class="navbar navbar-light navbar-expand-md py-3">
    <div class="container"><a class="navbar-brand d-flex align-items-center" href="#">
      <clock-icon/>
      <span>Управление Ресурсами</span></a>
      <button v-show="isLoggedIn" data-bs-toggle="collapse" class="navbar-toggler" data-bs-target="#navcol-1"><span
          class="visually-hidden">Toggle navigation</span><span
          class="navbar-toggler-icon"></span></button>
      <div v-show="isLoggedIn" class="collapse navbar-collapse" id="navcol-1">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link :to="{name:'task-list'}" class="nav-link" :class="{active: this.$route.path.includes('task')}">
              Задачи
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{name: 'project-list'}" class="nav-link"
                         :class="{active: this.$route.path.includes('project')}">Проекты
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{name: 'team-list'}" class="nav-link"
                         :class="{active: this.$route.path.includes('team')}">Команды
            </router-link>
          </li>
        </ul>
        <span class="navbar-text">{{ user.firstName }} {{ user.lastName }}<a href="#"><log-off-icon/></a></span>
      </div>
    </div>
  </nav>
</template>

<script>
import 'bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";
import {mapGetters} from 'vuex';
import ClockIcon from "@/components/icons/ClockIcon";
import LogOffIcon from "@/components/icons/LogOffIcon";

export default {
  name: "CommonHeader",
  components: {LogOffIcon, ClockIcon},
  computed: {
    ...mapGetters('user', {
      user: 'user',
      isLoggedIn: 'isLoggedIn'
    })
  }
}
</script>

<style scoped>

</style>