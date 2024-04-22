<template>
  <div class="dashboard">
    <bar_nav></bar_nav>
    <div class="main">
      <div class="form-container">
        <h5 class="text-center">Quản lý sách</h5>
        <form @submit.prevent="handleSubmit" class="book-form">
          
          <div class="form-shadow">
            <div class="form-group">
              <label for="image">Hình ảnh</label>
              <Field
                type="text"
                class="form-control"
                id="image"
                placeholder="Nhập url hình ảnh"
                name="image"
                v-model="data.image"
              />
              <ErrorMessage name="image" class="error-feedback" />
            </div>
            <div class="form-group">
              <label for="name">Tên</label>
              <Field
                type="text"
                class="form-control"
                id="name"
                placeholder="Nhập tên sách"
                name="name"
                v-model="data.name"
              />
              <ErrorMessage name="name" class="error-feedback" />
            </div>
            <div class="form-group">
              <label for="author">Tác giả</label>
              <Field
                type="text"
                class="form-control"
                id="author"
                placeholder="Nhập tên tác giả"
                name="author"
                v-model="data.author"
              />
              <ErrorMessage name="author" class="error-feedback" />
            </div>
            <div class="form-group">
              <label for="quantity">Số lượng</label>
              <Field
                type="text"
                class="form-control"
                id="quantity"
                placeholder="Nhập số lượng sách"
                name="quantity"
                v-model="data.quantity"
              />
              <ErrorMessage name="quantity" class="error-feedback" />
            </div>
            <div class="form-group">
              <label for="price">Giá</label>
              <Field
                type="text"
                class="form-control"
                id="price"
                placeholder="Nhập giá tiền"
                name="price"
                v-model="data.price"
              />
              <ErrorMessage name="price" class="error-feedback" />
            </div>
            <div class="form-group">
              <label for="publishYear">Năm xuất bản</label>
              <Field
                type="text"
                class="form-control"
                id="publishYear"
                placeholder="Nhập năm xuất bản"
                name="publishYear"
                v-model="data.publishYear"
              />
              <ErrorMessage name="publishYear" class="error-feedback" />
            </div>
            <div class="form-group">
              <label for="publisher">Nhà xuất bản</label>&nbsp;
              <select
                id="publisher"
                name="publisher"
                v-model="data.publisher"
                class="form-select"
                aria-label="Default select example"
              >
                <option disabled value="">Chọn nhà xuất bản</option>
                <option v-for="item in publishers" :value="item._id">
                  {{ item.name }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <button class="btn btn-primary btn-sm" type="submit">Lưu</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import bar_nav from "../admin_components/bar_nav.vue";
import { Form, Field, ErrorMessage } from "vee-validate";
import bookService from "../../services/books_service";
import publisherService from "../../services/publisher.service";

export default {
  components: {
    bar_nav,
    Form,
    Field,
    ErrorMessage,
  },
  props: {
    book: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      publishers: [],
      data:
        Object.keys(this.book).length > 0
          ? {
              _id: this.book._id,
              name: this.book.name,
              author: this.book.author,
              quantity: this.book.quantity,
              publisher: this.book.publisher,
              price: this.book.price,
              publishYear: this.book.publishYear,
              image: this.book.image,
            }
          : {
              _id: "",
              name: "",
              author: "",
              quantity: "",
              publisher: "",
              price: "",
              publishYear: "",
              image: "",
            },
    };
  },
  methods: {
    async getAll() {
      try {
        this.publishers = await publisherService.getAll();
      } catch (error) {
        console.log(error);
      }
    },
    async handleSubmit() {
      try {
        const { _id, ...newData } = this.data;

        if (!newData.publisher) {
          window.alert("Chưa chọn nhà xuất bản");
          return;
        }

        if (this.book._id) {
          await bookService.update(_id, newData);
        } else {
          await bookService.create(newData);
        }
        this.$router.push("/admin/");
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.getAll();
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
  max-width: 500px;
  width: 100%;
  margin: auto; /* Để căn giữa theo chiều ngang */
}

.book-form {
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

.btn-primary {
  width: 100%;
  font-size: 0.9rem;
}
</style>
