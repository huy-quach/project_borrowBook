<template>
  <footer class="footer bg-dark text-light py-3">
    <div class="container text-center">
      <router-link to="/" class="footer-link">Trang Chủ</router-link>
      <span class="mx-2">|</span>
      <router-link to="/borrow-book" class="footer-link">Sách</router-link>
      <span class="mx-2">|</span>
      <router-link to="/Login" class="footer-link">Đăng nhập</router-link>
      <p class="mt-2">&copy; {{ currentYear }} Ứng dụng Quản lý Nhà Sách. Bảo lưu mọi quyền.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      currentYear: new Date().getFullYear()
    };
  }
};
</script>

<style scoped>
.footer-link {
  color: #fff;
  text-decoration: none;
  margin: 0 5px;
}

.footer-link:hover {
  text-decoration: underline;
}
</style>
