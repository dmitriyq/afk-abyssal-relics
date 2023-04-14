<template>
  <q-card class="text-center background-dark">
    <q-card-section class="text-h6">{{ className(type) }}</q-card-section>
    <q-card-section class="class-node" :class="{ 'minimized': !editing }">
      <div class="top-relics">
        <class-node-relic class="first-relic" :relic="relicId(1)" :active="isActiveRelic(1)" :allow-add="allowAdd(1)"
          :buy-price="buyPrice(1)" @relic-click="onRelicClick($event, 1)" />
        <class-node-relic class="sixth-relic" :relic="relicId(6)" :active="isActiveRelic(6)" :allow-add="allowAdd(6)"
          :buy-price="buyPrice(6)" @relic-click="onRelicClick($event, 6)" />
      </div>
      <div class="bottom-relics">
        <class-node-relic class="third-relic" :relic="relicId(3)" :active="isActiveRelic(3)" :allow-add="allowAdd(3)"
          :buy-price="buyPrice(3)" @relic-click="onRelicClick($event, 3)" />
        <class-node-relic class="fourth-relic" :relic="relicId(4)" :active="isActiveRelic(4)" :allow-add="allowAdd(4)"
          :buy-price="buyPrice(4)" @relic-click="onRelicClick($event, 4)" />
      </div>
      <div class="class-type">
        <div @click="classLevelSelect?.showPopup"><q-img :src="classImg(type)" ratio="1" height="70px" width="70px" />
        </div>
        <q-select v-if="editing" ref="classLevelSelect" dense prefix="Ур. " class="node--level"
          :model-value="modelValue[type].level" :options="levelOptions" @update:model-value="onLevelChange" outlined
          rounded hide-bottom-space />
        <div v-else>Ур. {{ modelValue[type].level }}</div>
      </div>
      <class-node-relic class="second-relic" :relic="relicId(2)" :active="isActiveRelic(2)" :allow-add="allowAdd(2)"
        :buy-price="buyPrice(2)" @relic-click="onRelicClick($event, 2)" />
      <class-node-relic class="fifth-relic" :relic="relicId(5)" :active="isActiveRelic(5)" :allow-add="allowAdd(5)"
        :buy-price="buyPrice(5)" @relic-click="onRelicClick($event, 5)">
      </class-node-relic>
    </q-card-section>
  </q-card>
</template>
<script lang="ts">
import { ClassLevels, classLevelRelics, getClassName, normalizeClassesState } from 'src/models/classes';
import { NormalizedClassState } from 'src/models/classes';
import { Classes, getClassImage } from 'src/models/classes';
import { PropType, computed, defineComponent, ref } from 'vue';
import ClassNodeRelic from './ClassNodeRelic.vue';
import { RelicId, relicPrice } from 'src/models/relic';
import { cloneDeep } from 'lodash-es';
import { QSelect } from 'quasar';
import { Player } from 'src/models/player';

export default defineComponent({
  components: { ClassNodeRelic },
  props: {
    type: { type: String as PropType<Classes>, required: true },
    modelValue: { type: Object as PropType<NormalizedClassState>, required: true },
    minState: { type: Object as PropType<Player>, required: false },
    editing: { type: Boolean, required: false, default: false },
  },
  emits: {
    'update:modelValue': (_val: NormalizedClassState) => true
  },
  setup(props, { emit }) {
    const classLevelSelect = ref<QSelect>();
    const currentClassRelics = computed(() => props.modelValue[props.type]);

    const relicId = (index: number) => classLevelRelics[props.type][props.modelValue[props.type].level][index - 1];
    const isActiveRelic = (index: number) => currentClassRelics.value.owned[index - 1] !== null;
    const onRelicClick = (val: RelicId | null, index: number) => {
      const newVal = cloneDeep(props.modelValue);
      newVal[props.type].owned[index - 1] = val;
      const normalized = normalizeClassesState(newVal);
      emit('update:modelValue', normalized);
    };
    const onLevelChange = (level: ClassLevels) => {
      if (level !== props.modelValue[props.type].level) {
        const newVal = cloneDeep(props.modelValue);
        newVal[props.type].level = level;
        if (props.minState) {
          newVal[props.type].owned = props.minState.classes[props.type].owned.slice();
        } else {
          newVal[props.type].owned = [];
        }
        const normalized = normalizeClassesState(newVal);
        emit('update:modelValue', normalized);
      }
    };

    const levelOptions = computed(() => {
      const options = [1, 2, 3, 4, 5];
      if (props.minState) {
        return options.filter(v => v >= props.minState!.classes[props.type].level);
      }
      return options;
    });
    const allowAdd = (index: number) => {
      if (!props.editing) return false;
      if (!props.minState) return true;
      if (props.minState.classes[props.type].owned.includes(relicId(index))) return false;
      return true;
      //check is editing and min state
    };
    const buyPrice = (index: number) => {
      if (props.minState && props.minState.bag) {
        return relicPrice(relicId(index), props.minState!.bag.relics).price;
      }
      return undefined;
    };
    return {
      classImg: getClassImage,
      className: getClassName,
      classLevelSelect,
      relicId,
      isActiveRelic,
      onRelicClick,
      onLevelChange,
      levelOptions,
      allowAdd,
      buyPrice
    };
  },
});
</script>
<style lang="scss">
.class-node {
  justify-content: center;
  align-content: center;
  justify-items: center;
  align-items: center;

  display: grid;
  grid-template-columns: 1fr max-content 1fr;
  grid-template-rows: 40px 100px 80px;
  grid-auto-columns: 1fr;
  grid-auto-rows: 1fr;
  gap: 16px 16px;
  grid-auto-flow: row;
  grid-template-areas:
    "top-relics top-relics top-relics"
    "fifth-relic class-type second-relic"
    "bottom-relics bottom-relics bottom-relics";


  .node--level {
    position: absolute;
    // margin-top: -10px;
    margin-left: -10px;
    font-weight: 500;
    font-size: 1.3em;

  }

  &.minimized {
    grid-template-columns: 1fr max-content 1fr;
    grid-template-rows: 30px 70px 30px;
  }
}

.top-relics {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas:
    "sixth-relic first-relic";
  justify-self: stretch;
  align-self: stretch;
  grid-area: top-relics;

  justify-content: center;
  align-content: center;
  justify-items: center;
  align-items: center;
}

.bottom-relics {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas:
    "fourth-relic third-relic";
  grid-area: bottom-relics;

  justify-self: stretch;
  align-self: stretch;
  justify-content: center;
  align-content: center;
  justify-items: center;
  align-items: center;
}

.first-relic {
  grid-area: first-relic;
  position: relative;
}

.sixth-relic {
  grid-area: sixth-relic;
  position: relative;
}

.third-relic {
  grid-area: third-relic;
  position: relative;
}

.fourth-relic {
  grid-area: fourth-relic;
  position: relative;
}

.class-type {
  grid-area: class-type;
}

.second-relic {
  grid-area: second-relic;
  position: relative;
}

.fifth-relic {
  grid-area: fifth-relic;
  position: relative;
}
</style>
