<template>
  <Register @submit:register="register"></Register>
</template>

<script>
import Register from "../components/Register.vue";
import accountsService from "../services/accounts.service";
export default {
  components: {
    Register,
  },
  data() {
    return {
      account: {},
    };
  },
  methods: {
    async register(data) {
      try {
        if (data.password !== data.confirm_password) {
          window.alert("Mật khẩu xác nhận không trùng khớp");
          return;
        }

        const result = await accountsService.register(data);
        if (result) {
          localStorage.setItem("user", JSON.stringify(result));
          this.$router.push("/");
        } else {
          window.alert("Đăng ký thất bại");
        }
      } catch (error) {
        console.log(error, "error");
      }
    },
  },
  created() {
    this.message = "";
  },
};
</script>
