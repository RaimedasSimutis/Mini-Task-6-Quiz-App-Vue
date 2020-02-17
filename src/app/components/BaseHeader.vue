<template>
  <h6 class="title is-6">
    <slot/>
  </h6>
</template>

<script>
export default {
  name: 'BaseHeader'
}
</script>

<style scoped>
  h6 {
    text-align: center;
  }
</style>
