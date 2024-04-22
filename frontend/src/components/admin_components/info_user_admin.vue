<template>
  <div class="info-user-admin">
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">Thông tin</h4>
        <div class="row">
          <div class="col-md-6">
            <p><strong>Email:</strong> {{ user.email }}</p>
          </div>
          <div class="col-md-6">
            <p><strong>Tên người dùng:</strong> {{ user.username }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
    };
  },
};
</script>

<style scoped>
.info-user-admin {
  padding: 20px;
}

.card {
  border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.card-body {
  padding: 30px;
}

.card-title {
  margin-bottom: 20px;
  font-size: 1.5rem;
  font-weight: bold;
}

@media (max-width: 767px) {
  .card-body {
    padding: 20px;
  }
}
</style>
