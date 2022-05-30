<template>
  <div class="mx-auto container mt-10">
    <layout-header
      title="Currency Converter"
      msg="Pick a base currency and a currency to convert to"
    />

    <layout-pannel>
      <div class="flex justify-around">
        <div>
          <form-label name="base" label="Base Currency" />
          <form-select
            :default-value="inputs.base_currency"
            :currencies="currencies"
            @change="(value) => (inputs.base_currency = value)"
          />
        </div>
        <div>
          <form-label name="convert" label="Currency to Convert" />
          <form-select
            :currencies="currencies"
            @change="(value) => (inputs.convert_currency = value)"
            :disabled="inputs.base_currency ? false : true"
          />
        </div>
      </div>

      <div class="mt-10 flex ml-10">
        <form-input
          type="number"
          @input="(value) => (inputs.base_currency = value)"
        />
        <button
          @click="convert"
          class="mx-5"
          :disabled="
            inputs.base_currency && inputs.convert_currency ? false : true
          "
        >
          Convert
        </button>
      </div>
    </layout-pannel>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { onMounted, reactive, ref, watch } from "@vue/runtime-core";
import { useCurrencyStore } from "@/stores/currency";

import FormSelect from "@/components/inputs/FormSelect.vue";
import FormLabel from "@/components/inputs/FormLabel.vue";
import LayoutPannel from "@/components/layouts/LayoutPannel.vue";
import LayoutHeader from "@/components/layouts/LayoutHeader.vue";
import FormInput from "@/components/inputs/FormInput.vue";

import type Currency from "@/types/currency";
import type Input from "@/types/input";

const selectedCode = ref<string>("gbp");
const currencies = ref<Currency[]>([]);
const seelctedCurrencies = ref<Currency[]>([]);

const inputs = reactive<Input>({
  base_currency: "",
  convert_currency: "",
  base_value: 0,
  convert_value: 0,
});

onMounted(() => {
  getCurrency();
});

watch(
  () => inputs.base_currency,
  (watched) => {
    console.log(inputs.base_currency);
    if (inputs.base_currency !== "") {
      selectedCode.value = inputs.base_currency;
      getCurrency();
    }
  }
);

const convert = () => {
  const convert_rate: Currency[] = currencies.value.filter(
    (currency) => inputs.convert_currency == currency.code
  );
};

const getCurrency = async () => {
  try {
    const res = await axios.get(
      `http://www.floatrates.com/daily/${selectedCode.value}.json`
    );

    currencies.value = [];

    for (const currency in res.data) {
      const currencyCodes: Currency = {
        ...res.data[currency],
      };

      currencies.value.push(currencyCodes);
    }
  } catch (error) {
    console.log(error);
  }
};
</script>

<style>
.mt-10 {
  margin-top: 2rem;
}

.mt-5 {
  margin-top: 1rem;
}

.justify-around {
  justify-content: space-around;
}

.ml-10 {
  margin-left: 4.6rem;
}

.flex {
  display: flex;
}

.p-5 {
  padding: 0.4rem;
}

.mx-5 {
  margin-left: 0.4rem;
  margin-right: 0.4rem;
}

.container {
  max-width: 1200px;
}

.mx-auto {
  margin-right: auto;
  margin-left: auto;
}
</style>
