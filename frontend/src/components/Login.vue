<template>
  <Nav></Nav>
  <div class="container-fluid d-flex align-items-center justify-content-center">
    <div class="Login-form p-5"> <!-- Thêm class p-5 để tăng khoảng cách xung quanh form -->
      <h2 class="text-primary mb-4 text-center"><i class="fas fa-sign-in-alt"></i> Đăng nhập</h2>
      <Form @submit="submitRegister" :validation-schema="registerFormSchema">
        <div class="mb-3">
          <label for="email" class="form-label">Email: </label>
          <Field
            name="email"
            type="email"
            class="form-control form-control-lg"
            placeholder="Nhập vào E-mail của bạn..."
            v-model="LoginLocal.email"/>
          <ErrorMessage name="email" class="error-feedback" />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Mật khẩu: </label>
          <Field
            name="password"
            type="password"
            class="form-control form-control-lg"
            placeholder="Nhập vào mật khẩu..."
            v-model="LoginLocal.password"
          />
          <ErrorMessage name="password" class="error-feedback" />
        </div>
        <div class="mb-3 form-check">
          <input name="favorite" type="checkbox" class="form-check-input" id="favorite" />
          <label for="favorite" class="form-check-label">
            <strong>Lưu mật khẩu</strong>
          </label>
        </div>
        <div class="mb-3 d-grid gap-2 text-center">
          <button class="btn btn-primary" type="submit"><i class="fas fa-sign-in-alt"></i> Đăng nhập</button> &nbsp;
          <button class="btn btn-outline-primary" @click="gotoRegister()"><i class="fas fa-user-plus"></i> Đăng ký</button>
        </div>
      </Form>
    </div>
  </div>
  <Footer></Footer>
</template>


<script>
import Home from "../components/user_components/Home.vue";
import Nav from "../components/user_components/NavUser.vue";
import Footer from "../components/user_components/Footer.vue";
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
  components: {
    Nav,
    Home,
    Footer,
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:login"],
  data() {
    const LoginFormSchema = yup.object().shape({
      email: yup
        .string()
        .email("E-mail không đúng.")
        .max(50, "E-mail tối đa 50 ký tự."),
      password: yup.string().min(6, "Mật khẩu phải từ 6 kí tự"),
    });
    return {
      LoginLocal: {},
      LoginFormSchema,
    };
  },
  methods: {
    submitRegister() {
      this.$emit("submit:register", this.registerLocal);
    },
    backLogin() {
      this.$router.push({ name: "login" });
    },
    gotoRegister() {
      this.$router.push("/Register");
    },
  },
};
</script>

<style scoped>
.error-feedback {
  color: red;
}

.Login-form {
  background-color: #f8f9fa;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  max-width: 600px; /* Thay đổi max-width để làm form lớn hơn */
  width: 100%; 
}

.container-fluid {
  height: 100vh; 
}
</style>
