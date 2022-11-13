<script setup>
import { ref, onMounted } from "vue";
const props = defineProps({
  isActive: Boolean,
  item: {
    type: Object,
    default: {
      title: "No title",
      icon: false,
      hideArrow: false,
      postIcons: [],
      preIcons: [],
    },
  },
});
const activeList = ref(0);
const isToggled = ref(false);

onMounted(() => {
  if (props.item.toggled) isToggled.value = true;
});
const emits = defineEmits(["onCLick"]);

const itemClickHandle = (e) => {
  emits("onClick");
  if (props.item.items) isToggled.value = !isToggled.value;
  if (props.item.onClick) props.item.onClick();
};
</script>

<template>
  <div>
    <div v-if="item.listTitle" class="list__title">
      {{ item.listTitle }}
    </div>

    <div
      class="list__item"
      :class="{
        'list__item--border': item.items,
        active: isActive,
        [item.class]: item.class,
      }"
      @click="itemClickHandle"
    >
      <rn-icons-bar :icons="item.preIcons" />
      {{ props.item.title }}
      <rn-icons-bar :icons="item.postIcons">
        <rn-icon
          v-if="item.items && !item.hideArrow"
          :icon="isToggled ? 'chevron-up' : 'chevron-down'"
          @click.stop="isToggled = !isToggled"
        />
      </rn-icons-bar>
    </div>

    <rn-list
      v-if="item.items && isToggled"
      :items="item.items"
      class="list__inner"
      :class="{ 'pl-1': !item.noMarginLeft }"
      v-model="activeList"
    />
  </div>
</template>
