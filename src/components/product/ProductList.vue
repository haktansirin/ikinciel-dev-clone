<script>
export default {
  name: "ProductList",
  props: ["posts"],
};
</script>

<template>
  <ul class="list">
    <li class="list-item" v-for="post in posts" :key="post.id">
      <div class="list-image">
        <img :src="post.images[0]" :alt="post.title" loading="lazy" />
      </div>
      <div class="list-title">{{ post.title }}</div>
      <div class="list-location">{{ post.location }}</div>
      <div class="list-price">
        {{ post.currency + $filters.numberFormatter(post.price) }}
      </div>
      <router-link
        :to="{
          name: 'ProductDetail',
          params: { id: post.id, slug: post.slug },
        }"
        class="list-link"
      ></router-link>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.list {
  &-item {
    position: relative;
    display: flex;
    align-items: center;
    gap: $gutters;
    padding-top: 5px;
    padding-bottom: 5px;
    margin-bottom: 15px;

    &:hover {
      .list-title {
        color: $dark-color;
      }
    }
  }

  &-image {
    width: 65px;
    height: 65px;
    border-radius: 50%;
    background-color: $light-color;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &-title {
    flex: 1;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    transition: $transition-base;
  }

  &-price {
    min-width: 80px;
    text-align: end;
  }

  &-link {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  @media (max-width: $sm) {
    &-item {
      font-size: 14px;
      justify-content: space-between;
      gap: 15px;
    }

    &-image {
      width: 40px;
      height: 40px;
    }

    &-price {
      font-weight: 600;
    }

    &-location {
      display: none;
    }
  }
}
</style>
