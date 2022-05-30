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
            :default-name="inputs.base_currency_name"
            :default-code="inputs.base_currnecy_code"
            :currencies="currencies"
            @change="
              ({ name, code }) => (
                (inputs.base_currency_name = name),
                (inputs.base_currnecy_code = code)
              )
            "
          />
        </div>
        <div>
          <form-label name="convert" label="Currency to Convert" />
          <form-select
            :currencies="currencies"
            @change="
              ({ name, code }) => (
                (inputs.convert_currency_name = name),
                (inputs.convert_currency_code = code)
              )
            "
            :disabled="inputs.base_currency_name ? false : true"
          />
        </div>
      </div>

      <div class="mt-10 flex ml-10">
        <form-input
          type="number"
          @input="(value) => (inputs.base_value = value)"
        />
        <button
          @click="convert"
          class="mx-5"
          :disabled="
            inputs.base_currency_name && inputs.convert_currency_name
              ? false
              : true
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
import { calculate } from "@/types/calculate";

const selectedCode = ref<string>("gbp");
const currencies = ref<Currency[]>([]);

const inputs = reactive<Input>({
  base_currency_name: "",
  base_currnecy_code: "",
  convert_currency_name: "",
  convert_currency_code: "",
  base_value: 0,
  convert_value: 0,
});

onMounted(() => {
  getCurrency();
});

watch(
  () => inputs.base_currency_name,
  (watched) => {
    if (inputs.base_currency_name !== "") {
      selectedCode.value = inputs.base_currnecy_code;
      getCurrency();
    }
  }
);

const convert = () => {
  const convert_rate: Currency[] = currencies.value.filter((currency) => {
    return currency.code == inputs.convert_currency_code;
  });

  const calcualted: number = calculate(inputs.base_value, convert_rate[0].rate);
  console.log(calcualted);
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
