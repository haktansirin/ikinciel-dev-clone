<script>
import { mapGetters } from "vuex";
import Logo from "@/components/shared/Logo";
import Nav from "@/components/shared/Nav";

export default {
  name: "TheHeader",
  components: {
    Logo,
    Nav,
  },
  methods: {
    logout() {
      this.$store.dispatch("isLoginned", false);
      this.$router.push("/");
    },
  },
  computed: {
    ...mapGetters(["isLoginned"]),
  },
};
</script>

<template>
  <header class="header">
    <div class="container">
      <Logo />
      <div
        class="header-right-area"
        :class="{ visible: isLoginned }"
        v-if="isLoginned"
      >
        <Nav />
        <button type="button" class="button-logout" @click="logout">
          Çıkış Yap
        </button>
      </div>
      <router-link
        :to="{ name: 'Login' }"
        type="button"
        class="button-login"
        v-else
      >
        Giriş Yap
      </router-link>
    </div>
  </header>
</template>

<style lang="scss">
.header {
  border-bottom: 1px solid $border-color;

  .container {
    display: flex;
    justify-content: space-between;
    min-height: $header-height;
  }

  &-right-area {
    display: flex;
    align-items: center;
    gap: 25px;
    opacity: 0;
    visibility: hidden;

    .menu-link {
      opacity: 0;
      transform: translateX(10px);
    }

    &.visible {
      animation: fade 0.3s ease-in-out 0.3s forwards;

      .menu-link {
        animation: slide 0.3s ease-in-out 0.6s forwards;
      }
    }
  }

  @media (max-width: $sm) {
    &-right-area {
      gap: 15px;
    }
  }
}

.button-login {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  gap: 10px;
}

.button-logout {
  height: 100%;
  border-left: 1px solid $border-color;
  padding-left: 25px;
  transition: $transition-base;

  &:hover {
    color: $danger-color;
  }

  @media (max-width: $sm) {
    padding-left: 15px;
  }
}

@keyframes slide {
  to {
    opacity: 1;
    visibility: visible;
    transform: translateX(0);
  }
}

@keyframes fade {
  to {
    opacity: 1;
    visibility: visible;
  }
}
</style>
