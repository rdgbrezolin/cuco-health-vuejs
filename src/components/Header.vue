<template>
  <header class="header">
    <section>
      <div class="top-header">
        <img
          src="../assets/logo.png"
          alt="Logo Cuco Health"
          @click="this.$router.push('/')"
        />
        <router-link :to="{ name: 'add' }">
          <button v-show="button" class="btn btn-primary">Novo cliente</button>
        </router-link>
      </div>
      <h1>{{ title }}</h1>
    </section>
  </header>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    button: {
      type: Boolean,
    },
  },
};
</script>

<style scoped>
.header {
  min-width: 100%;
  background: #2095f2;
  height: 300px;
  padding: 30px 0;
}
img {
  width: 200px;
}
img:hover {
  cursor: pointer;
}
section {
  width: 1120px;
  margin: 0 auto;
}
h1 {
  color: #fff;
  font-size: 50px;
  font-weight: 700;
  margin-top: 60px;
}
button {
  background: #ed5579;
  color: white;
  border: none;
  padding: 8px 25px;
}
button:hover {
  transition: 0.7;
  opacity: 0.95;
  background: #ed5579;
}
.top-header {
  color: #fff;
  font-size: 30px;
  font-weight: 700;
  display: flex;
  justify-content: space-between;
}

/* RESPONSIVE */
@media only screen and (max-width: 1120px) {
  .header {
    height: 250px;
  }
  section {
    width: 100%;
    padding: 0 20px;
  }
  h1 {
    font-size: 40px;
    margin-top: 30px;
  }
  button {
    padding: 8px 15px;
  }
  .top-header {
    font-size: 20px;
  }
}
</style>
