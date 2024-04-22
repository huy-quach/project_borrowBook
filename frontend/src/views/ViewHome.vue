<template>
  <div>
    <Nav></Nav>
    <Home></Home>
    <h3 class="mt-4 ml-3 text-center">Danh sách các quyển sách</h3>
    <div class="container mt-4">
      <div class="row">
        <div class="col-lg-4 col-md-6 mb-4" v-for="item in books" :key="item._id" @click="navigateToBook(item._id)">
          <div class="card h-100">
            <img :src="item.image" class="card-img-top" alt="book" />
            <div class="card-body">
              <h5 class="card-title">{{ item.name }}</h5>
              <p class="card-text">Nhà xuất bản: {{ item.author }}</p>
              <p class="card-text">Giá tiền: {{ item.price }}</p>
            </div>
            <div class="card-footer">
              <button class="btn btn-primary btn-block" @click="navigateToBook(item._id)">Mượn sách</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Home from "../components/user_components/Home.vue";
import Nav from "../components/user_components/NavUser.vue";
import Footer from "../components/user_components/Footer.vue";
import bookService from "../services/books_service";

export default {
  components: {
    Home,
    Nav,
    Footer,
  },
  data() {
    return {
      books: [],
    };
  },
  methods: {
    async showAllHome() {
      try {
        this.books = await bookService.getAll();
      } catch (error) {
        console.log(error);
      }
    },
    navigateToBook(id) {
      this.$router.push("/" + id);
    },
  },
  mounted() {
    this.showAllHome();
  },
};
</script>

<style scoped>
.card {
  transition: transform 0.2s;
  border: 1px solid #dee2e6;
  border-radius: 8px;
}

.card:hover {
  transform: translateY(-5px);
}

.card-img-top {
  border-radius: 8px 8px 0 0;
}

.card-body {
  border-radius: 0 0 8px 8px;
}

.card-footer {
  background-color: #f8f9fa;
  border-top: 1px solid #dee2e6;
  border-radius: 0 0 8px 8px;
}
</style>
