<template>
  <div class="row q-gutter-md" :class="editing ? 'flex-center' : 'align-start'">
    <essence-input v-if="editing" class="col-auto self-center" :class="{ 'text-center': !editing, 'q-pb-md': editing }"
      :model-value="modelValue.essence" @update:model-value="updateEssence" :readonly="!editing" />
    <div class="self-center q-pl-md" v-else>
      <span v-if="resultView" class="text-h6 q-mx-md">{{ modelValue.essence < 0 ? 'Нехватает:' : 'Остаток:' }}</span>
          <q-img src="../assets/essence.png" ratio="1" height="30px" width="30px" />
          {{ Math.abs(modelValue.essence).toLocaleString() }}
    </div>
    <template v-if="!editing">
      <span v-if="resultView" class="text-h6 q-mx-md self-center">Сумка: {{ orderedRelics.length === 0 ? '-' : ''
      }}</span>
      <relic-input v-for="rel in orderedRelics" :key="rel.id" :model-value="getRelicCount(rel.id)" :editing="editing"
        :can-sell="resultView" :relic-id="rel.id" class="col-auto" @update:model-value="updateRelicCount(rel.id, $event)"
        @sell="onSell(rel.id, $event)" />
    </template>
  </div>
  <template v-if="editing && $q.screen.gt.xs">
    <div class="row flex-center q-gutter-md" v-for="grade in Object.keys(grouppedRelics)" :key="grade">
      <div class="col-12 text-center">
        {{ gradeName(grade) }}
      </div>
      <relic-input v-for="rel in grouppedRelics[grade]" :key="rel.id" :model-value="getRelicCount(rel.id)"
        :editing="editing" @update:model-value="updateRelicCount(rel.id, $event)" :relic-id="rel.id" class="col-auto" />
    </div>
  </template>
  <template v-else-if="editing">
    <q-tab-panels v-model="activeGrade" animated style="background: transparent;">
      <q-tab-panel v-for="g in Object.keys(grouppedRelics)" :key="g" :name="g">
        <div class="row flex-center q-gutter-md">
          <relic-input v-for="rel in grouppedRelics[g]" :key="rel.id" :model-value="getRelicCount(rel.id)"
            :editing="editing" @update:model-value="updateRelicCount(rel.id, $event)" :relic-id="rel.id"
            class="col-auto" />
        </div>
      </q-tab-panel>
    </q-tab-panels>
    <q-tabs v-model="activeGrade" align="justify">
      <q-tab v-for="g in Object.keys(grouppedRelics)" :key="g" :name="g" :label="gradeName(g)" class="relic__grade--tab"
        :style="`color: ${gradeColor(g)};`" icon="radio_button_checked" no-caps />
    </q-tabs>

  </template>
</template>
<script lang="ts">
import { PropType, computed, defineComponent, ref } from 'vue';
import { RelicId, relics } from 'src/models/relic';
import { Bag } from 'src/models/bag';
import { RelicGrade, getGradeName, getGradeColor, getRelicGradeOrder } from 'src/models/grade';
import { groupBy } from 'lodash';
import RelicInput from './input/RelicInput.vue';
import EssenceInput from './input/EssenceInput.vue';

export default defineComponent({
  components: { RelicInput, EssenceInput },
  props: {
    modelValue: { type: Object as PropType<Bag>, required: true },
    editing: { type: Boolean, required: false, default: false },
    resultView: { type: Boolean, required: false, default: false },
  },
  emits: {
    'update:modelValue': (_val: Bag) => true
  },
  setup(props, { emit }) {
    const orderedRelics = computed(() => relics.filter(v => {
      if (props.editing) return true;
      return props.modelValue.relics.includes(v.id);
    }).sort((a, b) => {
      const aGradeOrder = getRelicGradeOrder(a.grade);
      const bGradeOrder = getRelicGradeOrder(b.grade);
      return aGradeOrder - bGradeOrder;
    }));
    const grouppedRelics = computed(() => groupBy(orderedRelics.value, x => x.grade));
    const getRelicCount = (id: RelicId) => {
      const count = props.modelValue.relics.filter(v => v === id).length;
      return count;
    };
    const updateRelicCount = (id: RelicId, newCount: number | null) => {
      const count = newCount === null ? 0 : newCount;
      const relics = props.modelValue.relics.filter(v => v !== id);
      if (count > 0) {
        const relicsToAdd = new Array<RelicId>(count).fill(id);
        relics.push(...relicsToAdd);
      }
      emit('update:modelValue', { essence: props.modelValue.essence, relics: relics });
    };
    const updateEssence = (newValue: number | null) => {
      const value = newValue === null ? 0 : newValue;
      emit('update:modelValue', { essence: value, relics: props.modelValue.relics });
    };
    const onSell = (relicId: RelicId, value: number) => {
      const relicIndex = props.modelValue.relics.findIndex(v => v === relicId);
      const newRelics = props.modelValue.relics.slice();
      newRelics.splice(relicIndex, 1);
      emit('update:modelValue', { essence: props.modelValue.essence + value, relics: newRelics });
    };
    const activeGrade = ref<RelicGrade>('common');
    return {
      orderedRelics,
      gradeName: (val: string) => getGradeName(val as RelicGrade),
      gradeColor: (val: string) => getGradeColor(val as RelicGrade),
      activeGrade,
      grouppedRelics,
      getRelicCount,
      updateRelicCount,
      updateEssence,
      onSell
    };
  },
});
</script>
<style lang="scss" scoped>
:deep() {
  .relic__grade--tab {
    .q-tab__label {
      color: black;
    }
  }

}
</style>
