<template>
  <Header :title="'Novo Cliente'" />
  <div id="addForm">
    <form @submit.prevent="handleAdd">
      <section>
        <div class="form-group">
          <input
            type="text"
            v-model="client.name"
            class="form-control"
            id="name"
            placeholder="Nome"
            required
          />
        </div>

        <div class="form-group">
          <input
            v-mask="'##/##/####'"
            v-model="client.birthdate"
            class="form-control"
            id="birthdate"
            placeholder="Data de Nascimento"
            required
          />
        </div>
      </section>

      <section>
        <div class="form-group">
          <input
            v-mask="'###.###.###-##'"
            v-model="client.cpf"
            class="form-control"
            id="cpf"
            placeholder="CPF"
            required
          />
        </div>

        <div class="form-group">
          <input
            v-mask="'(##) #####-####'"
            v-model="client.phone"
            class="form-control"
            id="phone"
            placeholder="Telefone"
          />
        </div>
      </section>
      <div class="buttons">
        <button type="reset" class="button-cancel" @click="cancelSubmit">
          Cancelar
        </button>
        <button type="submit" class="btn btn-success">Salvar</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import Header from "./Header.vue";

export default {
  components: {
    Header,
  },

  name: "client-add",
  data() {
    return {
      client: {
        name: "",
        cpf: "",
        birthdate: "",
        phone: "",
      },
    };
  },
  methods: {
    handleAdd() {
      this.addClient(this.client);
    },

    addClient(client) {
      const birthdate = client.birthdate.split("/");
      client.birthdate = `${birthdate[2]}-${birthdate[1]}-${birthdate[0]}`;

      axios
        .post("http://localhost:3000/clients", client)
        .then((response) => {
          this.$swal.fire({
            title: "Sucesso!",
            text: "Cliente cadastrado com sucesso!",
            icon: "success",
            confirmButtonText: "Ok",
          });
          this.$router.push("/");
        })
        .catch((error) => {
          this.$swal.fire({
            title: "Erro!",
            text: "Erro ao cadastrar cliente!",
            error,
            icon: "error",
            confirmButtonText: "Ok",
          });
        });
    },

    cancelSubmit() {
      this.client = {
        id: "",
        name: "",
        cpf: "",
        birthdate: "",
        phone: "",
      };
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
#addForm {
  width: 1120px;
  margin: -30px auto;
}
form {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
section {
  width: 49%;
  display: flex;
  flex-flow: column;
}
input {
  height: 60px;
  margin-bottom: 25px;
}
.buttons {
  width: 100%;
  display: flex;
  margin-top: 20px;
  justify-content: flex-end;
  max-width: 1120px;
  margin: 0 auto;
}
.button-cancel {
  background: none;
  border: none;
  font-weight: 600;
  line-height: 28px;
  color: #969cb3;
}
.button-cancel:hover {
  text-decoration: underline;
}
button {
  margin-left: 20px;
}
input::-webkit-input-placeholder {
  color: rgba(0, 0, 0, 0.36);
}
input:-moz-placeholder {
  color: rgba(0, 0, 0, 0.36);
}
input::-moz-placeholder {
  color: rgba(0, 0, 0, 0.36);
}
input:-ms-input-placeholder {
  color: rgba(0, 0, 0, 0.36);
}

/* RESPONSIVE */
@media (max-width: 1120px) {
  #addForm {
    width: 100%;
    margin: 40px 0 0 0;
  }
  section {
    width: 90%;
    margin: 0 auto;
  }
  .buttons {
    justify-content: flex-end;
    margin-right: 20px;
  }
}
</style>
