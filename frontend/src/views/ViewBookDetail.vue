<template>
  <div class="view-book-detail">
    <Nav></Nav>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-6">
          <div class="book-detail-image mb-4">
            <img :src="book.image" class="img-fluid rounded book-image" alt="book" />
          </div>
        </div>
        <div class="col-md-6">
          <div class="book-detail-info">
            <table class="table table-hover table-bordered">
              <tbody>
                <tr>
                  <th scope="row">Tên sách</th>
                  <td class="book-name">{{ book.name }}</td>
                </tr>
                <tr>
                  <th scope="row">Tác giả</th>
                  <td>{{ book.author }}</td>
                </tr>
                <tr>
                  <th scope="row">Giá</th>
                  <td>{{ book.price }}</td>
                </tr>
                <tr>
                  <th scope="row">Số lượng</th>
                  <td>{{ book.quantity }}</td>
                </tr>
              </tbody>
            </table>
            <form @submit.prevent="borrowBook">
              <div class="form-group">
                <label for="dateOfBorrow">Ngày mượn</label>
                <input type="date" class="form-control" id="dateOfBorrow" v-model="dataOfBorrow.dateOfBorrow" />
              </div>
              <div class="form-group">
                <label for="dateOfReturn">Ngày trả</label>
                <input type="date" class="form-control" id="dateOfReturn" v-model="dataOfBorrow.dateOfReturn" />
              </div>
              <button type="submit" class="btn btn-primary btn-block">Mượn</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Nav from "../components/user_components/NavUser.vue";
import borrowBookService from "../services/borrowBook.service";
import bookService from "../services/books_service";
export default {
  components: {
    Nav,
  },
  data() {
    return {
      book: {},
      dataOfBorrow: {
        dateOfBorrow: new Date().toISOString().slice(0, 10),
        dateOfReturn: new Date().toISOString().slice(0, 10),
      },
    };
  },
  methods: {
    async showBookDetail() {
      try {
        const id = this.$route.params.id;
        this.book = await bookService.getById(id);
      } catch (error) {
        console.log(error);
      }
    },

    async borrowBook() {
      try {
        const id = this.$route.params.id;
        const user_id = JSON.parse(localStorage.getItem("user"))?._id;

        if (!user_id) {
          alert("Bạn cần đăng nhập để mượn sách");
          return;
        }

        const startDate = new Date(this.dataOfBorrow.dateOfBorrow).getTime();
        const endDate = new Date(this.dataOfBorrow.dateOfReturn).getTime();

        if (startDate > endDate) {
          alert("Ngày trả phải sau ngày mượn");
          return;
        }

        await borrowBookService.create({
          reader_id: user_id,
          book_id: id,
          dateOfBorrow: new Date(this.dataOfBorrow.dateOfBorrow).toISOString(),
          dateOfReturn: new Date(this.dataOfBorrow.dateOfReturn).toISOString(),
        });
        this.$router.push("/borrow-book");
      } catch (error) {
        if (error.response.status === 400) {
          alert("Bạn đã mượn sách này rồi");
        }
        console.log({ error });
      }
    },
  },
  mounted() {
    this.showBookDetail();
  },
  watch: {
    $route() {
      this.showBookDetail();
    },
  },
};
</script>

<style scoped>
.view-book-detail {
  background-color: #f8f9fa;
  min-height: 100vh;
}

.book-detail-image img {
  width: 100%;
  transition: transform 0.3s;
}

.book-detail-image:hover img {
  transform: scale(1.1);
}

.book-detail-info .table th {
  width: 30%;
}

.book-detail-info .table th,
.book-detail-info .table td {
  vertical-align: middle;
}

.book-name {
  font-weight: bold;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}
</style>
