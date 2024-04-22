<template>
  <div class="dashboard">
    <div class="main">
      <publisher_form></publisher_form>
    </div>
  </div>
</template>

<script>
import publisher_form from "../components/admin_components/publisher_form.vue";

export default {
  components: {
    publisher_form,
  },
};
</script>
