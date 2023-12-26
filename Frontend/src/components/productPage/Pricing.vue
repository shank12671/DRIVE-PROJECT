<template>
  <div class="bg-gradient-to-r from-slate-800 via-sky-700 to-slate-900">
    <div>
      <navbar :userPanel="false"></navbar>
    </div>
    <div class="h-[90vh] flex justify-center items-center">
      <div class="bg-slate-800 bg-opacity-30 rounded-lg text-slate-200 text-5xl p-10">
        <div class="">Not all drives are <span class="text-red-500">paid</span> .</div>
        <div class="mt-10">
            <span class="text-sky-400">P</span>ersonal
            <span class="text-sky-400 ">D</span>rive is <span class="text-green-500">free</span>  to use.
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