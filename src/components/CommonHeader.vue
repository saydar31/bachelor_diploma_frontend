<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img :src="require('@/assets/time_logo.png')" width="30" height="30" class="d-inline-block align-top" alt="">
        Модуль управления ресурсами
      </a>
      <div class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown"
           aria-expanded="false">
          {{ user.firstName }} {{ user.lastName }}
        </a>
        <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <li><a class="dropdown-item" href="#">Action</a></li>
          <li><a class="dropdown-item" href="#">Another action</a></li>
          <li><a class="dropdown-item" href="#">Something else here</a></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import 'bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";
import {mapGetters} from 'vuex';

export default {
  name: "CommonHeader",
  computed: {
    ...mapGetters('user', {
      user: 'user'
    })
  }
}
</script>

<style scoped>

</style>