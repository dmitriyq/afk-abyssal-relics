<template>
  <div @click="allowAdd ? $emit('relicClick', active ? null : relic) : undefined">
    <q-img :class="{ 'non-active-relic': !active, 'active-relic': active }" :src="relicImage" ratio="1" height="50px"
      style="z-index: 10;" width="50px">
      <q-tooltip v-if="allowAdd">{{ active ? 'Удалить' : 'Добавить' }}</q-tooltip>
    </q-img>
    <div v-show="allowAdd && !active">
      <q-img style="position: absolute; right: -15px; bottom: 0px;opacity: 0.9;" :src="plusSign" ratio="1" height="20px"
        width="20px">
      </q-img>
    </div>
    <div v-show="allowAdd && active">
      <q-img style="position: absolute; right: -15px; bottom: 0px;opacity: 0.9;" :src="minusSign" ratio="1" height="20px"
        width="20px">
      </q-img>
    </div>
    <div v-if="buyPrice !== undefined">
      <div style="position: absolute; top: 45px; left: -15px; z-index: 0; overflow: hidden;" class="flex q-px-sm">
        <span class="self-center q-pl-sm">{{
          buyPrice.toLocaleString() }}
        </span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { RelicId, getRelicImage } from 'src/models/relic';
import { PropType, computed, defineComponent } from 'vue';
import plusSign from '../assets/plus.png';
import minusSign from '../assets/minus.png';

export default defineComponent({
  props: {
    relic: { type: Number as PropType<RelicId>, required: true },
    active: { type: Boolean, default: true },
    allowAdd: { type: Boolean, default: false },
    buyPrice: { type: Number, default: undefined },
  },
  emits: {
    'relicClick': (_val: RelicId | null) => true
  },
  setup(props) {
    const relicImage = computed(() => getRelicImage(props.relic));
    return {
      relicImage,
      plusSign,
      minusSign
    };
  }
});
</script>
<style lang="scss">
.non-active-relic {
  filter: grayscale(1);
  transition: 0.3s;
}

.active-relic {
  filter: grayscale(0);
  transition: 0.3s;
}
</style>
