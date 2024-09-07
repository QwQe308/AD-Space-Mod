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

<style scoped>
.o-mirror-btn {
  width: 19rem;
  height: 9rem;
  font-family: Typewriter, serif;
  font-size: 1.12rem;
  font-weight: bold;
  border: var(--var-border-width, 0.2rem) solid var(--color-mirror);
  border-radius: var(--var-border-radius, 0.4rem);
  padding: 1rem;
  transition-duration: 0.2s;
  background-color: var(--color-space);
  cursor: pointer;
}

.o-mirror-btn:hover {
  background-color: white;
}

.o-mirror-btn--inverted {
  color: white;
  background-color: var(--color-space-inverted);
}

.o-mirror-btn--complete {
  background-color: var(--color-mirror-complete);
}

.o-mirror-btn--inverted:hover {
  background-color: black;
}
</style>