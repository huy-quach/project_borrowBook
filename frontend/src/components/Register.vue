<template>
  <Nav></Nav>
  <div class="container-fluid d-flex justify-content-center align-items-center vh-100">
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="Login-form">
            <h2 class="text-primary mb-4 text-center"><i class="fas fa-user-plus"></i> Đăng ký tài khoản</h2>
            <Form @submit="submitRegister" :validation-schema="registerFormSchema">
              <div class="mb-3">
                <label for="username" class="form-label">Tên tài khoản</label>
                <Field name="username" type="text" class="form-control" v-model="registerLocal.username" />
                <ErrorMessage name="username" class="error-feedback" />
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <Field name="email" type="email" class="form-control" v-model="registerLocal.email" />
                <ErrorMessage name="email" class="error-feedback text-danger" />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Mật khẩu</label>
                <Field name="password" type="password" class="form-control" v-model="registerLocal.password" />
                <ErrorMessage name="password" class="error-feedback text-danger" />
              </div>
              <div class="mb-3">
  <label for="confirmPassword" class="form-label">Xác nhận mật khẩu</label>
  <Field name="confirm_password" type="password" class="form-control"
    v-model="registerLocal.confirm_password" />
  <ErrorMessage name="confirm_password" class="error-feedback text-danger" />
</div>
              <div class="d-flex justify-content-center">
                <button type="submit" class="btn btn-primary btn-lg me-2"><i class="fas fa-user-plus"></i> Đăng
                  ký</button> &nbsp;
                <button type="submit" class="btn btn-secondary btn-lg ms-2"><i class="fas fa-sign-in-alt"></i> Đăng
                  nhập</button>
              </div>
            </Form>
            <div class="mt-3">
              <p>Bạn đã có tài khoản? <router-link to="/Login">Đăng nhập ngay</router-link></p>
            </div>
          </div>
        </div>
      </div>
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
  emits: ["submit:register"],
  data() {
    const registerFormSchema = yup.object().shape({
      email: yup
        .string()
        .email("E-mail không đúng.")
        .max(50, "E-mail tối đa 50 ký tự."),
      password: yup.string().min(6, "Mật khẩu phải từ 6 kí tự"),

      confirm_password: yup.string().oneOf([yup.ref('password'), null], 'Mật khẩu không khớp.')
    });
    return {
      registerLocal: {},
      registerFormSchema,
    };
  },
  methods: {
    submitRegister() {
      this.$emit("submit:register", this.registerLocal);
    },
    backLogin() {
      this.$router.push({ name: "login" });
    },
  },
};
</script>

<style scoped>
.Login-form {
  background-color: #f8f9fa;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
}

.container-fluid {
  height: 100vh;
}
</style>