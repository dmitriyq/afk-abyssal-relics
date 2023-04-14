<template>
  <div class="essence-input">
    <q-input ref="essenceInputRef" :model-value="modelValue" @update:model-value="updateEssence" outlined rounded dense
      v-input--mask="{ type: 'integer', allowNegative: false, maxSignificantDigits: 8 }">
      <template #before>
        <div @click="essenceInputRef?.focus">
          <span class="text-subtitle1 text-weight-medium">Эссенция</span>
          <q-img src="../../assets/essence.png" ratio="1" height="30px" width="30px" />
        </div>
      </template>
    </q-input>
  </div>
</template>
<script lang="ts">
import { QInput } from 'quasar';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  props: {
    modelValue: { type: Number, required: true },
  },
  emits: {
    'update:modelValue': (_val: number) => true
  },
  setup(props, { emit }) {
    const essenceInputRef = ref<QInput>();
    const updateEssence = (newValue: number | string | null) => {
      const value = newValue === null ? 0 : typeof newValue === 'string' ? parseInt(newValue.replace(/[\D]/ig, ''), 10) : newValue;
      emit('update:modelValue', value);
    };
    return {
      essenceInputRef,
      updateEssence
    };
  }
});
</script>
<style lang="scss" scoped>
.essence-input {
  :deep() {
    .q-field__control {
      width: 100px;
    }
  }
}
</style>
