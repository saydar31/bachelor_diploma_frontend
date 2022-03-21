<template>
  <common-header/>
  <router-view/>
  <common-footer/>
</template>

<script>
import CommonHeader from "@/components/CommonHeader";
import CommonFooter from "@/components/CommonFooter";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

export default {
  name: 'App',

  components: {
    CommonHeader, CommonFooter
  },

  data: () => ({
    //
  }),
}
</script>
