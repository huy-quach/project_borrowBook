<template>
  <aside class="sidebar">
    <div class="sidebar-content">
      <div class="text-center py-4 mb-4">
        <div class="admin-logo">Admin</div>
      </div>
      <ul class="list-unstyled mb-0">
        <li class="sidebar-item" @click="navigateToViewHome">Trang chủ</li>
        <li class="sidebar-item" @click="navigateToManageBook">Quản lý sách</li>
        <li class="sidebar-item" @click="navigateToManagePublisher">Nhà xuất bản</li>
        <li class="sidebar-item" @click="navigateToManageBorrowBook">Mượn sách</li>
      </ul>
    </div>
    <div class="text-center pb-4">Phiên bản 2.0</div>
  </aside>
</template>

<script>
export default {
  methods: {
    navigateToViewHome() {
      this.$router.push("/");
    },
    navigateToManageBook() {
      this.$router.push("/admin");
    },
    navigateToManagePublisher() {
      this.$router.push("/admin/publisher");
    },
    navigateToManageBorrowBook() {
      this.$router.push("/admin/borrow-book");
    },
  },
};
</script>

<style scoped>
.sidebar {
  background-color: #34495e;
  color: #fff;
  width: 280px;
  display: flex;
  flex-direction: column;
  height: calc(150vh - 20px); /* Đảm bảo sidebar mở rộng đến cuối của viewport, trừ đi khoảng cách dưới của main */
}

.sidebar-content {
  flex-grow: 10; /* bar_nav mở rộng đến hết chiều cao còn lại */
}

.admin-logo {
  font-size: 30px;
  font-weight: bold;
}

.sidebar-item {
  padding: 20px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 20px;
}

.sidebar-item:hover {
  background-color: #2c3e50;
}

.sidebar::before {
  content: "";
  flex-grow: 1;
}
</style>
