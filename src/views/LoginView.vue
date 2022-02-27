<script>
import axios from "axios";

export default {
  name: "TheLogin",
  data() {
    return {
      username: "",
    };
  },
  methods: {
    async login() {
      if (this.username !== "" || this.username.length !== 0) {
        try {
          const user = await axios.get(
            `https://api.github.com/users/${this.username}`
          );
          this.$store.dispatch("getUser", user.data);
          this.$store.dispatch("isLoginned", true);
          this.$router.push({ name: "Home" });
        } catch (e) {
          alert(e.message);
        }
      }
    },
  },
};
</script>

<template>
  <div class="login">
    <div class="login-content">
      <div class="login-title">Giriş yap</div>
      <div class="login-input">
        <input
          type="text"
          v-model="username"
          placeholder="Github Kullanıcı adı"
        />
        <button
          type="button"
          class="button-primary"
          @click="login"
          :class="{ disabled: username === '' || username.length === 0 }"
        >
          Giriş
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  padding-top: 150px;

  &-content {
    width: 100%;
    max-width: 550px;
  }

  &-title {
    font-size: 26px;
    padding-left: 25px;
    margin-bottom: 15px;
  }

  &-input {
    display: flex;
    align-items: center;
    gap: 15px;
    border-bottom: 1px solid $border-color;
    padding: 5px 0 5px 5px;

    input {
      flex: 1;
      font-size: 18px;
      padding: 15px 20px;
    }
  }

  &-message {
    padding-left: 25px;
    margin-top: 15px;
  }
}
</style>
