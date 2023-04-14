<template>
  <div>
    <q-table title="Реликвии" :grid="$q.screen.lt.md" :rows="data" :columns="columns" row-key="id" hide-bottom grid-header
      virtual-scroll :filter="filter" :filter-method="filterMethod" class="background-light" :rows-per-page-options="[0]"
      :pagination="{ sortBy: 'grade' }" binary-state-sort>
      <template #body-cell-name="props">
        <q-td :props="props">
          <q-img :src="props.row.image" ratio="1" height="50px" width="50px" />
          {{ props.value }}
        </q-td>
      </template>
      <template #body-cell-price="props">
        <q-td :props="props">
          <q-img src="../assets/essence.png" ratio="1" height="30px" width="30px" />
          {{ props.value }}
        </q-td>
      </template>
      <template #body-cell-fullPrice="props">
        <q-td :props="props">
          <q-img src="../assets/essence.png" ratio="1" height="30px" width="30px" />
          {{ props.value }}
        </q-td>
      </template>
      <template #body-cell-parts="props">
        <q-td :props="props">
          <q-img v-for="(item, index) in props.row.parts" :key="`${item.id}_${index}`" :src="item.image" ratio="1"
            height="50px" width="50px" />
          <span v-if="props.row.parts.length === 0">-</span>
        </q-td>
      </template>
      <template v-if="$q.screen.lt.md" #item="props">
        <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition">
          <q-card class="background-dark">
            <q-card-section>
              <q-img :src="relicImg(props.row.id)" ratio="1" height="50px" width="50px" />
              {{ props.row.name }}
            </q-card-section>
            <q-separator />
            <q-list dense>
              <q-item>
                <q-item-section>
                  <q-item-label>{{ props.cols[1].label }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label class="text-dark">{{ props.cols[1].value }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label>{{ props.cols[2].label }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label class="text-dark">
                    <q-img src="../assets/essence.png" ratio="1" height="30px" width="30px" />
                    {{ props.cols[2].value }}
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label>{{ props.cols[3].label }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label class="text-dark">
                    <q-img src="../assets/essence.png" ratio="1" height="30px" width="30px" />
                    {{ props.cols[3].value }}
                  </q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label>{{ props.cols[4].label }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label class="text-dark">
                    <q-img v-for="(item, index) in props.row.parts" :key="`${item.id}_${index}`" :src="item.image"
                      ratio="1" height="50px" width="50px" />
                    <span v-if="props.row.parts.length === 0">-</span>
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </div>
      </template>
      <template #top-right>
        <div class="row q-gitter-md">
          <div class="q-px-md">
            <q-input style="min-width: 300px;" label="Название" debounce="300" v-model="filter.name"
              color="background-dark" clearable />
          </div>
          <div>
            <q-select style="min-width: 200px;" v-model="filter.grade" :options="gradeOptions" prefix="Грейд:" emit-value
              map-options />
          </div>
        </div>
      </template>
    </q-table>
  </div>
</template>
<script lang="ts">
import { QTableProps } from 'quasar';
import { RelicGrade, getGradeName, getRelicGradeOrder, relicGradeOrder } from 'src/models/grade';
import { getRelicImage, relicFullPrice, relics } from 'src/models/relic';
import { UnwrapRef, computed, defineComponent, ref } from 'vue';

type Filter = Partial<{ name: string, grade: RelicGrade | null }>;

export default defineComponent({
  setup() {
    const columns: QTableProps['columns'] = [
      { name: 'name', required: true, label: 'Название', field: 'name', sortable: true, align: 'left' },
      {
        name: 'grade', required: true, label: 'Грейд',
        field: 'grade', sortable: true, align: 'left',
        format: (v: RelicGrade) => getGradeName(v), sort: (a: RelicGrade, b: RelicGrade) => getRelicGradeOrder(a) - getRelicGradeOrder(b)
      },
      { name: 'price', label: 'Стоимость', field: 'price', sortable: true, align: 'left', format: (val: number) => val.toLocaleString() },
      { name: 'fullPrice', label: 'Полная стоимость', field: 'fullPrice', sortable: true, align: 'left', format: (val: number) => val.toLocaleString() },
      { name: 'parts', label: 'Части', field: 'parts', sortable: false, align: 'left' }
    ];
    const data = computed(() => relics.map(v =>
      ({ ...v, image: getRelicImage(v.id), fullPrice: relicFullPrice(v.id), parts: v.parts.map(p => ({ id: p, image: getRelicImage(p) })) })));

    const filter = ref<Filter>({
      grade: null
    });
    const filterMethod = (rows: UnwrapRef<typeof data>, terms: Filter, _cols: typeof columns, _getCellValue: (col: unknown, row: unknown) => unknown) => {
      let data = rows;
      if (terms.name) data = data.filter(v => v.name.toLowerCase().includes(terms.name!.toLowerCase()));
      if (terms.grade) data = data.filter(v => v.grade === terms.grade!);
      return data;
    };
    const initGradeOptions = () => {
      const opts = Object.keys(relicGradeOrder).map(v => ({ label: getGradeName(v as RelicGrade), value: v }));
      opts.unshift({ label: ' Все ', value: null as unknown as string });
      return opts;
    }
    return {
      data,
      columns,
      relicImg: getRelicImage,
      filter,
      filterMethod: filterMethod as unknown as QTableProps['filterMethod'],
      gradeOptions: initGradeOptions(),
    };
  }
});
</script>
