<template>
  <div class="dashboard d-flex">
    <bar_nav></bar_nav>
    <div class="main">
      <h3 class="mb-4">Trang quản lý (Mượn sách)</h3>
      <div class="card mb-4">
        <info_user_admin></info_user_admin>
      </div>
      <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center bg-primary text-white">
          <h4 class="card-title mb-0">Thông tin mượn sách</h4>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Tên sách</th>
                  <th scope="col">Người mượn</th>
                  <th scope="col">Ngày mượn</th>
                  <th scope="col">Ngày trả</th>
                  <th scope="col">Chức năng</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in borrowBooks" :key="item._id" class="table-row">
                  <td>{{ item.book.name }}</td>
                  <td>{{ item.reader.username }}</td>
                  <td>{{ formatDate(item.dateOfBorrow) }}</td>
                  <td>{{ formatDate(item.dateOfReturn) }}</td>
                  <td class="text-center">
                    <button class="btn btn-danger btn-sm delete-btn" @click="deleteBorrowBook(item._id)">
                      Xóa
                    </button>
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
import info_user_admin from "../components/admin_components/info_user_admin.vue";
import bar_nav from "../components/admin_components/bar_nav.vue";
import borrowBookService from "../services/borrowBook.service";

export default {
  components: {
    bar_nav,
    info_user_admin,
  },
  data() {
    return {
      borrowBooks: [],
    };
  },
  methods: {
    async getAll() {
      try {
        this.borrowBooks = await borrowBookService.getAll();
      } catch (error) {
        console.error(error);
      }
    },
    async deleteBorrowBook(id) {
      try {
        await borrowBookService.delete(id);
        this.borrowBooks = this.borrowBooks.filter((item) => item._id !== id);
      } catch (error) {
        console.error(error);
      }
    },
    formatDate(date) {
      return new Date(date).toISOString().slice(0, 10);
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
  width: calc(100% - 280px);
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

.table-row:hover {
  background-color: #f2f2f2;
}

.delete-btn {
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>