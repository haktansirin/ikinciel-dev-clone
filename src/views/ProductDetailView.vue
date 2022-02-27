<script>
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

export default {
  name: "ProductDetailView",
  data() {
    return {
      product: {},
      user: {},
    };
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  async mounted() {
    const detail = await this.$http.get(`/posts/${this.currentProduct}`);
    this.product = detail.data;

    const user = await axios.get(
      `https://api.github.com/user/${this.product.user_id}`
    );
    this.user = user.data;
  },
  setup() {
    return {
      modules: [Navigation],
    };
  },
  computed: {
    currentProduct() {
      return this.$route.params.id;
    },
  },
};
</script>

<template>
  <div class="product-detail-title">{{ product.title }}</div>
  <div class="product-detail">
    <div class="product-detail-content">
      <div class="product-detail-user">
        <img :src="user.avatar_url" :alt="user.name" loading="lazy" />
        {{ user.name }}
      </div>
      <div class="title">Açıklama</div>
      <p>{{ product.description }}</p>
      <div class="title">İletişim</div>
      <p>{{ product.contact }} - {{ product.location }}</p>
      <div class="product-detail-footer">
        <span>{{ $filters.dateFormatter(product.date) }}</span>
        <div class="product-detail-price">
          {{ product.currency + $filters.numberFormatter(product.price) }}
        </div>
      </div>
    </div>
    <div class="product-detail-image">
      <swiper :navigation="true" :modules="modules" :slides-per-view="1">
        <swiper-slide v-for="image in product.images" :key="image.id">
          <img :src="image" :alt="product.title" loading="lazy" />
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<style lang="scss">
.product-detail {
  display: flex;
  gap: $gutters;

  &-title {
    font-size: 18px;
    margin-bottom: $gutters;
  }

  &-image {
    position: sticky;
    top: $gutters;
    width: 100%;
    max-width: 350px;
    height: 350px;
    border-radius: 50%;
    background-color: $light-color;
    overflow: hidden;
    user-select: none;

    &::before,
    &::after {
      content: "";
      position: absolute;
      top: 0;
      width: 100px;
      height: 100%;
      z-index: 2;
    }

    &::before {
      left: 0;
      background: linear-gradient(to right, rgba(0, 0, 0, 0.5), transparent);
    }

    &::after {
      right: 0;
      background: linear-gradient(to left, rgba(0, 0, 0, 0.5), transparent);
    }

    img {
      width: 100%;
      height: 350px;
      object-fit: cover;
    }

    .swiper {
      z-index: unset;
    }

    .swiper-button-prev,
    .swiper-button-next {
      &::after {
        color: $white-color;
        font-size: 34px;
      }
    }

    .swiper-button-prev {
      left: 25px;
    }

    .swiper-button-next {
      right: 25px;
    }
  }

  &-content {
    flex: 1;
  }

  &-user {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: $gutters;

    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      object-fit: cover;
    }
  }

  &-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid $border-color;
    padding-top: 30px;
  }

  &-price {
    font-size: 22px;
    font-weight: 500;
  }

  @media (max-width: $md) {
    flex-direction: column-reverse;
    align-items: center;
  }

  @media (max-width: $sm) {
    &-image {
      max-width: 250px;
      height: 250px;

      img {
        height: 250px;
      }
    }
  }
}
</style>
