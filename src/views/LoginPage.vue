<template>
  <div class="container">
    <section class="position-relative py-4 py-xl-5">
      <div class="container">
        <div class="row mb-5">
          <div class="col-md-8 col-xl-6 text-center mx-auto">
            <h2>Вход</h2>
            <p class="w-lg-50"></p>
          </div>
        </div>
        <div class="row d-flex justify-content-center">
          <div class="col-md-6 col-xl-4">
            <div class="card mb-5">
              <div class="card-body d-flex flex-column align-items-center">
                <div class="bs-icon-xl bs-icon-circle bs-icon-primary bs-icon my-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor"
                       viewBox="0 0 16 16" class="bi bi-clock">
                    <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"></path>
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"></path>
                  </svg>
                </div>
                <form class="text-center" method="post">
                  <div class="mb-3"><input v-model="email" class="form-control" type="text" name="email"
                                           placeholder="Email"></div>
                  <div class="mb-3"><input v-model="password" class="form-control" type="password" name="password"
                                           placeholder="Password"></div>
                  <div class="mb-3">
                    <button @click.prevent="login" class="btn btn-primary d-block w-100" type="submit">Войти</button>
                  </div>
                  <p class="text-muted"></p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  data: () => ({
    email: '',
    password: ''
  }),
  methods: {
    async login() {
      await this.$store.dispatch('user/login', {
        login: this.email,
        password: this.password
      })
      await this.$store.dispatch('user/getMe')
      await this.$router.push({name: 'task-list'})
    }
  }
}
</script>

<style scoped>

</style>