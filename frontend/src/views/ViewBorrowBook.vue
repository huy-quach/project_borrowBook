<template>
  <div class="view-borrow-books">
    <Nav></Nav>
    <div class="container mt-5">
      <h2 class="text-center mb-4">Danh sách các sách đã cho mượn</h2>
      <div class="row">
        <div class="col-md-4 mb-4" v-for="item in borrowBook" :key="item._id">
          <div class="card border-0 shadow">
            <img :src="item.book.image" class="card-img-top book-image" alt="book" />
            <div class="card-body text-center">
              <h5 class="card-title">{{ item.book.name }}</h5>
              <p class="card-text">Nhà xuất bản: {{ item.book.author }}</p>
              <p class="card-text">Giá tiền: {{ item.book.price }}</p>
              <div class="font-weight-bold">Ngày mượn: {{ formatDate(item.dateOfBorrow) }}</div>
              <div class="font-weight-bold">Ngày trả: {{ formatDate(item.dateOfReturn) }}</div>
              <button class="btn btn-primary mt-2" @click="returnBook(item)">Trả sách</button>
              <span class="early-return-message" v-if="showEarlyReturnMessage(item.dateOfReturn)">Bạn có thể trả sách sớm!</span> <!-- Thêm class cho thông báo -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Nav from "../components/user_components/NavUser.vue";
import Footer from "../components/user_components/Footer.vue";
import borrowBookService from "../services/borrowBook.service";

export default {
  components: {
    Nav,
    Footer,
  },
  data() {
    return {
      borrowBook: [],
    };
  },
  methods: {
    async getAll() {
      try {
        const user_id = JSON.parse(localStorage.getItem("user"))._id;
        const query = { user_id };
        const params = new URLSearchParams(query);
        const queryString = params.toString();
        this.borrowBook = await borrowBookService.getAll(queryString);
      } catch (error) {
        console.log(error);
      }
    },
    async returnBook(item) {
      try {
        await borrowBookService.delete(item._id);
        this.borrowBook = this.borrowBook.filter(i => i._id !== item._id);
      } catch (error) {
        console.log(error);
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString('en-US');
    },
    showEarlyReturnMessage(dateOfReturn) {
      const currentDate = new Date();
      const returnDate = new Date(dateOfReturn);
      return currentDate < returnDate;
    }
  },
  mounted() {
    this.getAll();
  },
};
</script>

<style scoped>
.view-borrow-books {
  min-height: 100vh;
  background-color: #f8f9fa;
  padding-bottom: 50px;
}

.book-image {
  height: 300px;
  object-fit: cover;
}

.card {
  transition: transform 0.3s ease-in-out;
}

.card:hover {
  transform: translateY(-10px);
}

/* CSS cho thông báo trả sách sớm */
.early-return-message {
  display: block;
  margin-top: 10px;
  font-size: 14px;
  color: #28a745; /* Màu xanh lá cây */
  font-weight: bold;
}
</style>
