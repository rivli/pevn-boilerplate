<script setup>
import { ref, computed, onMounted } from "vue";
const props = defineProps({
  items: Array,
  headers: Array,
  colHeaders: Array,
  rowClass: String,
  colClass: String,
  headerRowClass: String,
  headerColClass: String,
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

  if ( props.colHeaders != undefined ) {
  props.colHeaders.map((h) => {
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
  });}
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
  <rn-simple-table :height="height" :fixedHeader="fixedHeader" >
    <tbody>
      <th v-for="(h, k) in colHeaders" :class="colClass" :key="k + '-row'">
        <td :class="headerColClass">
          {{ h.title }}
        </td></th>
      <tr v-for="(h, k) in headers" :class="rowClass" :key="k + '-row'">
        <td :class="headerRowClass" style="text-align: left">
          {{ h.title }}
        </td>
        <td
          v-for="(d, i) in items"
          :key="k + '-row-header-' + i"
          :class="h.filedClass"
          :style="h.fieldStyle"
        >
          {{ d[h.key] }}
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
