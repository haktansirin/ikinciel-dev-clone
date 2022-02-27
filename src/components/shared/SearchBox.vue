<script>
import IconSearch from "@/components/icons/IconSearch";
import IconClose from "@/components/icons/IconClose";

export default {
  name: "SearchBox",
  components: {
    IconSearch,
    IconClose,
  },
};
</script>

<template>
  <div class="search">
    <div class="search-icon">
      <IconSearch width="20" height="20" />
    </div>
    <input type="text" class="search-input" placeholder="Ara" />
    <button type="button" class="search-close" @click="$emit('show-search')">
      <IconClose width="20" height="20" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.search {
  position: relative;

  &-icon,
  &-close {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: $gray-color;
    z-index: 1;
  }

  &-icon {
    left: 15px;
  }

  &-close {
    display: none;
    right: 15px;
  }

  &-input {
    border-bottom: 1px solid $border-color;
    border-radius: 0;
    padding: 10px 20px 10px 55px;
  }

  @media (max-width: $md) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: $body-color;
    opacity: 0;
    visibility: hidden;
    z-index: 3;
    transition: $transition-base;

    &-close {
      display: block;
    }

    &-input {
      padding-right: 55px;
    }

    &.active {
      opacity: 1;
      visibility: visible;
    }
  }
}
</style>
