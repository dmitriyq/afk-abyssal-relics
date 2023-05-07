<template>
  <q-page class="background-light">
    <div class="wrapper q-pb-md">
      <div class="text-center text-h5 q-py-md" id="#home">Расчет стоимости апгрейда</div>
      <player-state-form v-model="player" v-model:editing="playerEditing" />
      <div id="#target"></div>
      <q-card style="background-color: transparent;" class="q-mt-md" v-show="!playerEditing">
        <q-card-section>
          <div class="row justify-center align-center q-gutter-md">
            <class-state-form v-model="targetClasses" :editing="true" :min-state="resultPlayer!"
              title="Желаемое состояние" />
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Сбросить до текущего" no-caps color="negative" @click="resetResult" />
        </q-card-actions>
      </q-card>
      <q-card style="background-color: transparent;" class="q-mt-md" v-if="!playerEditing && resultPlayer" id="#result">
        <div class="col-12 text-center text-h5">Результат</div>
        <bag-panel v-model="resultPlayer.bag" :editing="false" result-view />
        <div style="height: 16px;"></div>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { cloneDeep } from 'lodash-es';
import BagPanel from 'src/components/BagPanel.vue';
import ClassStateForm from 'src/components/input/ClassStateForm.vue';
import PlayerStateForm from 'src/components/input/PlayerStateForm.vue';
import { NormalizedClassState, deserializeClassState, normalizeClassesState, serializeClassState } from 'src/models/classes';
import { Player, deserializePlayer, serializePlayer } from 'src/models/player';
import { tryUpdateClasses } from 'src/services/simulator-service';
import { defineComponent, ref, watch } from 'vue';
import { LocationQueryValue, useRoute, useRouter } from 'vue-router';

const initClassState = (query?: string | null): NormalizedClassState => {
  if (query) return deserializeClassState(query);
  return normalizeClassesState({
    mage: { level: 1, owned: [] },
    ranger: { level: 1, owned: [] },
    supp: { level: 1, owned: [] },
    tank: { level: 1, owned: [] },
    war: { level: 1, owned: [] }
  });
};

const initPlayer = (query?: string | null): Player => {
  let player: Player = {
    bag: {
      essence: 0,
      relics: [],
    },
    classes: {
      mage: { level: 1, owned: [] },
      ranger: { level: 1, owned: [] },
      supp: { level: 1, owned: [] },
      tank: { level: 1, owned: [] },
      war: { level: 1, owned: [] }
    }
  };
  if (query) {
    player = deserializePlayer(query);
  }
  player.classes = normalizeClassesState(player.classes);
  return player;
}

export default defineComponent({
  components: { PlayerStateForm, ClassStateForm, BagPanel },
  name: 'IndexPage',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const player = ref<Player>(initPlayer(route.query.player as LocationQueryValue));
    const playerEditing = ref(route.query.playerEditing ? route.query.playerEditing === '1' : false);
    const targetClasses = ref(initClassState(route.query.target as LocationQueryValue));
    const resultPlayer = ref<Player>();

    const resetResult = () => {
      resultPlayer.value = initPlayer(route.query.player as LocationQueryValue);
      targetClasses.value = cloneDeep(resultPlayer.value.classes);
    };

    watch(player, () => {
      const pquery = serializePlayer(player.value);
      if (pquery !== route.query.player) {
        router.push({ query: { ...route.query, player: pquery } });
      }
    }, { deep: true, immediate: true });
    watch(playerEditing, (val) => {
      router.push({ query: { ...route.query, playerEditing: playerEditing.value ? '1' : undefined }, hash: playerEditing.value === false ? '#target' : undefined });
      if (!val) {
        resultPlayer.value = cloneDeep(player.value);
        targetClasses.value = cloneDeep(player.value.classes);
      }
    });
    watch(targetClasses, () => {
      const tquery = serializeClassState(targetClasses.value);
      if (tquery !== route.query.target) {
        router.push({ query: { ...route.query, target: tquery } });
      }
      resultPlayer.value = tryUpdateClasses(resultPlayer.value ?? player.value, targetClasses.value);
    }, { deep: true, immediate: true });
    return {
      player,
      playerEditing,
      targetClasses,
      resultPlayer,
      resetResult
    };
  },
});
</script>
<style lang="scss" scoped>
.wrapper {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
