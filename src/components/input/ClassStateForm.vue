<template>
  <div class="col-12 text-center text-h6">{{ title }}</div>
  <template v-if="$q.screen.gt.xs">
    <class-node v-for="c in orderedClasses" :key="c" class="col-auto" :type="c" :model-value="modelValue"
      :editing="editing" :min-state="minState" @update:model-value="$emit('update:modelValue', $event)" />
  </template>
  <template v-else>
    <div class="col-12">
      <q-tab-panels v-model="activeTab" animated style="background: transparent;">
        <q-tab-panel v-for="c in orderedClasses" :key="c" :name="c">
          <class-node :type="c" :model-value="modelValue" :editing="editing" :min-state="minState"
            @update:model-value="$emit('update:modelValue', $event)" />
        </q-tab-panel>
      </q-tab-panels>
      <q-tabs v-model="activeTab" align="justify">
        <q-tab v-for="c in orderedClasses" :key="c" :name="c" :icon="`img:${classImg(c)}`" :label="className(c)"
          no-caps />
      </q-tabs>
    </div>
  </template>
</template>
<script lang="ts">
import { PropType, defineComponent, ref } from 'vue';
import ClassNode from '../ClassNode.vue';
import { Classes, NormalizedClassState, getClassImage, getClassName } from 'src/models/classes';
import { Player } from 'src/models/player';

export default defineComponent({
  components: { ClassNode },
  props: {
    modelValue: { type: Object as PropType<NormalizedClassState>, required: true },
    title: { type: String, required: false, default: 'Ветки классов' },
    editing: { type: Boolean, required: false, default: false },
    minState: { type: Object as PropType<Player>, required: false },
  },
  emits: {
    'update:modelValue': (_val: NormalizedClassState) => true,
  },
  setup() {
    const orderedClasses: Classes[] = ['war', 'tank', 'ranger', 'mage', 'supp'];
    const activeTab = ref<Classes>('war');
    return {
      orderedClasses,
      activeTab,
      classImg: getClassImage,
      className: getClassName
    };
  },
});
</script>
