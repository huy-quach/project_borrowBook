<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <router-link to="/" class="navbar-brand">Ứng dụng Quản lý Mượn Sách</router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
          <form @submit.prevent="handleSearchBook" class="form-inline my-2 my-lg-0" v-if="loggedIn">
            <input type="text" name="search" id="search" autocomplete="off" placeholder="Tìm kiếm"
              class="form-control mr-sm-2" v-model="search" />
            <button type="submit" class="btn btn-outline-light my-2 my-sm-0">Tìm kiếm</button>
          </form>
        </div>
        <div class="collapse navbar-collapse ml-auto" id="navbarNav">
          <ul class="navbar-nav ml-auto">
            <li v-if="!loggedIn" class="nav-item">
              <router-link to="/login" class="btn btn-outline-light">Đăng nhập</router-link>
            </li>
            <li v-if="loggedIn" class="nav-item">
              <router-link to="/" class="nav-link">Trang Chủ</router-link>
            </li>
            <li v-if="loggedIn" class="nav-item">
              <router-link to="/borrow-book" class="nav-link">Sách cho mượn</router-link>
            </li>
            <li v-if="loggedIn" class="nav-item">
              <router-link to="/admin" class="nav-link">Quản lý</router-link>
            </li>
            <li v-if="loggedIn" class="nav-item ml-2">
              <button @click="handleLogout" class="btn btn-outline-light">Đăng xuất</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <!-- Danh sách sách tìm kiếm -->
    <div v-if="loggedIn && books.length > 0" class="list-group search-results">
      <div class="search-header">
        <h5 class="title list-group-item">Danh sách tìm kiếm</h5>
      </div>
      <router-link v-for="item in books" :key="item._id" :to="item._id" class="list-group-item list-group-item-action">
        {{ item.name }} - {{ item.author }} - {{ item.price }}
      </router-link>
    </div>
  </div>
</template>

<script>
import bookService from "../../services/books_service";

export default {
  data() {
    return {
      loggedIn: JSON.parse(localStorage.getItem("user")) ? true : false,
      books: [],
      search: ""
    };
  },
  methods: {
    navigateToLogin() {
      this.$router.push("/login");
    },
    handleLogout() {
      localStorage.removeItem("user");
      this.loggedIn = false;
      this.$router.push("/");
    },
    async handleSearchBook() {
      try {
        const params = new URLSearchParams({ name: this.search });
        const queryString = params.toString();
        if (this.search) {
          this.books = await bookService.getAll(queryString);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style scoped>
.search-results {
  position: absolute;
  background-color: #fff;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  width: calc(100% - 4rem);
  max-height: 200px;
  overflow-y: auto;
  margin-top: 0.5rem;
  margin-left: 2rem;
}

.list-group-item {
  cursor: pointer;
}

.navbar-nav {
  max-height: 50px;
  overflow-y: hidden;
}

.navbar-nav .nav-item {
  margin-right: 10px;
}

.title {
  font-family: 'Roboto', sans-serif;
  font-size: 1.25rem;
  color: #333;
  font-weight: bold;
  margin-bottom: 0;
}
</style>
