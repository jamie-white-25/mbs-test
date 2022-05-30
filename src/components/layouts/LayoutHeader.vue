<template>
  <h1>{{ title }}</h1>
  <h2>{{ msg }}</h2>
</template>

<script setup lang="ts">
defineProps({
  title: String,
  msg: String,
});
</script>

<style scoped>
h1,
h2 {
  text-align: center;
}

h2 {
  color: rgb(55 65 81);
}
</style>
