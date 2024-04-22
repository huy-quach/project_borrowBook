<template>
  <div class="dashboard">
    <div class="main">
      <p v-if="!loading">
        <publisher_form :publisher="publisher"></publisher_form>
      </p>
      <p v-if="loading">Không tìm thấy thông tin nhà xuất bản.</p>
    </div>
  </div>
</template>

<script>
import bar_nav from "../components/admin_components/bar_nav.vue";
import publisher_form from "../components/admin_components/publisher_form.vue";
import publisherService from "../services/publisher.service";

export default {
  components: {
    bar_nav,
    publisher_form,
  },
  data() {
    return {
      publisher: {},
      loading: false,
    };
  },
  methods: {
    async getPublisherById(id) {
      try {
        this.loading = true;
        const response = await publisherService.getById(id);
        this.publisher = response;
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.getPublisherById(this.$route.params.id);
  },
};
</script>
