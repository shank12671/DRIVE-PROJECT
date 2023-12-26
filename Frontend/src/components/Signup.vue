<template>
  <section class="bg-gradient-to-r from-slate-800 via-sky-700 to-slate-900">
    <div
      class="
        flex flex-col
        items-center
        justify-center
        px-6
        py-8
        mx-auto
        md:h-screen
        lg:py-0
      "
    >
      <router-link
        to="/pd"
        class="
          flex
          items-center
          mb-10
          text-4xl
          font-semibold
          text-gray-900
          dark:text-white
        "
      >
        <span class="text-sky-400 mr-2"
          ><i class="fa-solid fa-cloud-arrow-up"></i
        ></span>
        Personal Drive
      </router-link>
      <div
        class="
          w-full
          bg-white
          rounded-lg
          shadow
          dark:border
          md:mt-0
          sm:max-w-md
          xl:p-0
          dark:bg-gray-800 dark:border-gray-700
        "
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="
              text-xl
              font-bold
              leading-tight
              tracking-tight
              text-gray-900
              md:text-2xl
              dark:text-white
            "
          >
            Create and account
          </h1>
          <div
            v-if="check == 'true'"
            class="p-2 text-center text-xl font-semibold text-emerald-500"
          >
            Signup successfull.
          </div>
          <div
            v-if="check == 'false1'"
            class="p-2 text-center text-xl font-semibold text-red-500"
          >
            Email already exists.
          </div>
          <div
            v-if="check == 'false2'"
            class="p-2 text-center text-xl font-semibold text-red-500"
          >
            Signup Fail.
          </div>
          <form
            @submit="onSubmit"
            class="space-y-4 md:space-y-6 flex flex-col items-center"
            action="#"
          >
            <div class="w-full">
              <label
                for="full-name"
                class="
                  block
                  mb-2
                  text-sm
                  font-medium
                  text-gray-900
                  dark:text-white
                "
                >Full Name</label
              >
              <input
                v-model="fullName"
                type="text"
                placeholder="Full Name"
                class="
                  bg-gray-50
                  border border-gray-300
                  text-gray-900
                  sm:text-sm
                  rounded-lg
                  focus:ring-primary-600 focus:border-primary-600
                  block
                  w-full
                  p-2.5
                  dark:bg-gray-700
                  dark:border-gray-600
                  dark:placeholder-gray-400
                  dark:text-white
                  dark:focus:ring-blue-500
                  dark:focus:border-blue-500
                "
                required=""
              />
            </div>
            <div class="w-full">
              <label
                for="email"
                class="
                  block
                  mb-2
                  text-sm
                  font-medium
                  text-gray-900
                  dark:text-white
                "
                >Your email</label
              >
              <input
                v-model="email"
                type="email"
                class="
                  bg-gray-50
                  border border-gray-300
                  text-gray-900
                  sm:text-sm
                  rounded-lg
                  focus:ring-primary-600 focus:border-primary-600
                  block
                  w-full
                  p-2.5
                  dark:bg-gray-700
                  dark:border-gray-600
                  dark:placeholder-gray-400
                  dark:text-white
                  dark:focus:ring-blue-500
                  dark:focus:border-blue-500
                "
                placeholder="name@company.com"
                required=""
              />
            </div>
            <div class="w-full">
              <label
                for="password"
                class="
                  block
                  mb-2
                  text-sm
                  font-medium
                  text-gray-900
                  dark:text-white
                "
                >Password</label
              >
              <input
                v-model="password"
                type="password"
                placeholder="••••••••"
                class="
                  bg-gray-50
                  border border-gray-300
                  text-gray-900
                  sm:text-sm
                  rounded-lg
                  focus:ring-primary-600 focus:border-primary-600
                  block
                  w-full
                  p-2.5
                  dark:bg-gray-700
                  dark:border-gray-600
                  dark:placeholder-gray-400
                  dark:text-white
                  dark:focus:ring-blue-500
                  dark:focus:border-blue-500
                "
                required=""
              />
            </div>

            <button
              @click.prevent="register"
              type="submit"
              class="
                
                w-2/4
                text-white
                bg-primary-600
                hover:bg-primary-700
                focus:ring-4 focus:outline-none focus:ring-primary-300
                font-medium
                rounded-lg
                text-sm
                
                py-2.5
                text-center
                dark:bg-primary-600
                dark:hover:bg-primary-700
                dark:focus:ring-primary-800
              "
            >
              <div v-if="!loading">Create an account</div>
              <div v-if="loading" >
                <svg
                  aria-hidden="true"
                  class=" ml-20
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
            </button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account?
              <router-link
                to="/login"
                class="
                  font-medium
                  text-primary-600
                  hover:underline
                  dark:text-primary-500
                "
                >Login here</router-link
              >
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
    
<script>
import { signup } from "../service/UserService";

export default {
  data() {
    return {
      fullName: "",
      email: "",
      password: "",
      success: "",
      loading: false,
    };
  },
  computed: {
    check() {
      return this.success;
    },
  },
  methods: {
    register() {
      this.loading = true;

      signup(this.fullName, this.email, this.password)
        .then((response) => {
          if (response.data) {
            this.loading = false;

            this.success = "true";
            this.$router.push("/login");
          }
        })
        .catch((err) => {
          this.loading = false;
          if (err.response.data.Message =="Email already exists.") {
            this.success = "false1";
          }
          else
          this.success = "false2";

          console.log(err);
        });
    },
  },
};
</script>
