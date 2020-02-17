<template>
  <div class="box">
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'BaseSurface'
}

</script>

<style scoped>
  .box {
    background-color: white;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
</style>>
