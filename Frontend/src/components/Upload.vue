

<template>
  <div class="h-screen bg-slate-500 bg-opacity-50">
    <navbar
      @side="toggleSide"
      :userPanel="true"
      :user="'fixed top-0 z-20'"
    ></navbar>
    <div class="flex">
      <sidebar
        v-if="showSide"
        @toggleUpload="(e) => (uploadMenu = e)"
      ></sidebar>
      <div
        class="
          flex
          justify-center
          w-screen
          h-screen
          items-center
          xl:ml-[30vh]
          lg:ml-[15vw]
          sm:ml-0
        "
      >
        <div
          class="
            flex flex-col
            bg-white
            py-32
            px-48
            bg-opacity-80
            rounded-lg
            border border-gray-200
            shadow-md
            hover:bg-gray-100
          "
        >
          <div class="">
            <label class="mb-4 text-xl font-medium text-gray-900" for="files"
              >Upload multiple files (drag & drop or choose)</label
            >
            <input
              class="
                py-10
                px-5
                mt-4
                w-full
                text-sm text-gray-900
                bg-gray-50
                rounded-lg
                border border-gray-300
                cursor-pointer
                dark:text-gray-400
                focus:outline-none
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
              "
              type="file"
              id="files"
              ref="files"
              multiple
              v-on:change="handleFilesUpload()"
            />
          </div>
          <div class="m-4">
            <div v-if="loading" class="w-full flex justify-center items-center">
              <svg
                aria-hidden="true"
                class="
                  text-center
                  w-8
                  h-8
                  text-gray-200
                  animate-spin
                  dark:text-gray-300
                  fill-blue-600
                "
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                ></path>
              </svg>
              <span class="sr-only">Loading...</span>
            </div>

            <div
              v-if="check == 'true'"
              class="p-5 text-center text-xl font-semibold text-emerald-500"
            >
              Files Uploaded
            </div>
            <div
              v-if="check == 'false'"
              class="p-5 text-center text-xl font-semibold text-red-500"
            >
              Upload Failed.
            </div>
            <div v-if="!loading">
            <div 
              v-for="(file, key) in files"
              class="flex justify-around"
              :key="key"
            >
              {{ file.name }}
              <span class="text-red-600 text-lg" v-on:click="removeFile(key)"
                ><i class="fa-solid fa-square-xmark"></i
              ></span>
            </div>
            </div>
          </div>

          <div class="flex justify-evenly">
            <button
              v-on:click="addFiles()"
              class="
                relative
                inline-flex
                items-center
                justify-center
                p-0.5
                mb-2
                mr-2
                overflow-hidden
                text-sm
                font-medium
                text-gray-900
                rounded-lg
                group
                bg-gradient-to-br
                from-cyan-500
                to-blue-500
                group-hover:from-cyan-500 group-hover:to-blue-500
                hover:text-white
                dark:text-white
                focus:ring-4 focus:outline-none focus:ring-cyan-200
                dark:focus:ring-cyan-800
              "
            >
              <span
                class="
                  relative
                  px-8
                  py-3
                  transition-all
                  ease-in
                  duration-75
                  bg-white
                  dark:bg-slate-800
                  rounded-md
                  group-hover:bg-opacity-0
                "
              >
                Add Files
              </span>
            </button>
            <button
              v-on:click="submitFiles()"
              type="button"
              class="
                text-white
                bg-gradient-to-r
                from-cyan-500
                to-blue-500
                hover:bg-gradient-to-bl
                focus:ring-4 focus:outline-none focus:ring-cyan-300
                dark:focus:ring-cyan-800
                font-medium
                rounded-lg
                text-sm
                px-8
                py-2.5
                text-center
                mr-2
                mb-2
              "
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { upload } from "../service/FileService";
import Sidebar from "./Sidebar.vue";
import Navbar from "./Navbar.vue";

export default {
  components: {
    Sidebar,
    Navbar,
  },
  data() {
    return {
      files: [],
      uploadMenu: false,
      showSide: false,
      success: "",
      loading: false,
    };
  },
  mounted() {
    if (screen.width > 1024) {
      this.showSide = true;
    }
  },
  computed: {
    check() {
      return this.success;
    },
  },
  methods: {
    toggleSide() {
      this.showSide = !this.showSide;
    },
    addFiles() {
      this.$refs.files.click();
    },

    submitFiles() {
      this.loading = true;
      let formData = new FormData();

      for (var i = 0; i < this.files.length; i++) {
        let file = this.files[i];
        formData.append("files", file);
      }

      upload(formData)
        .then((result) => {
          console.log("SUCCESS!!");
          this.success = "true";
          this.loading = "false";
          
          if (result.data) {
            this.$router.push("/user");
          }
        })
        .catch((err) => {
          this.success = "false";
          this.loading = false;

          console.log(err);
        });
    },

    handleFilesUpload() {
      let uploadedFiles = this.$refs.files.files;

      for (var i = 0; i < uploadedFiles.length; i++) {
        this.files.push(uploadedFiles[i]);
      }
    },

    removeFile(key) {
      this.files.splice(key, 1);
    },
  },
};
</script>


