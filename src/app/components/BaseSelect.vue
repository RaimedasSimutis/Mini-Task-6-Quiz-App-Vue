<template>
  <div class="select is-success">
    <select v-model="selected" @click="selectClick">
      <option value="" disabled selected hidden>Choose questions category</option>
      <option v-for="option in options" :key="option.id" :value="option.id" :disabled="disabled">
        {{ option.name }}
        <!-- {{ option.id }} -->
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'BaseSelect',
  data () {
    return {
      selected: ''
    }
  },
  props: {
    options: {
      type: Array
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    selectClick () {
      if (this.selected) {
        this.$emit('select-click', this.selected)
      }
    }
  }
}
</script>

<style scoped>
.select {
  margin: 5px 0;
}

select {
  width: 100%;
  text-align-last: center;
}

.option {
  width: 100%;
}
</style>
