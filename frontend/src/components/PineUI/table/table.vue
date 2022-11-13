<script setup>
import { ref, computed, onMounted } from "vue";
const props = defineProps({
  items: Array,
  headers: Array,
  rowClass: String,
  headerRowClass: String,
  fixedHeader: {
    default: false,
    type: Boolean,
  },
  height: {
    default: "auto",
    type: String,
  },
});

const emits = defineEmits(["rowClick"]);

const filters = ref({});
const sort = ref({});

onMounted(() => {
  props.headers.map((h) => {
    const availableValues = [];
    props.items.map((i) => {
      if (i[h.key] && !availableValues.includes(i[h.key]))
        availableValues.push(i[h.key]);
    });
    availableValues.sort();
    if (h.filterable) {
      const filter = {
        ...h,
        activated: false,
        availableValues,
        choosenValues: availableValues,
      };

      if (h.type === "Number") {
        filter.from = null;
        filter.to = null;
      }

      filters.value[h.key] = filter;
    }
  });
});

function setSort(h) {
  if (sort.value.key === h.key) {
    if (sort.value.direction === "desc") {
      sort.value = {};
    } else
      sort.value.direction = sort.value.direction === "asc" ? "desc" : "asc";
  } else {
    sort.value = {
      key: h.key,
      direction: "asc",
    };
  }
}

const computedItems = computed(() => {
  let itemscopy = [...props.items];
  if (sort.value.key) {
    itemscopy.sort((a, b) =>
      a[sort.value.key] > b[sort.value.key]
        ? -1
        : a[sort.value.key] < b[sort.value.key]
        ? 1
        : 0
    );
    if (sort.value.direction === "desc") itemscopy.reverse();
  }

  Object.keys(filters.value).map((key) => {
    const f = filters.value[key];
    if (f.activated) {
      itemscopy = itemscopy.filter(
        (item) =>
          f.choosenValues.includes(item[key]) &&
          (f.type !== "Number" ||
            ((item[key] >= f.from || !f.from) && (item[key] <= f.to || !f.to)))
      );
    }
  });

  return itemscopy;
});
</script>

<template>
  <rn-simple-table :height="height" :fixedHeader="fixedHeader">
    <thead>
      <tr :class="headerRowClass">
        <th
          v-for="(h, k) in headers"
          :key="k + '-header'"
          :class="h.headerClass"
          :style="{ width: h.width, ...h.style }"
        >
          <slot :name="`header-${h.key}`" :header="h">
            {{ h.title }}

            <div v-if="h.filterable || h.sortable" class="filterAndSort">
              <rn-menu>
                <template
                  v-if="h.filterable && filters[h.key]"
                  #activator="{ activate }"
                >
                  <rn-icon
                    class="clickable"
                    icon="rnfilter"
                    size="15"
                    :active="filters[h.key].activated"
                    @click="activate"
                  />
                </template>

                <div class="filterBlock p-1">
                  <rn-select-autofill
                    v-model="filters[h.key].choosenValues"
                    :items="filters[h.key].availableValues"
                  />
                  <template v-if="filters[h.key].type === 'Number'">
                    <rn-input
                      type="text"
                      placeholder="От"
                      v-model.number="filters[h.key].from"
                    />
                    <rn-input
                      type="text"
                      placeholder="До"
                      v-model.number="filters[h.key].to"
                    />
                  </template>
                  <div class="filterBlock__buttons">
                    <rn-btn @click="filters[h.key].activated = true">
                      Включить
                    </rn-btn>
                    <rn-btn
                      class="ml-1"
                      @click="filters[h.key].activated = false"
                    >
                      Отключить
                    </rn-btn>
                  </div>
                </div>
              </rn-menu>
              <rn-icon
                v-if="h.sortable"
                class="clickable"
                size="15"
                :icon="'sort-' + (sort.key === h.key ? sort.direction : 'asc')"
                :active="sort.key === h.key"
                @click="setSort(h)"
              />
            </div>
          </slot>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, k) in computedItems"
        :class="rowClass"
        :key="k + '-row'"
        @click="emits('rowClick', item)"
      >
        <td
          v-for="(h, i) in headers"
          :key="k + '-row-header-' + i"
          :class="h.filedClass"
          :style="h.fieldStyle"
        >
          <slot
            :name="`field-${h.key}`"
            :value="item[h.key]"
            :header="h"
            :row="item"
          >
            {{ item[h.key] }}
          </slot>
        </td>
      </tr>
    </tbody>
  </rn-simple-table>
</template>

<style lang="scss" scoped>
.filterBlock {
  .filterBlock__buttons {
    display: flex;
  }
}
</style>
