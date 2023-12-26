<template>
  <div class=" bg-opacity-50 pb-10">
    <navbar :userPanel="true" @side="toggleSide" :user="style"></navbar>
    <div class="flex">
      <sidebar v-if="showSide" :settings="false" :fileName="file"></sidebar>
      <files @detail="properties" class="mt-28 xl:ml-[30vh] lg:ml-[20vw] sm:ml-0"></files>
    </div>
  </div>
</template>

<script>
import Navbar from "./Navbar.vue";
import Sidebar from "./Sidebar.vue";
import Files from "./Files.vue";
export default {
  components: {
    Navbar,
    Sidebar,
    Files,
  },
  data() {
    return {
      style: "fixed top-0 z-20",
      file: "",
      showSide:false
    };
  },
    mounted() {
        if(screen.width>1024)
        {
            this.showSide=true
            console.log(screen.width,"#####",this.showSide);
        }
    },
  methods: {
    toggleSide(){
        this.showSide =!this.showSide
    },
    properties(e) {
      this.file = e;
    },
  },
};
</script>