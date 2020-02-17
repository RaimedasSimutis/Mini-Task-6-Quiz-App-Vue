<template>
  <button
    :class="classList"
    @click="onClick"
  >
    <slot v-if="!disabled" />
    <span v-else>Loading...</span>
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    outlined: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classList () {
      if (this.outlined) {
        return 'button is-outlined'
      } else {
        return 'button is-success is-inverted'
      }
    }
  },
  methods: {
    onClick (event) {
      if (!this.disabled) {
        this.$emit('click', event)
      }
    }
  }
}
</script>

<style scoped>

  button {
    width: 100%;
    margin-top: 3px;
  }

  .is-inverted {
    font-weight: 800;
  }
</style>
