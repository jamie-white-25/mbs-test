<template>
  <label :for="name">{{ label }}</label>
</template>

<script setup lang="ts">
defineProps({
  name: { type: String, default: () => "String" },
  label: {
    type: String,
    required: true,
    defult: () => "Label",
  },
});
</script>

<style scoped>
label {
  display: block;
  font-size: 1rem;
  font-weight: 400;
  padding-bottom: 0.3rem;
  color: black;
}
</style>
