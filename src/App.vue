<script>
import Header from "@/components/layout/Header";

export default {
  components: {
    Header,
  },
};
</script>

<template>
  <Header />
  <main class="content">
    <div class="container">
      <router-view></router-view>
    </div>
  </main>
</template>
