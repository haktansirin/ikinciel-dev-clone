<script>
import ProductList from "@/components/product/ProductList";
import SelectBox from "@/components/shared/SelectBox";
import SearchBox from "@/components/shared/SearchBox";
import IconSearch from "@/components/icons/IconSearch";
import IconFilter from "@/components/icons/IconFilter";
import IconClose from "@/components/icons/IconClose";
import { mapGetters } from "vuex";

export default {
  name: "HomeView",
  data() {
    return {
      isShowFilter: false,
      isShowSearch: false,
    };
  },
  methods: {
    showFilter() {
      this.isShowFilter = !this.isShowFilter;
    },
    showSearch() {
      this.isShowSearch = !this.isShowSearch;
    },
  },
  components: {
    ProductList,
    SelectBox,
    SearchBox,
    IconSearch,
    IconFilter,
    IconClose,
  },
  computed: {
    ...mapGetters(["categories", "cities", "posts"]),
  },
  mounted() {
    this.$store.dispatch("getPosts");
    this.$store.dispatch("getCities");
    this.$store.dispatch("getCategories");
  },
};
</script>

<template>
  <div class="product-list">
    <div class="product-list-filter" :class="{ active: isShowFilter }">
      <div class="product-list-header mb-0">
        <div class="product-list-title">Filtre</div>
        <button type="button" class="mobile-icon" @click="showFilter">
          <IconClose width="20" height="20" />
        </button>
      </div>
      <SelectBox :options="categories" title="Kategori" />
      <SelectBox :options="cities" title="Şehir" />
    </div>
    <div class="product-list-content">
      <div class="product-list-header">
        <div class="product-list-title">İlanlar</div>
        <button type="button" class="mobile-icon" @click="showSearch">
          <IconSearch width="22" height="22" />
        </button>
        <button type="button" class="mobile-icon" @click="showFilter">
          <IconFilter width="22" height="22" />
        </button>
        <SearchBox
          @show-search="showSearch"
          :class="{ active: isShowSearch }"
        />
      </div>
      <ProductList :posts="posts" />
      <div class="message" v-if="posts.length === 0">Aktif bir ilan yok!</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.product-list {
  display: flex;
  gap: 50px;

  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
    gap: 15px;

    .product-list-title {
      margin-right: auto;
    }
  }

  &-title {
    display: flex;
    align-items: center;
    min-height: 40px;
    font-size: 18px;
  }

  &-filter {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 250px;
  }

  &-content {
    flex: 1;
  }

  @media (max-width: $md) {
    &-header {
      position: relative;
    }

    &-filter {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: $body-color;
      padding: 15px;
      opacity: 0;
      visibility: hidden;
      z-index: 2;
      transition: $transition-base;

      &.active {
        opacity: 1;
        visibility: visible;
      }
    }
  }
}

.mobile-icon {
  @media (min-width: $md) {
    display: none;
  }
}
</style>
