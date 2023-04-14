<template>
  <q-card style="background-color: transparent;">
    <q-card-actions align="right" v-if="!editing && !readonly">
      <q-btn v-if="!editing" label="Изменить" size="16px" no-caps color="positive"
        @click="$emit('update:editing', true)" />
      <template v-else>
        <q-btn label="Сбросить" no-caps color="negative" @click="resetPlayer" />
        <q-btn label="Сохранить" no-caps color="positive" @click="$emit('update:editing', false)" />
      </template>
    </q-card-actions>
    <q-card-section>
      <div class="row justify-center align-center q-gutter-md">
        <class-state-form :model-value="modelValue.classes" @update:model-value="onClassUpdate" :editing="editing"
          :title="title ?? (editing ? 'Укажите текущее состояние' : 'Текущее состояние')" />
        <div v-if="editing" class="col-12 text-center text-h6">Сумка</div>
        <div class="col-12">
          <bag-panel :model-value="modelValue.bag" @update:model-value="onBagUpdate" :editing="editing" />
        </div>
      </div>
    </q-card-section>
    <q-card-actions align="right" v-if="editing && !readonly">
      <q-btn label="Сбросить" no-caps color="negative" @click="resetPlayer" />
      <q-btn label="Сохранить" no-caps color="positive" @click="$emit('update:editing', false)" />
    </q-card-actions>
  </q-card>
</template>
<script lang="ts">
import { NormalizedClassState, normalizeClassesState } from 'src/models/classes';
import { Player } from 'src/models/player';
import { PropType, defineComponent } from 'vue';
import BagPanel from '../BagPanel.vue';
import { Bag } from 'src/models/bag';
import ClassStateForm from './ClassStateForm.vue';

export default defineComponent({
  components: { BagPanel, ClassStateForm },
  props: {
    modelValue: { type: Object as PropType<Player>, required: true },
    editing: { type: Boolean, required: false, default: false },
    title: { type: String },
    readonly: { type: Boolean, default: false },
  },
  emits: {
    'update:modelValue': (_player: Player) => true,
    'update:editing': (_val: boolean) => true
  },
  setup(props, { emit }) {
    const onClassUpdate = (classState: NormalizedClassState) => {
      emit('update:modelValue', { bag: props.modelValue.bag, classes: classState });
    };
    const onBagUpdate = (bag: Bag) => {
      emit('update:modelValue', { bag, classes: props.modelValue.classes });
    }
    const resetPlayer = () => {
      emit('update:modelValue', {
        bag: { essence: 0, relics: [] },
        classes: normalizeClassesState({
          mage: { level: 1, owned: [] },
          ranger: { level: 1, owned: [] },
          supp: { level: 1, owned: [] },
          tank: { level: 1, owned: [] },
          war: { level: 1, owned: [] }
        })
      })
    };
    return {
      onClassUpdate,
      resetPlayer,
      onBagUpdate,
    };
  },
});
</script>
