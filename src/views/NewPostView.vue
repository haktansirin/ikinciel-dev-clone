<script>
import SelectBox from "@/components/shared/SelectBox";
import { mapGetters } from "vuex";
import slugify from "slugify";

export default {
  name: "NewPost",
  data() {
    return {
      post: {
        title: null,
        price: null,
        currency: null,
        category: null,
        location: null,
        contact: null,
        description: null,
        images: [],
      },
    };
  },
  components: {
    SelectBox,
  },
  methods: {
    async newPost(e) {
      e.preventDefault();
      await this.$http.post("/posts", {
        user_id: this.userId,
        ...this.post,
        date: new Date(),
        slug: this.slugPostTitle,
      });
      this.$router.push({ name: "Home" });
    },
    uploadImage(e) {
      const files = e.target.files;
      if (files.length > 5 || this.post.images.length > 4) {
        alert("En Fazla 5 görsel eklenebilir.");
      } else {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const fileSize = file.size / 1024 / 1024;
          if (file.type !== "image/png" && file.type !== "image/jpeg") {
            alert("Sadece .png ve .jpg uzantılı görseller eklenebilir.");
          } else if (fileSize > 2) {
            alert("Görseller maksimum 2 MB boyutunda olmalıdır.");
          } else {
            this.createImage(file);
          }
        }
      }
    },
    createImage(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.post.images.push(e.target.result);
      };
      reader.readAsDataURL(file);
    },
    removeUploadImage(i) {
      this.post.images.splice(i, 1);
    },
  },
  computed: {
    ...mapGetters(["currencies", "categories", "cities", "userId"]),
    validation() {
      const {
        title,
        price,
        currency,
        category,
        location,
        contact,
        description,
      } = this.post;

      if (
        title == null ||
        title?.length == 0 ||
        price == null ||
        price?.length == 0 ||
        currency == null ||
        currency?.length == 0 ||
        category == null ||
        category?.length == 0 ||
        location == null ||
        location?.length == 0 ||
        contact == null ||
        contact?.length == 0 ||
        description == null ||
        description?.length == 0 ||
        this.post.images.length == 0
      ) {
        return false;
      }
      return true;
    },
    slugPostTitle() {
      return slugify(this.post.title, {
        replacement: "-",
        lower: true,
        remove: /[*+~.()'"!:@]/g,
      });
    },
  },
  mounted() {
    this.$store.dispatch("getCurrencies");
  },
};
</script>

<template>
  <form class="form" @submit="newPost">
    <div class="form-title">Yeni İlan Ekle</div>
    <div class="form-content">
      <div class="form-item full">
        <input
          type="text"
          class="form-input"
          placeholder="İlan Başlığı"
          v-model="post.title"
        />
      </div>
      <div class="form-item">
        <input
          type="number"
          class="form-input"
          placeholder="Fiyat"
          v-model="post.price"
        />
      </div>
      <div class="form-item">
        <SelectBox
          class="form-select"
          title="Para Birimi"
          :options="currencies"
          v-model="post.currency"
        />
      </div>
      <div class="form-item">
        <SelectBox
          class="form-select"
          title="Kategori"
          :options="categories"
          v-model="post.category"
        />
      </div>
      <div class="form-item">
        <SelectBox
          class="form-select"
          title="Şehir"
          :options="cities"
          v-model="post.location"
        />
      </div>
      <div class="form-item full">
        <input
          type="text"
          class="form-input"
          placeholder="İletişim Bilgisi"
          v-model="post.contact"
        />
      </div>
      <div class="form-item full">
        <textarea
          class="form-textarea"
          placeholder="İlan Açıklaması"
          v-model="post.description"
        ></textarea>
      </div>
      <div class="form-item full">
        <div class="form-title">
          Görsel Ekle
          <p>
            <small>
              (En fazla 5 adet görsel ekleyebilirsin. (Uzantı: .jpg ve .png,
              Maks. Boyut: 2 MB))
            </small>
          </p>
        </div>
        <div class="form-images">
          <label>
            <input
              type="file"
              multiple
              style="display: none"
              @change="uploadImage"
            />
            <div class="form-images-add">
              <div class="form-images-add-icon">+</div>
              Ekle
            </div>
          </label>
          <div
            class="form-images-item"
            v-for="(image, i) in post.images"
            :key="image.id"
          >
            <div class="form-image">
              <img :src="image" alt="image" />
            </div>
            <button type="button" @click="removeUploadImage(i)">Kaldır</button>
          </div>
        </div>
      </div>
      <div class="form-buttons">
        <router-link :to="{ name: 'Home' }">iptal</router-link>
        <button
          type="submit"
          class="button-primary"
          :class="{ disabled: !validation }"
        >
          Yayınla
        </button>
      </div>
    </div>
  </form>
</template>

<style lang="scss">
.form {
  max-width: 600px;
  margin: auto;

  &-content {
    display: flex;
    flex-wrap: wrap;
    gap: $gutters;
  }

  &-title {
    font-size: 18px;
    margin-bottom: 20px;
  }

  &-item {
    width: calc(50% - ($gutters / 2));

    &.full {
      width: 100%;
    }
  }

  &-input,
  &-textarea {
    border-bottom: 1px solid $border-color;
    border-radius: 0;
    padding: 15px 20px;
  }

  &-textarea {
    min-height: 100px;
    resize: none;
  }

  &-select {
    border-top: 0;
    border-left: 0;
    border-right: 0;
    border-radius: 0;
  }

  &-images {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;

    &-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 10px;
    }

    &-add {
      font-size: 14px;
      text-align: center;
      user-select: none;
      cursor: pointer;

      &-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 60px;
        height: 60px;
        color: $gray-color;
        font-size: 20px;
        border: 2px dashed $border-color;
        border-radius: 50%;
        margin-bottom: 10px;
      }
    }
  }

  &-image {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: $light-color;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &-buttons {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 30px;
    width: 100%;
  }

  &-images,
  &-title {
    padding-left: 20px;
    padding-right: 20px;
  }
}
</style>
