<template>
  <input @input="update" v-model="value" />
</template>

<script setup lang="ts">
import { ref } from "@vue/reactivity";

defineProps({
  defualtValue: {
    type: Number,
    required: false,
  },
});

const emits = defineEmits(["input"]);
const value = ref<number>();

const update = () => {
  emits("input", value.value);
};
</script>

<style scoped>
input {
  width: 190px;
  padding: 0.21rem;
}
</style>
