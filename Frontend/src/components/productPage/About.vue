<template>
  <div class="h-screen bg-gradient-to-r from-slate-800 via-sky-700 to-slate-900">
    
      <div>
        <navbar :userPanel="false"></navbar>
      </div>
      <div class="text-slate-200 m-10 mt-20 font-bold text-5xl">
        About <span class="text-sky-400">P</span>ersonal
        <span class="text-sky-400">D</span>rive :
      </div>
      <div class="flex justify-center items-center">
        <div
          class="
            bg-slate-500
            mx-24
            text-lg
            tracking-wider
            text-slate-200
            bg-opacity-30
            rounded-xl
            p-10
            h-60
          "
        >
          <span class="text-sky-400">P</span>ersonal
          <span class="text-sky-400">D</span>rive is an file storage system,
          which can be accessed through your browser, similar to how Google
          Drive works. <span class="text-sky-400">P</span>ersonal
          <span class="text-sky-400">D</span>rive is built using Node.js,
          Vue.js, Express, MongoDb, TailwindCSS and more.
          <div class="my-5">
            <span class="text-sky-400">P</span>ersonal
            <span class="text-sky-400">D</span>rive supports backend databases
            where you can store file data, and thumbnails (all file info and
            user accounts are stored in mongoDB). The databases supported are
            Filesystem (e.g. the local storage), or just mongoDB.
          </div>
        </div>
      </div>
   
  </div>
</template>
<script>
import Navbar from "../Navbar.vue";
export default {
  components: {
    Navbar,
  },
};
</script>