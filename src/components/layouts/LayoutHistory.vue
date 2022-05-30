<template>
  <div class="mt-10">
    <layout-pannel v-if="store.history">
      <div class="flex justify-between">
        <table class="mx-auto">
          <tr>
            <th>Base Name</th>
            <th>Base Rate</th>
            <th>Base Code</th>
            <th>Convert name</th>
            <th>Convert Code</th>
            <th>Convert Rate</th>
          </tr>
          <tr v-for="history in store.history" :key="history.base_code">
            <td>{{ history.base_name }}</td>
            <td>{{ history.base_rate }}</td>
            <td>{{ history.base_code }}</td>
            <td>{{ history.convert_name }}</td>
            <td>{{ history.convert_code }}</td>
            <td>{{ history.convert_rate }}</td>
          </tr>
        </table>
      </div>
    </layout-pannel>
  </div>
</template>

<script setup lang="ts">
import { useCurrencyStore } from "@/stores/currency";
import LayoutPannel from "./LayoutPannel.vue";

const store = useCurrencyStore();
</script>

<style scoped>
td {
  padding: 0.5rem 1.2rem;
}
</style>
