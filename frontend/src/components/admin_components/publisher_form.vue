<template>
  <div class="dashboard">
    <bar_nav></bar_nav>
    <div class="main">
      <div class="form-container">
        <div class="form-shadow">
          <div class="publisher-form-container">
            <h3>Thêm mới nhà xuất bản</h3>
            <form @submit.prevent="handleSubmit" class="publisher-form">
              <div class="form-group">
                <label for="name">Tên</label>
                <input type="text" class="form-control big-input" id="name" name="name" placeholder="Nhập tên nhà xuất bản" v-model="data.name" />
              </div>
              <div class="form-group">
                <label for="address">Địa chỉ</label>
                <input type="text" class="form-control big-input" id="address"  name="address" placeholder="Nhập địa chỉ" v-model="data.address" />
              </div>
              <div class="text-center"> <!-- Thêm div để căn chỉnh nút "Lưu" -->
                <button type="submit" class="btn btn-primary btn-lg">Lưu</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bar_nav from "../admin_components/bar_nav.vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import publisherService from "../../services/publisher.service";
export default {
  props: {
    publisher: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    bar_nav,
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      data: this.publisher || {
        _id: "",
        name: "",
        address: "",
      },
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const { _id, ...newData } = this.data;
        if (this.publisher._id) {
          await publisherService.update(_id, newData);
        } else {
          await publisherService.create(newData);
        }
        this.$router.push("/admin/publisher");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.dashboard {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 20px;
}

.main {
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-shadow {
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); /* Thêm hiệu ứng bóng */
  border-radius: 10px; /* Bo tròn góc */
  padding: 20px;
}

.publisher-form-container {
  max-width: 500px; /* Đổi max-width để làm to hơn */
  margin: 0 auto;
}

.publisher-form {
  /* CSS styles cho form */
}

.form-group {
  margin-bottom: 20px;
}

.big-input {
  font-size: 18px; /* Đổi kích thước font của input */
  padding: 10px; /* Thêm padding để làm to hơn */
}

.btn-primary {
  margin-top: 20px;
}
</style>
