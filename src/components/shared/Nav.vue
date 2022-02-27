<script>
export default {
  name: "TheNav",
};
</script>

<template>
  <nav class="menu">
    <router-link :to="{ name: 'Home' }" class="menu-link" active-class="active">
      Ana Sayfa
    </router-link>
    <router-link
      :to="{ name: 'NewPost' }"
      class="menu-link"
      active-class="active"
    >
      Yeni İlan
    </router-link>
    <router-link
      :to="{ name: 'Profile' }"
      class="menu-link"
      active-class="active"
    >
      Profil
    </router-link>
  </nav>
</template>

<style lang="scss" scpoped>
.menu {
  display: flex;
  gap: 25px;
  height: 100%;

  &-link {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-size: 14px;

    &.active {
      color: $primary-color;
    }
  }

  @media (max-width: $sm) {
    gap: 15px;
  }
}
</style>
