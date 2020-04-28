<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div>{{ data }} </div>
  </div>
</template>
<script>
const axios = require('axios')

export default {
  name: 'about',
  data() {
    return {
      data: null,
      config: {
        method: 'GET',
        url: 'https://nei.netease.com/api/apimock-v2/7e2f45db8efa6c1079b11bd786cfe10b/init',
        data: null,
        params: null,
        baseURL: '/',
        withCredentials: false,
        responseType: 'json',
      },
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      axios(this.config).then((res) => {
        this.data = res
      })
    },
  },
}
</script>
