<template>
  <Header :title="'Clientes'" :button="true" />
  <div id="list">
    <div class="form-group">
      <input
        v-model="inputSearch"
        @input="filteredClients"
        class="form-control search-input"
        id="search"
        placeholder="Digite aqui um nome ou CPF..."
      />
    </div>

    <p v-if="clients.length == 0">Lista de clientes vazia.</p>

    <table v-else class="table">
      <thead>
        <tr class="title-table">
          <th class="th-checkbox">
            <input
              type="checkbox"
              class="checkbox"
              @click="selectAllCheckbox"
            />
          </th>
          <th>NOME</th>
          <th>DATA DE NASCIMENTO</th>
          <th>TELEFONE</th>
          <th style="width: 110px">
            <button
              class="btn btn-sm btn-danger"
              v-show="clientsSelected.length > 0"
              @click="deleteClientsSelected"
            >
              <svg
                style="color: white"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-trash"
                viewBox="0 0 16 16"
              >
                <path
                  d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
                  fill="white"
                ></path>
                <path
                  fill-rule="evenodd"
                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                  fill="white"
                ></path>
              </svg>
              Excluir
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="client in clients" :key="client.id">
          <td>
            <input
              type="checkbox"
              class="checkbox"
              v-model="client.checked"
              :id="'checkbox-' + client.id"
              @click="selectClient(client)"
            />
          </td>

          <td>
            <span class="name">{{ client.name }}</span>
            <br />
            <span class="cpf"></span>{{ client.cpf }}
          </td>

          <td class="birthdate">{{ formatDate(client.birthdate) }}</td>

          <td class="phone">{{ client.phone }}</td>

          <td>
            <button
              class="btn btn-sm btn-success"
              @click="handleUpdate(client)"
            >
              <svg
                width="16"
                height="14"
                viewBox="0 0 16 16"
                fill="currentColor"
                style="display: inline-block; vertical-align: text-bottom"
              >
                <path
                  d="M11.013 1.427a1.75 1.75 0 0 1 2.474 0l1.086 1.086a1.75 1.75 0 0 1 0 2.474l-8.61 8.61c-.21.21-.47.364-.756.445l-3.251.93a.75.75 0 0 1-.927-.928l.929-3.25c.081-.286.235-.547.445-.758l8.61-8.61Zm.176 4.823L9.75 4.81l-6.286 6.287a.253.253 0 0 0-.064.108l-.558 1.953 1.953-.558a.253.253 0 0 0 .108-.064Zm1.238-3.763a.25.25 0 0 0-.354 0L10.811 3.75l1.439 1.44 1.263-1.263a.25.25 0 0 0 0-.354Z"
                ></path>
              </svg>
              Editar
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <paginate
      v-model="page"
      :page-count="Math.ceil(this.allClients.length / 5)"
      :page-range="2"
      :margin-pages="1"
      :click-handler="handlePaginate"
      :prev-text="'<'"
      :next-text="'>'"
      :container-class="'pagination'"
      :page-class="'page-item'"
      :hide-prev-next="true"
    >
    </paginate>
  </div>
</template>

<script>
import axios from "axios";
import Header from "./Header.vue";
import Paginate from "vuejs-paginate-next";

