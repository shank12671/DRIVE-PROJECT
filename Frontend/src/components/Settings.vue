<template>
  <div>
    <navbar @side="toggleSide" :userPanel="true" :user="style"></navbar>
    <div class="top-0">
      <sidebar v-if="showSide" :settings="true" @comp="(e) => (temp = e)"></sidebar>
    </div>
    <div class="mt-18 xl:ml-[30vh] lg:ml-[15vw] sm:ml-0">
      <div v-if="temp == 'gen'">
        <div class="bg-gray-200 h-screen pt-2 my-16">
          <div class="container mx-auto">
            <div class="inputs w-full max-w-2xl p-6 mx-auto">
              <h2 class="text-2xl text-gray-900">Account Setting</h2>
              <form class="mt-6 border-t border-gray-400 pt-4">
                <div class="flex flex-wrap -mx-3 mb-6">
                  <div class="w-full md:w-full px-3 mb-6">
                    <label
                      class="
                        block
                        uppercase
                        tracking-wide
                        text-gray-700 text-xs
                        font-bold
                        mb-2
                      "
                      for="grid-text-1"
                      >email address</label
                    >
                    <input v-model="email"
                      class="
                        appearance-none
                        block
                        w-full
                        bg-white
                        text-gray-700
                        border border-gray-400
                        shadow-inner
                        rounded-md
                        py-3
                        px-4
                        leading-tight
                        focus:outline-none focus:border-gray-500
                      "
                      id="grid-text-1"
                      type="text"
                      placeholder="Enter email"
                      required
                    />
                  </div>
                  <div class="w-full md:w-full px-3 mb-6">
                    <label
                      class="
                        block
                        uppercase
                        tracking-wide
                        text-gray-700 text-xs
                        font-bold
                        mb-2
                      "
                      >password</label
                    >
                    <button @click="()=>{toggle=!toggle}"
                      class="
                        appearance-none
                        bg-gray-200
                        text-gray-900
                        px-2
                        py-1
                        shadow-sm
                        border border-gray-400
                        rounded-md
                      "
                    >
                      change your password
                    </button>
                  </div>
                    <div v-if="toggle && email" class="flex w-full space-x-10 mx-4 mb-5">
                        <input v-model="passOld"
                          class="
                            appearance-none
                            block
                            w-full
                            bg-white
                            text-gray-700
                            border border-gray-400
                            shadow-inner
                            rounded-md
                            py-3
                            px-4
                            leading-tight
                            focus:outline-none focus:border-gray-500
                          "
                          placeholder="Old Password"
                          type="password"
                          required
                        />
                        <input v-model="passNew"
                          class="
                            appearance-none
                            block
                            w-full
                            bg-white
                            text-gray-700
                            border border-gray-400
                            shadow-inner
                            rounded-md
                            py-3
                            px-4
                            leading-tight
                            focus:outline-none focus:border-gray-500
                          "
                          placeholder="New Password"
                          type="password"
                          required
                        />
                    </div>
                  <div class="personal w-full border-t border-gray-400 pt-4">
                    <h2 class="text-2xl text-gray-900">Personal info:</h2>
                    <div class="flex items-center justify-between mt-4">
                      <div class="w-full md:w-1/2 px-3 mb-6">
                        <label
                          class="
                            block
                            uppercase
                            tracking-wide
                            text-gray-700 text-xs
                            font-bold
                            mb-2
                          "
                          >Full name</label
                        >
                        <input v-model="fullName"
                          class="
                            appearance-none
                            block
                            w-full
                            bg-white
                            text-gray-700
                            border border-gray-400
                            shadow-inner
                            rounded-md
                            py-3
                            px-4
                            leading-tight
                            focus:outline-none focus:border-gray-500
                          "
                          type="text"
                          
                        />
                      </div>
                    </div>

                    <div class="flex justify-end">
                      <button @click="updateDetails"
                        class="
                          appearance-none
                          bg-gray-200
                          text-gray-900
                          px-2
                          py-1
                          shadow-sm
                          border border-gray-400
                          rounded-md
                          mr-3
                        "
                        type="submit"
                      >
                        save changes
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>
<script>
import { update } from "../service/UserService";
import Navbar from "./Navbar.vue";
import Sidebar from "./Sidebar.vue";
export default {
  components: {
    Navbar,
    Sidebar,
  },
  data() {
    return {
      style: "fixed top-0 z-20",
      temp: "gen",
      showSide:false,
      toggle:false,
      email:'',
      fullName:'',
      password:'',
      passOld:''
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
    updateDetails(){
        update(this.fullName, this.email, this.password,this.passOld)
        .then((result)=>{
            sessionStorage.clear();
            this.$router.push("/login");
        })
        .catch(err => console.log(err))
    }
  }
};
</script>