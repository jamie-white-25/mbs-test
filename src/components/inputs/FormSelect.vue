<template>
  <select @change="onChange" name="base_currency" class="bg">
    <option
      v-for="currnecy in currencies?.filter(
        (currency) => currency.code == defaultValue
      )"
      :key="currnecy.name"
      :value="currnecy.code"
    >
      {{ currnecy.name }}
    </option>

    <option
      v-for="currnecy in currencies?.filter(
        (currency) => currency.code != defaultValue
      )"
      :key="currnecy.name"
      :value="currnecy.code"
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
  defaultValue: {
    type: String,
    default: () => "",
  },
});

const emit = defineEmits(["change"]);

const onChange = (e: { target: { value: string } }) => {
  emit("change", e.target.value);
};
</script>

<style scoped>
select {
  width: 200px;
  padding: 0.21rem;
}
</style>
