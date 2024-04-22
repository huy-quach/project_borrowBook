<template>
  <div class="dashboard d-flex">
    <bar_nav></bar_nav>
    <div class="main">
      <h3 class="mb-4">Trang quản lý (Sách)</h3>
      <div class="card mb-4">
        <info_user_admin></info_user_admin>
      </div>
      <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h4 class="card-title mb-0">Thông tin sách</h4>
          <button class="btn btn-primary" @click="navigateToCreateBook">Thêm mới</button>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Tên sách</th>
                  <th scope="col">Tác giả</th>
                  <th scope="col">Nhà xuất bản</th>
                  <th scope="col">Số lượng</th>
                  <th scope="col">Giá tiền</th>
                  <th scope="col">Chức năng</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in books" :key="item._id">
                  <th scope="row">{{ item.name  }}</th>
                  <td>{{ item.author }}</td>
                  <td>{{ item.publisher }}</td>
                  <td>{{ item.quantity }}</td>
                  <td>{{ item.price }}</td>
                  <td>
                    <div class="d-flex align-items-center">
                      <button class="btn btn-primary btn-sm mr-2" @click="navigateToUpdateBook(item._id)">Sửa</button>
                      <button class="btn btn-danger btn-sm" @click="deleteBook(item._id)">Xóa</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bar_nav from "../components/admin_components/bar_nav.vue";
import bookService from "../services/books_service";
import info_user_admin from "../components/admin_components/info_user_admin.vue";
export default {
  components: {
    bar_nav,
    info_user_admin,
  },
  data() {
    return {
      books: [],
    };
  },
  methods: {
    async getAll() {
      try {
        this.books = await bookService.getAll();
      } catch (error) {
        console.log(error);
      }
    },
    async deleteBook(id) {
      try {
        await bookService.delete(id);
        this.books = this.books.filter((item) => item._id !== id);
      } catch (error) {
        console.log(error);
      }
    },
    navigateToCreateBook() {
      this.$router.push("/admin/book/create");
    },
    navigateToUpdateBook(id) {
      this.$router.push("/admin/book/" + id);
    },
  },
  mounted() {
    this.getAll();
  },
};
</script>

<style scoped>
.dashboard {
  height: 100%;
}

.main {
  padding: 20px;
  width: calc(100% - 280px); /* Trừ đi kích thước của bar_nav */
}

.card {
  margin-bottom: 20px;
}

.card-header {
  background-color: #f8f9fa;
}

.card-header h4 {
  margin-bottom: 0;
}

.card-body {
  padding: 20px;
}

.table-responsive {
  overflow-x: auto;
}

.btn-sm {
  font-size: 0.9rem;
}
</style>
