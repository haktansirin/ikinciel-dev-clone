<script>
import ProductList from "@/components/product/ProductList";
import { mapGetters } from "vuex";

export default {
  name: "ProfileView",
  components: {
    ProductList,
  },
  computed: {
    ...mapGetters(["user", "myPosts"]),
  },
};
</script>

<template>
  <div class="profile">
    <div class="profile-posts">
      <div class="title">İlanlarım ({{ myPosts.length }})</div>
      <ProductList :posts="myPosts" />
      <div class="message" v-if="myPosts.length === 0">
        Aktif bir ilanın bulunmuyor.
        <router-link :to="{ name: 'NewPost' }" class="underline">
          Şimdi yayınla!
        </router-link>
      </div>
    </div>
    <div class="profile-detail">
      <div class="profile-image">
        <img :src="user.avatar_url" :alt="user.name" />
      </div>
      <a
        :href="user.html_url"
        target="_blank"
        rel="noopener"
        class="profile-name"
      >
        <small>@{{ user.login }}</small>
        <span>{{ user.name }}</span>
        <small>{{ user.location }}</small>
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.profile {
  display: flex;
  align-items: flex-start;
  gap: 60px;

  &-detail {
    position: sticky;
    top: $gutters;
  }

  &-name {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    font-size: 18px;
    text-align: center;
    margin-top: 15px;
  }

  &-image {
    width: 170px;
    height: 170px;
    border-radius: 50%;
    background-color: $light-color;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &-posts {
    flex: 1;
    width: 100%;
  }

  @media (max-width: $md) {
    flex-direction: column-reverse;
    align-items: center;
    gap: 0;

    &-detail {
      margin-bottom: $gutters;
    }
  }
}
</style>
