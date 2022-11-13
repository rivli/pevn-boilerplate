<script setup>
import { ref, onMounted, computed } from "vue";
const emits = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: Boolean,
  items: Array,
});

const choosen = ref([]);
const search = ref("");

onMounted(() => {
  choosen.value = props.modelValue || [];
});

const filteredItems = computed(() => {
  return props.items.filter((i) => {
    const item = i.toString().toLowerCase();
    const searchQuery = search.value.toLowerCase();
    return !searchQuery || item === searchQuery || item.includes(searchQuery);
  });
});

const select = (val) => {
  choosen.value.includes(val)
    ? (choosen.value = choosen.value.filter((val2) => val2 !== val))
    : choosen.value.push(val);
  emits("update:modelValue", choosen.value);
};
</script>

<template>
  <rn-expansion-panel class="mb-1" standalone>
    <template #header>Выбрать значения</template>
    <rn-input type="text" v-model="search" placeholder="Найти" />
    <label v-for="val in filteredItems">
      <input
        type="checkbox"
        :checked="choosen.includes(val)"
        @change="() => select(val)"
      />
      {{ val }}
    </label>
  </rn-expansion-panel>
</template>

<style lang="scss" scoped>
label {
  display: flex;
  padding: 5px 15px;
  cursor: pointer;
  border-bottom: 1px solid var(--borderColor);

  &:last-of-type {
    border-bottom: 0;
  }

  &:hover {
    color: var(--primaryColor);
  }

  input {
    width: auto;
    margin-right: 15px;
  }
}
</style>
