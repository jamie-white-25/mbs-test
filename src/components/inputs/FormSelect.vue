<template>
  <select class="bg">
    <option title="select" @click="onChange(defaultName, defaultCode)">
      {{ defaultName }}
    </option>

    <option
      v-for="currnecy in currencies?.filter(
        (currency) => currency.code != defaultCode
      )"
      :key="currnecy.name"
      @click="onChange(currnecy.name, currnecy.code)"
    >
      {{ currnecy.name }}
    </option>
  </select>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import type Currency from "@/types/currency";

defineProps({
  currencies: {
    type: Array as PropType<Currency[]>,
  },
  defaultName: {
    type: String,
    default: () => "",
  },
  defaultCode: {
    type: String,
    default: () => "",
  },
});

const emit = defineEmits(["change"]);

const onChange = (name: string, code: string) => {
  emit("change", { name, code });
};
</script>

<style scoped>
select {
  width: 200px;
  padding: 0.21rem;
}
</style>
