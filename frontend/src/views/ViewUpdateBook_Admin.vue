<template>
  <div class="dashboard">
    <div class="main">
      <p v-if="!loading">
        <book_form :book="book"></book_form>
      </p>
      <p v-if="loading">Không tìm thấy thông tin</p>
    </div>
  </div>
</template>

<script>
import bar_nav from "../components/admin_components/bar_nav.vue";
import book_form from "../components/admin_components/book_form.vue";
import bookService from "../services/books_service";
export default {
  components: {
    bar_nav,
    book_form,
  },
  data() {
    return {
      book: {},
      loading: false,
    };
  },
  methods: {
    async getBookById(id) {
      try {
        this.loading = true;
        const response = await bookService.getById(id);
        this.book = response;
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.getBookById(this.$route.params.id);
  },
};
</script>
