<template>
  <component
    :is="icon"
    :class="{
      active,
      disabled,
      'mr-1': left,
      'ml-1': right,
      clickable: onClick,
    }"
    :style="{ color }"
    :width="width || size || '' + (width || size ? 'px' : '')"
    :height="height || size || '' + (height || size ? 'px' : '')"
    :title="title"
    @click="onClick"
  />
</template>

<script>
import { defineComponent } from "vue";
import moon from "./icons/moon.vue";
import sun from "./icons/sun.vue";
import logo from "./icons/logo.vue";
import rnlogo from "./icons/rnlogo.vue";
import save from "./icons/save.vue";
import close from "./icons/close.vue";
import rnfilter from "./icons/filter.vue";
import timeFilter from "./icons/timeFilter.vue";
import sortAsc from "./icons/sort-asc.vue";
import sortDesc from "./icons/sort-desc.vue";
import vueIcon from "./icons/vueIcon.vue";
import analitycs from "./icons/analitycs.vue";
import person from "./icons/person.vue";
import rig from "./icons/rig.vue";
import graphIcon from "./icons/graph.vue";
import exlamation from "./icons/exclamaitionPoint.vue";
import rectangle from "./icons/rectangle.vue";
import bigRectangle from "./icons/bigRectangle.vue";
import openedBook from "./icons/openedBook.vue";
import startSettings from "./icons/startSettings.vue";
import start from "./icons/start.vue";
import eye from "./icons/eye.vue";

import xlExport from "./icons/xlImportExport/xlExport.vue";

import search from "./icons/standart/Search.vue";
import accept from "./icons/standart/Accept.vue";
import cancel from "./icons/standart/Cancel.vue";
import calendar from "./icons/standart/Calendar.vue";
import summ from "./icons/standart/summ.vue";
import cols from "./icons/standart/cols.vue";
import rows from "./icons/standart/rows.vue";
import edit from "./icons/standart/edit.vue";

import list from "./icons/list.vue";

import chevronDown from "./icons/arrows/chevronDown.vue";
import chevronUp from "./icons/arrows/chevronUp.vue";
import chevronLeft from "./icons/arrows/chevronLeft.vue";
import chevronRight from "./icons/arrows/chevronRight.vue";
import upRightVector from "./icons/arrows/upRightVector.vue";
import download from "./icons/arrows/download.vue";
import upload from "./icons/arrows/upload.vue";

import RnLogoGdis from "./icons/rnLogos/RnLogoGdis.vue";

export default defineComponent({
  components: {
    moon,
    sun,
    save,
    close,
    logo,
    rnlogo,
    rnfilter,
    timeFilter,
    sortAsc,
    sortDesc,
    vueIcon,
    analitycs,
    person,
    rig,
    graphIcon,
    exlamation,
    rectangle,
    bigRectangle,
    openedBook,
    startSettings,
    start,
    eye,

    xlExport,

    search,
    accept,
    cancel,
    calendar,
    summ,
    cols,
    rows,
    edit,

    list,

    chevronDown,
    chevronUp,
    chevronLeft,
    chevronRight,
    upRightVector,
    download,
    upload,

    RnLogoGdis,
  },
  name: "rn-icon",
  props: {
    icon: [String, Object],
    color: String,
    title: String,
    size: {
      type: [Number, String],
      default: 24,
    },
    width: [Number, String],
    height: [Number, String],
    disabled: Boolean,
    active: Boolean,
    left: Boolean,
    right: Boolean,
    onClick: Function,
  },
});
</script>

<style lang="scss" scoped>
svg {
  width: auto;
}
</style>
