<template>
  <h1>
    This is an error page
  </h1>
</template>

<script>
export default {
  name: 'Error'
}
</script>

<style scoped>
</style>
async mounted () {
    console.log("2222")
    this.$store.dispatch('setLoading', true)
    const result = await PostService.getAllUser()
    if (result) {
      this.$store.dispatch('setLoading', false)
      this.users = result