<template>
  <div class="dashboard">
    <div class="main">
      <book_form></book_form>
    </div>
  </div>
</template>

<script>
import book_form from "../components/admin_components/book_form.vue";
export default {
  components: {
    book_form,
  },
};
</script>
