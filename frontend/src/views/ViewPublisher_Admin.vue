<template>
  <div class="dashboard d-flex">
    <bar_nav></bar_nav>
    <div class="main">
      <h3 class="mb-4">Trang quản lý (Nhà xuất bản)</h3>
      <div class="card mb-4">
        <info_user_admin></info_user_admin>
      </div>
      <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h4 class="card-title mb-0">Thông tin nhà xuất bản</h4>
          <button class="btn btn-primary" @click="navigateToCreatePublisher">Thêm mới</button>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table custom-table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Nhà xuất bản</th>
                  <th scope="col">Địa chỉ</th>
                  <th scope="col">Chức năng</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in publishers" :key="item._id" class="table-row">
                  <td>{{ item._id }}</td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.address }}</td>
                  <td>
                    <div class="btn-group" role="group">
                      <button type="button" class="btn btn-primary" @click="navigateToUpdatePublisher(item._id)">Sửa</button>
                      <button type="button" class="btn btn-danger" @click="deletePublisher(item._id)">Xóa</button>
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
import publisherService from "../services/publisher.service";
import info_user_admin from "../components/admin_components/info_user_admin.vue";
export default {
  components: {
    bar_nav,
    info_user_admin,
  },
  data() {
    return {
      publishers: [],
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
    async deletePublisher(id) {
      try {
        await publisherService.delete(id);
        this.publishers = this.publishers.filter((item) => item._id !== id);
      } catch (error) {
        console.log(error);
      }
    },
    navigateToCreatePublisher() {
      this.$router.push("/admin/publisher/create");
    },
    navigateToUpdatePublisher(id) {
      this.$router.push("/admin/publisher/" + id);
    },
  },
  mounted() {
    this.getAll();
  },
};
</script>

<style scoped>
.dashboard {
  display: flex; /* Sử dụng Flexbox */
  height: 100%; /* Đảm bảo layout mở rộng đến cuối của viewport */
}

.main {
  padding: 20px;
  flex: 1; /* Phần nội dung sẽ mở rộng để lấp đầy phần còn lại của flex container */
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

/* Style cho bảng */
.custom-table {
  width: 100%;
  border-collapse: collapse;
}

.custom-table th,
.custom-table td {
  padding: 15px 20px;
  text-align: left;
  border-bottom: 1px solid #dee2e6;
}

.custom-table th {
  background-color: #f8f9fa;
  font-weight: bold;
}

.custom-table td:last-child {
  white-space: nowrap;
}

/* Hover effect */
.table-row:hover {
  background-color: #f0f0f0;
}

/* Button style */
.btn-group button {
  margin-right: 5px;
}
.main {
  padding: 20px;
  width: calc(100% - 280px); /* Trừ đi kích thước của bar_nav */
  margin-bottom: 0; /* Loại bỏ khoảng trắng dư phía dưới */
}


</style>
