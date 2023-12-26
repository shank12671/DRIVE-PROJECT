<template>
  <div>
    <!-- image files -->
    <div
      class="flex flex-col justify-center items-center"
      v-if="
        type === 'jpg' ||
        type === 'jpeg' ||
        type === 'png' ||
        type === 'svg' ||
        type === 'svg' ||
        type === 'dng' ||
        type === 'gif'
      "
    >
      <div @click="toggleDetails" class="relative" :class="style">
        <i
          @click="$emit('deleteFile', name)"
          class="
            text-xl text-slate-800
            opacity-60
            absolute
            top-0
            right-2
            fa-solid fa-trash-can
            hover:text-slate-500
          "
        ></i>
        <a :href="path" download >
          <i
          class="
            text-xl text-slate-800
            opacity-60
            absolute
            top-0
            left-2
            hover:text-slate-500
            fa-solid fa-download
          "
        ></i>

        </a>
        
        <i class="text-emerald-600 fa-solid fa-file-image"></i>
      </div>
      <div @click="toggleDetails">
        {{ fileName() }}
      </div>
    </div>

    <!-- pdf  -->

    <div
      class="flex flex-col justify-center items-center"
      v-else-if="type === 'pdf'"
    >
      <div @click="toggleDetails" class="relative" :class="style">
        <i
          @click="$emit('deleteFile', name)"
          class="
            text-xl text-slate-800
            opacity-60
            absolute
            top-0
            right-2
            fa-solid fa-trash-can
          "
        ></i>
        <a :href="path" download>
          <i
          class="
            text-xl text-slate-800
            opacity-60
            absolute
            top-0
            left-2
            hover:text-slate-500
            fa-solid fa-download
          "
        ></i>

        </a>
        
        <i class="text-rose-600 fa-solid fa-file-pdf"></i>
      </div>
      <div @click="toggleDetails">
        {{ fileName() }}
      </div>
    </div>

    <!-- excel file  -->

    <div
      class="flex flex-col justify-center items-center"
      v-else-if="type === 'xlsx'"
    >
      <div @click="toggleDetails" class="relative" :class="style">
        <i
          @click="$emit('deleteFile', name)"
          class="
            text-xl text-slate-800
            opacity-60
            absolute
            top-0
            right-2
            fa-solid fa-trash-can
          "
        ></i>
        <a :href="path" download>
          <i
          class="
            text-xl text-slate-800
            opacity-60
            absolute
            top-0
            left-2
            hover:text-slate-500
            fa-solid fa-download
          "
        ></i>

        </a>
        
        <i class="text-yellow-400 fa-solid fa-file-excel"></i>
      </div>
      <div @click="toggleDetails">
        {{ fileName() }}
      </div>
    </div>

    <!-- text files -->

    <div
      class="flex flex-col justify-center items-center"
      v-else-if="
        type === 'txt' || type === 'doc' || type === 'docx' || type === 'DOCX'
      "
    >
      <div @click="toggleDetails" class="relative" :class="style">
        <i
          @click="$emit('deleteFile', name)"
          class="
            text-xl text-slate-800
            opacity-60
            absolute
            top-0
            right-2
            fa-solid fa-trash-can
          "
        ></i>
        <a :href="path" download>
          <i
          class="
            text-xl text-slate-800
            opacity-60
            absolute
            top-0
            left-2
            hover:text-slate-500
            fa-solid fa-download
          "
        ></i>

        </a>
        
        <i class="text-orange-500 fa-solid fa-file-word"></i>
      </div>
      <div @click="toggleDetails">
        {{ fileName() }}
      </div>
    </div>

    <!-- videos files -->

    <div
      class="flex flex-col justify-center items-center"
      v-else-if="
        type === 'mp4' || type === 'avi' || type === 'mov' || type === 'flv'
      "
    >
      <div @click="toggleDetails" class="relative" :class="style">
        <i
          @click="$emit('deleteFile', name)"
          class="
            text-xl text-slate-800
            opacity-60
            absolute
            top-0
            right-2
            fa-solid fa-trash-can
          "
        ></i>
        <a :href="path" download>
          <i
          class="
            text-xl text-slate-800
            opacity-60
            absolute
            top-0
            left-2
            hover:text-slate-500
            fa-solid fa-download
          "
        ></i>

        </a>
        
        <i class="text-sky-600 fa-solid fa-file-video"></i>
      </div>
      <div @click="toggleDetails">
        {{ fileName() }}
      </div>
    </div>

    <!-- zip files -->

    <div
      class="flex flex-col justify-center items-center"
      v-else-if="
        type === 'zip' || type === 'ZIP' || type === 'RAR' || type === 'rar'
      "
    >
      <div @click="toggleDetails" class="relative" :class="style">
        <i
          @click="$emit('deleteFile', name)"
          class="
            text-xl text-slate-800
            opacity-60
            absolute
            top-0
            right-2
            fa-solid fa-trash-can
          "
        ></i>
        <a :href="path" download>
          <i
          class="
            text-xl text-slate-800
            opacity-60
            absolute
            top-0
            left-2
            hover:text-slate-500
            fa-solid fa-download
          "
        ></i>

        </a>
        
        <i class="text-neutral-500 fa-solid fa-file-zipper"></i>
      </div>
      <div @click="toggleDetails">
        {{ fileName() }}
      </div>
    </div>

    <!-- music files -->

    <div
      class="flex flex-col justify-center items-center"
      v-else-if="
        type === 'mp3' || type === 'aac' || type === 'wav' || type === 'aiff'
      "
    >
      <div @click="toggleDetails" class="relative" :class="style">
        <i
          @click="$emit('deleteFile', name)"
          class="
            text-xl text-slate-800
            opacity-60
            absolute
            top-0
            right-2
            fa-solid fa-trash-can
          "
        ></i>
        <a :href="path" download>
          <i
          class="
            text-xl text-slate-800
            opacity-60
            absolute
            top-0
            left-2
            hover:text-slate-500
            fa-solid fa-download
          "
        ></i>

        </a>
        
        <i class="text-violet-600 fa-solid fa-file-audio"></i>
      </div>
      <div @click="toggleDetails">
        {{ fileName() }}
      </div>
    </div>

    <!-- other files -->

    <div class="flex flex-col justify-center items-center" v-else>
      <div @click="toggleDetails" class="relative" :class="style">
        <i
          @click="$emit('deleteFile', name)"
          class="
            text-xl text-slate-800
            opacity-60
            absolute
            top-0
            right-2
            fa-solid fa-trash-can
          "
        ></i>
        <a :href="path"  target="_blank" rel="noreferrer noopener">
          <i
          class="
            text-xl text-slate-800
            opacity-60
            absolute
            top-0
            left-2
            hover:text-slate-500
            fa-solid fa-download
          "
        ></i>

        </a>
        
        <i class="fa-solid fa-file-circle-question"></i>
      </div>
      <div @click="toggleDetails">
        {{ fileName() }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["type", "name"],

  data() {
    return {
      show: true,
      path: `${process.env.VUE_APP_SERVER_PATH}${sessionStorage.getItem('id')}/${this.name}` ,
      style: "p-10 text-5xl border-2 border bg-slate-200 rounded-lg ",
    };
  },
  methods: {
    toggleDetails() {
      this.$emit("details", this.name);
    },
    fileName() {
      if (this.name.length <= 10) {
        return this.name;
      }
      return this.name.substr(0, 10) + " ....";
    },
  },
};
</script>