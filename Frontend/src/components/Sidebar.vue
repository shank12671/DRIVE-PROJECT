<template>
  <div >
    <aside
      class="
        fixed
        top-0
        z-10
        lg:w-[22vw]
        lg:max-w-[15rem]
        md:max-w-[15rem]
        md:w-[28vw]
        sm:w-[35vw]
        h-screen
        dark:text-white
        bg-gray-50
        dark:bg-gray-800
        flex flex-col
        justify-between
      "
      aria-label="Sidebar"
    >
      <div v-if="!settings" class="overflow-y-auto py-4 px-3 mt-20">
        <ul class="space-y-6 mx-2">
          <li>
            <div class="">
              <button
                class="
                  flex
                  justify-between
                  text-xl
                  font-semibold
                  bg-[#2E90F0]
                  p-2
                  rounded
                  select-none
                "
              >
                <p @click="toggleUpload" class="px-6">ADD NEW</p>
                
              </button>

             
            </div>
          </li>
          <li>
            <router-link to="/user" class="mx-4 text-2xl font-semibold" 
              ><span class="pr-2"><i class="fa-solid fa-house-user"></i></span>
              Home</router-link
            >
          </li>
        </ul>
      </div>
      <div
        v-if="!settings"
        class="
          h-[50vh]
          m-2
          bg-slate-600
          rounded-lg
          bg-opacity-30
          flex
          justify-center
          items-center
        "
      >
        <div v-if="!change " class="opacity-60">
          *Click on flies to view details*
        </div>
        <div v-if="change" class="flex flex-col w-full">
          <div class="text-xl m-2">File Details :</div>
          <div class="m-4 flex flex-col space-y-3">
            <div>Name: {{ fileNamee }}</div>
            <div>Size: {{ sizee }} kb</div>
            <div>Date: {{ datee }}</div>
          </div>
        </div>
      </div>
      <div v-if="settings" class="overflow-y-auto py-4 px-3 mt-20">
        <div class="mb-10 text-xl ml-2 font-semibold">
          <div class="p-2" @click="$emit('comp', 'gen')">General</div>
          <!-- <div class="p-2" @click="$emit('comp', 'storage')">Storage</div> -->
        </div>
        <div class="">
          <router-link
            to="/user"
            class="
              mx-4
              text-2xl
              font-semibold
              bg-[#2E90F0]
              py-2
              px-6
              rounded
              select-none
            "
            ><span class="pr-2"><i class="fa-solid fa-house-user"></i></span>
            Home</router-link
          >
        </div>
      </div>
    </aside>
  </div>
</template>

<script>
import { getDetails } from "../service/FileService";

export default {
  props: ["settings", "fileName"],
  data() {
    return {
      show: false,
      file: {},
    };
  },
  computed: {
    change() {
      if (this.fileName) {
        getDetails(this.fileName)
          .then((response) => {
            this.file = {
              name: response.data.file.fileName,
              size: Math.trunc(response.data.file.size / 1024),
              date: response.data.file.date,
            };
            this.show = true;
            console.log(this.file);
          })
          .catch((err) => console.log(err));

        return this.show;
        // }
      }
    },

    sizee() {
      return this.file.size;
    },
    datee() {
      return this.file.date;
    },
    fileNamee() {
      if (this.file.name.length <= 10) {
        return this.file.name;
      }
      return this.file.name.substr(0,15) + " ...";
    },
  },

  methods: {
    toggleUpload() {
      //  this.$emit('uploadToggle')
      this.$router.push({ path: "/user/upload" });
    },
    
  },
};
</script>