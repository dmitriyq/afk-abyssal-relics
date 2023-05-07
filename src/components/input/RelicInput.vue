<template>
  <div class="relic-wrapper shadow-2">
    <div @click.prevent="() => relicCountInputRef?.getNativeElement().focus({ preventScroll: true })">
      <q-img :src="relicImg(relic.id)" ratio="1" height="50px" width="50px">
        <q-tooltip>{{ relic.name }}</q-tooltip>
      </q-img>
    </div>
    <q-input v-if="editing" ref="relicCountInputRef"
      v-input--mask="{ type: 'integer', allowNegative: false, maxSignificantDigits: 2 }" type="number" rounded outlined
      dense :model-value="modelValue" @update:model-value="updateModelValue" hide-bottom-space />
    <div class="text-center" v-else>{{ modelValue?.toLocaleString() }}</div>
    <div v-if="canSell" class="q-mt-sm">
      <div class="flex q-px-sm"><q-img src="../../assets/essence.png" ratio="1" height="30px" width="30px" />
        <span class="self-center q-pl-sm">{{
          sellPrice.toLocaleString() }}
        </span>
      </div>
      <q-btn label="Продать" no-caps dense outline color="primary" style="width: 100%;"
        @click="$emit('sell', sellPrice)" />
    </div>
  </div>
</template>
<script lang="ts">
import { QInput } from 'quasar';
import { RelicId, getRelicById, getRelicImage, relicFullPrice } from 'src/models/relic';
import { PropType, computed, defineComponent, ref } from 'vue';

export default defineComponent({
  props: {
    relicId: { type: Number as PropType<RelicId>, required: true },
    modelValue: { type: Number as PropType<number | null>, required: false, default: null },
    editing: { type: Boolean, required: false, default: false },
    canSell: { type: Boolean, required: false, default: false },
  },
  emits: {
    'update:modelValue': (_val: number | null) => true,
    'sell': (_val: number) => true,
  },
  setup(props, { emit }) {
    const relicCountInputRef = ref<QInput>();
    const relic = computed(() => getRelicById(props.relicId));
    const updateModelValue = (val: number | string | null) => {
      const newVal = val === null ? 0 : typeof val === 'string' ? parseInt(val, 10) : val;
      if (newVal > 100) return;
      emit('update:modelValue', newVal);
    };
    const sellPrice = computed(() => Math.round(relicFullPrice(relic.value.id) / 2.5));
    return {
      relicCountInputRef,
      relic,
      updateModelValue,
      relicImg: getRelicImage,
      sellPrice
    };
  }
});
</script>
<style lang="scss" scoped>
.relic-wrapper {
  :deep() {
    .q-img {
      display: flex;
      margin: 0 auto;
    }

    .q-field {
      margin-top: 0px;
      margin-left: 0px;
      line-height: 20px;
      padding: 4px;

      .q-field__control {
        height: 20px;
        width: 45px;

        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          display: none;
        }

        input[type="number"] {
          appearance: textfield;
          -moz-appearance: textfield;
        }

        input[type="number"]:hover,
        input[type="number"]:focus {
          appearance: number-input;
          -moz-appearance: number-input;
        }

        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        input[type=number] {
          appearance: textfield;
          -moz-appearance: textfield;
        }
      }
    }
  }
}
</style>
