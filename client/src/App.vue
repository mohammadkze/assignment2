<template>
  <div class="bg-gray-100 h-screen">
    <div class="flex items-center justify-center" style="cursor: pointer">
      <el-button
        size="large"
        @click="setShow(1)"
        type="primary"
        class="m-2 mt-5 px-5 py-2 bg-sky-400 hover:bg-sky-500 rounded"
      >
        <span class="text-white text-base">add person</span>
      </el-button>
      <el-button
        size="large"
        @click="setShow(2)"
        type="primary"
        class="m-2 mt-5 px-5 py-2 bg-sky-400 hover:bg-sky-500 rounded"
      >
        <span class="text-white text-base">get person</span>
      </el-button>
      <el-button
        size="large"
        type="primary"
        class="m-2 mt-5 px-5 py-2 bg-sky-400 hover:bg-sky-500 rounded"
        @click="getAllPerson"
      >
        <span class="text-white text-base">get all person</span>
      </el-button>
      <el-button
        size="large"
        type="primary"
        class="m-2 mt-5 px-5 py-2 bg-sky-400 hover:bg-sky-500 rounded"
        @click="getRandomString"
      >
        <span class="text-white text-base">checksum</span>
      </el-button>
      <el-button
        @click="setShow(3)"
        size="large"
        type="primary"
        class="m-2 mt-5 px-5 py-2 bg-sky-400 hover:bg-sky-500 rounded"
      >
        <span class="text-white text-base">delete person</span>
      </el-button>
    </div>
    <div class="flex flex-col items-center" v-if="show == 1">
      <div class="mb-6">
        <label for="name" class="mb-2 text-sm font-mediu">name</label>
        <input
          type="text"
          id="name"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          v-model="addName"
        />
      </div>
      <div class="mb-6">
        <label for="family" class="mb-2 text-sm font-mediu">family</label>
        <input
          type="text"
          id="family"
          v-model="addFamily"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <el-button
        size="large"
        class="m-2 mt-5 px-5 py-2 bg-lime-400 hover:bg-lime-400 rounded"
        @click="addPerson(addName, addFamily)"
      >
        <span class="text-white text-base">add</span>
      </el-button>
    </div>
    <div class="flex flex-col items-center" v-else-if="show == 2">
      <div class="mb-6">
        <label for="id" class="mb-2 text-sm font-mediu">person id</label>
        <input
          type="text"
          id="id"
          v-model="personID"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <el-button
        size="large"
        class="m-2 mt-5 px-5 py-2 bg-lime-400 hover:bg-lime-400 rounded"
        @click="getPerson(personID)"
      >
        <span class="text-white text-base">find person</span>
      </el-button>
    </div>
    <div class="flex flex-col items-center" v-else-if="show == 3">
      <div class="mb-6">
        <label for="id" class="mb-2 text-sm font-mediu">person id</label>
        <input
          type="text"
          id="id"
          v-model="personID"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <el-button
        size="large"
        class="m-2 mt-5 px-5 py-2 bg-lime-400 hover:bg-lime-400 rounded"
        @click="deletePerson(personID)"
      >
        <span class="text-white text-base">delete person</span>
      </el-button>
    </div>
    <div class="flex items-center justify-center">
      <el-table class="mt-12 mr-5 ml-5" height="250" :data="tableData" stripe>
        <el-table-column prop="family" label="family" />
        <el-table-column prop="name" label="Name" />
        <el-table-column prop="personId" label="person id" />
      </el-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { ElNotification } from "element-plus";
import axios from "axios";
import utilTest from "@/util/randomdata";
import md5 from "md5";

const show: any = ref(0);

const addName = ref("");
const addFamily = ref("");
const personID: any = ref("");
const tableData: any = ref([]);
const random: any = ref("");
const csData: any = ref("");

