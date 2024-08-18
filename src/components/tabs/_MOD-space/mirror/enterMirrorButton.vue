<script>
export default {
  name: "EnterMirrorButton",
  data() {
    return {
      inMirror: false,
      canComplete: false,
    };
  },
  methods: {
    update() {
      this.inMirror = player.light.inMirror;
      this.canComplete = canBreakMirror();
    },
    buttonClass() {
      return {
        "o-mirror-btn": true,
        "o-mirror-btn--inverted": this.inMirror,
        "o-mirror-btn--complete": this.canComplete,
      };
    },
  },
};
</script>

<template>
  <button :class="buttonClass()" onclick="reverseMirror()">
    <span v-if="!inMirror"> Reverse The Mirror </span>
    <span v-else-if="canComplete"> Break The Mirror </span>
    <span v-else> Escape The Mirror </span>
  </button>
</template>