export default {
  components: {
    Header,
    Paginate,
  },

  data() {
    return {
      clients: [{ checked: false }],
      allClients: [],
      updateId: null,
      inputSearch: "",
      clientsSelected: [],
      page: 1,
    };
  },
  methods: {
    handlePaginate(pageNum) {
      axios
        .get(
          "http://localhost:3000/clients?_sort=name&_order=asc&_page=" + pageNum
        )
        .then((response) => {
          this.clients = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    selectClient(client) {
      client.selected = !client.selected;
      if (client.selected) {
        this.clientsSelected.push(client);
      } else {
        this.clientsSelected = this.clientsSelected.filter(
          (clientSelected) => clientSelected.id !== client.id
        );
      }
    },
    selectAllCheckbox() {
      if (this.clientsSelected.length == this.clients.length) {
        this.clientsSelected = [];
        this.clients.forEach((client) => {
          client.checked = false;
        });
      } else {
        this.clientsSelected = this.clients;
        this.clients.forEach((client) => {
          client.checked = true;
        });
      }
    },
    deleteClientsSelected() {
      this.$swal
        .fire({
          title: "Atenção",
          text: "Você tem certeza que quer excluir os cliente(s) selecionado(s)?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#E52E4D",
          confirmButtonText: "Excluir",
          cancelButtonColor: "#999",
          customClass: {
            confirmButton: "btn btn-danger",
            cancelButton: "btn btn-secondary",
          },
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.clientsSelected.forEach((client) => {
              this.deleteClient(client);
            });
          }
        });
    },
    deleteClient(client) {
      axios
        .delete("http://localhost:3000/clients/" + client.id)
        .then((response) => {
          this.clientsSelected = [];
          this.$swal.fire({
            title: "Sucesso!",
            text: "Cliente(s) excluído(s) com sucesso!",
            icon: "success",
            confirmButtonText: "Ok",
          });
          this.getClients();
        })
        .catch((error) => {
          this.$swal.fire({
            title: "Erro!",
            text: "Não foi possível excluir o(s) cliente!",
            error,
            icon: "error",
            confirmButtonText: "Ok",
          });
        });
    },
    handleUpdate(client) {
      this.$router.push({ name: "edit", params: { id: client.id } });
    },
    filteredClients() {
      if (!this.inputSearch) {
        this.getClients();
        return;
      } else {
        axios
          .get("http://localhost:3000/clients?q=" + this.inputSearch)
          .then((response) => {
            this.clients = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    getClients() {
      axios
        .get(
          "http://localhost:3000/clients?_sort=name&_order=asc&_page=1&_limit=5"
        )
        .then((response) => {
          this.clients = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getAllClients() {
      axios
        .get("http://localhost:3000/clients")
        .then((response) => {
          this.allClients = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    formatDate(date) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(date).toLocaleDateString("pt-br", options);
    },
  },
  mounted() {
    this.getClients();
    this.getAllClients();
  },
};
</script>

<style scoped>
#list {
  width: 1120px;
  margin: 50px auto;
}
.title-table {
  background: #f0f2f5;
  border-bottom: 1px solid #f0f2f5;
  height: 60px;
  font-size: 13px;
}
p {
  font-size: 18px;
  color: #969cb3;
}
table {
  border-collapse: separate;
  border-spacing: 0 16px;
  margin-top: -25px;
}
table thread {
  border-bottom: 1px solid #f0f2f5 !important;
}
th {
  border: 0 !important;
}
.checkbox {
  margin: 5px 30px 0 30px;
}
tr {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: #969cb3;
  vertical-align: middle;
  background: white;
  height: 90px;
  border-radius: 5px;
  border-bottom: #f0f2f5;
  border-top: #f0f2f5;
}
td {
  border-style: solid none;
  padding: 10px;
  vertical-align: middle;
  border-top: 0;
}
td:first-child {
  border-left-style: solid;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}
td:nth-child(2) {
  width: 350px;
}
td:last-child {
  border-right-style: solid;
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
}
.name {
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #363f5f;
}
.cpf {
  font-size: 14px;
}
.birthdate {
  font-size: 16px;
}
.search-input {
  width: 100%;
  height: 60px;
  margin: -80px 0 50px 0;
  border: 1px solid #e2e8f0;
}
input::-webkit-input-placeholder {
  color: rgba(0, 0, 0, 0.36);
}
.pagination {
  display: flex;
  justify-content: flex-end;
}
.prev-item {
  background: red !important;
}
.swal2-actions {
  flex-direction: row-reverse !important;
}
.swal2-styled .swal2-cancel {
  background: white !important;
  color: #363f5f !important;
}

/* RESPONSIVE */
@media only screen and (max-width: 900px) {
  #list {
    width: 100%;
    margin: 50px 0;
  }
  #search {
    width: 99%;
    margin: 0 auto;
  }

  table.table {
    width: 100%;
    color: #212529;
    margin-top: -20px;
  }

  .title-table {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
  }

  .th-checkbox,
  th,
  td {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border: 0;
  }
  .btn {
    width: 100%;
  }

  th:first-child,
  th:nth-child(2),
  th:nth-child(3),
  th:nth-child(4) {
    display: none;
  }

  th:nth-child(5) {
    display: contents;
  }
  th:nth-child(5) button {
    width: 99%;
    margin: 0 auto;
  }

  td:first-child {
    width: 40%;
    float: right;
  }
  td:nth-child(2) {
    display: flex;
  }
  td:nth-child(3) {
    display: flex;
    float: left;
    width: 50%;
  }
  td:nth-child(5) {
    width: 50%;
    float: right;
  }
}
</style>