const server = ref(import.meta.env.VITE_APP_SERVER);
onMounted(() => {
  getAllPerson();
  getRandomString();
});
const addPerson = async (name: String, family: String) => {
  if (name.trim().length == 0 || family.trim().length == 0) {
    ElNotification.warning({
      title: "Error",
      message: "both name and family required",
      showClose: true,
    });
  } else {
    let result = {
      firstName: name,
      lastName: family,
    };
    await axios
      .post(`${server.value}/add-person`, result)
      .then(function (response) {
        ElNotification.success({
          title: "info",
          message: "added person",
          showClose: true,
        });
        getAllPerson();
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        ElNotification.error({
          title: "info",
          message: "error when added person",
          showClose: true,
        });
      });
  }
  addName.value = "";
  addFamily.value = "";
};
const getPerson = async (personId: String) => {
  let result = { personId };
  await axios
    .post(`${server.value}/get-person-by-id`, result)
    .then(function (response) {
      if (response.data.length == 0) {
        ElNotification.warning({
          title: "warn",
          message: "there is no person with this id",
          showClose: true,
        });
      } else {
        ElNotification.success({
          title: "info",
          message: "person get from server",
          showClose: true,
        });
      }
      tableData.value = [{ ...response.data }];
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      ElNotification.error({
        title: "info",
        message: "error when find person",
        showClose: true,
      });
    });
  personID.value = "";
};

const getAllPerson = async () => {
  await axios
    .get(`${server.value}/get-all-persons`)
    .then(function (response) {
      tableData.value = response.data;
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      ElNotification.error({
        title: "info",
        message: "error when find all person",
        showClose: true,
      });
    });
};
const getRandomString = async () => {
  await axios
    .get(`${server.value}/random-string`)
    .then(async function (response) {
      let { randomData, cs } = response.data;
      if (random.value == "") {
        random.value = randomData;
        csData.value = cs;
        ElNotification.success({
          title: "info",
          message: "checksum write",
          showClose: true,
        });
        console.log(random);
      } else {
        let createCS = md5(random.value);
        console.log("createCS: ", createCS);
        if (createCS == csData.value) {
          ElNotification.success({
            title: "info",
            message: "checksum correct",
            showClose: true,
          });
        } else {
          ElNotification.error({
            title: "error",
            message: "checksum error",
            showClose: true,
          });
        }
      }
      // fs.writeFile("../../clientdata/random.txt", "foo").then(function () {
      //   console.log("done", res);
      // });
      // console.log(randomData);
      // console.log(cs);
      // let result = await utilTest.csTest(randomData, cs);
      // if (result == "true") {
      //   ElNotification.success({
      //     title: "info",
      //     message: "checksum correct",
      //     showClose: true,
      //   });
      // } else if (result == "false") {
      //   ElNotification.error({
      //     title: "info",
      //     message: "checksum incorrect",
      //     showClose: true,
      //   });
      // } else if (result == "write") {
      //   ElNotification.success({
      //     title: "info",
      //     message: "checksum write",
      //     showClose: true,
      //   });
      // } else {
      //   ElNotification.error({
      //     title: "error",
      //     message: "checksum error",
      //     showClose: true,
      //   });
      // }

      // console.log("result", result);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      ElNotification.error({
        title: "info",
        message: "error when check sum test",
        showClose: true,
      });
    });
};
const deletePerson = async (personId: String) => {
  let result = { personId };
  await axios
    .delete(`${server.value}/delete-by-id`, { data: result })
    .then(function (response) {
      ElNotification.success({
        title: "info",
        message: "person delete from server",
        showClose: true,
      });
      tableData.value = [{ ...response.data }];
      getAllPerson();
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      ElNotification.error({
        title: "info",
        message: "error when find person",
        showClose: true,
      });
    });
  personID.value = "";
};
const setShow = (state: Number) => {
  show.value = state;
};
</script>

<style>
@font-face {
  font-family: "Qs_Iranyekan light";
  src: local("Qs_Iranyekan light"),
    url("./assets/fonts/Qs_Iranyekan light.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}
* {
  font-family: "Qs_Iranyekan light";
}
body {
  -webkit-tap-highlight-color: transparent;
  direction: rtl;
  text-decoration: rtl;
}
</style>
