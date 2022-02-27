<script>
export default {
  name: "SelectBox",
  props: ["options", "title", "modelValue"],
  emits: ["update:modelValue"],
};
</script>

<template>
  <select @change="$emit('update:modelValue', $event.target.value)">
    <option disabled selected hidden>{{ title }}</option>
    <option v-for="option in options" :key="option.id" :value="option.name">
      {{ option.name }}
    </option>
  </select>
</template>

<style lang="scss" scoped>
option {
  font-size: 16px;
  background-color: $body-color;
}
</style>
