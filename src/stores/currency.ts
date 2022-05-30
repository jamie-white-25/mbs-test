import { defineStore } from "pinia";
import type History from "@/types/history";

export const useCurrencyStore = defineStore({
  id: "currency",
  state: () => ({
    history: [] as History[],
  }),
  getters: {
    doubleCount: (state) => state,
  },
  actions: {
    add(val: History) {
      this.history.push(val);
    },
  },
});
