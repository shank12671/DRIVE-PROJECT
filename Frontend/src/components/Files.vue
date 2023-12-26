<template>
  <div
    :class="
      empty
        ? ''
        : 'w-screen grid xl:grid-cols-6 lg:grid-cols-4  md:grid-cols-4 sm:grid-cols-3 gap-y-10'
    "
  >
    <div class="" v-for="file in allFiles" :key="file._id">
      <file-cards
        @details="fileDetails"
        @delete-file="(e) => deleteFiles(e)"
        :type="file.fileName.split('.').pop()"
        :name="file.fileName"
      ></file-cards>
    </div>
    <div v-if="loading" class="w-screen h-[60vh] mt-48 xl:ml-[56vh] lg:ml-[20vw] md:ml-[36vw] sm:ml-0 justify-center items-center">
      <div 
        class=" 
          loader
          ease-linear
          rounded-full
          border-8 border-t-8 border-gray-200
          h-32
          w-32
        "
      ></div>
    </div>
  </div>
</template>

<script>
import FileCards from "./FileCards.vue";
import { files } from "../service/UserService";
import { delete_file } from "../service/FileService";

export default {
  components: {
    FileCards,
  },
  data() {
    return {
      allFiles: [],
      empty: false,
      loading: true,
    };
  },
  mounted() {
    this.fetchFiles();
  },
  methods: {
    fileDetails(e) {
      this.$emit("detail", e);
    },
    fetchFiles() {
      files(sessionStorage.getItem("id"), sessionStorage.getItem("auth_token"))
        .then((response) => {
          this.allFiles = response.data.user;
          if (this.allFiles.length < 1) {
            this.empty = true;
            this.$router.push("/user/upload");
          }
          this.loading = false;
        })
        .catch((err) => {
          console.log(err, "@@@@@@@@@@@@@@");
        });
    },
    deleteFiles(name) {
      delete_file(name)
        .then((result) => {
          this.fetchFiles();
        })
        .catch((err) => console.log(err, "##########"));
    },
  },
};
</script>

<style scoped>

.loader {
  border-top-color: #3498db;
  -webkit-animation: spinner 1.5s linear infinite;
  animation: spinner 1.5s linear infinite;
}

@-webkit-keyframes spinner {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spinner {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
