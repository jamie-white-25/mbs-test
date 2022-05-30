<template>
  <div class="bg-gray max-w-lg mx-auto p-5">
    <slot></slot>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.max-w-lg {
  max-width: 700px;
}

.p-5 {
  padding: 2rem;
}

.bg-gray {
  background-color: rgb(243 244 246);
}
</style>
