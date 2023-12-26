<template>
  <div>
    <div
      class="
        lg:px-24 lg:py-24
        md:py-20 md:px-44
        px-4
        py-24
        items-center
        flex
        justify-center
        flex-col-reverse
        lg:flex-row
        md:gap-28
        gap-16
      "
    >
      <div class="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
        <div class="relative">
          <div class="absolute">
            <div class="flex flex-col space-y-8">
              <div class="my-2 text-gray-800 font-bold text-2xl">
                Looks like you've found the doorway to the great nothing
              </div>
              <div class="my-2 text-gray-800">
                Sorry about that! Please visit our hompage to get where you need
                to go.
              </div>
              <div>
                <router-link to="/pd"
                class="
                  sm:w-full
                  lg:w-auto
                  w-1/3
                  my-2
                  border
                  rounded
                  md
                  py-4
                  px-8
                  text-center
                  bg-indigo-600
                  text-white
                  hover:bg-indigo-700
                  focus:outline-none
                  focus:ring-2
                  focus:ring-indigo-700
                  focus:ring-opacity-50
                "
              >
                Take me there!
              </router-link>
              </div>
              
            </div>
          </div>
          <div>
            <img src="https://i.ibb.co/G9DC8S0/404-2.png" />
          </div>
        </div>
      </div>
      <div>
        <img src="https://i.ibb.co/ck1SGFJ/Group.png" />
      </div>
    </div>
  </div>
</template>