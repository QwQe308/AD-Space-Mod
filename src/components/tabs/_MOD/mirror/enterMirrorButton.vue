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

  background-image: linear-gradient(45deg, var(--color-mirror2) 25%, var(--color-mirror1) 0, var(--color-mirror1) 50%, var(--color-mirror2) 0, var(--color-mirror2) 75%, var(--color-mirror1) 0);
  background-size: 85px 85px;

  --color-mirror: #bffbff;
  --color-mirror1: #bbbbbb;
  --color-mirror2: #ffffff88;

  animation-duration: 0.25s;
  animation-timing-function: linear;
  animation-name: mirror-reverse-animation2;
  animation-fill-mode: both;
  animation-direction: reverse;
}

@keyframes mirror-reverse-animation{
  0%  {
    --color-mirror1: #cccccc;
    --color-mirror2: #ffffff88;
    background-image: linear-gradient(45deg, var(--color-mirror2) 25%, var(--color-mirror1) 0, var(--color-mirror1) 50%, var(--color-mirror2) 0, var(--color-mirror2) 75%, var(--color-mirror1) 0);
  }
  20%  {
    --color-mirror1: #d6d6d6e6;
    --color-mirror2: #f4f4f4a0;
    background-image: linear-gradient(45deg, var(--color-mirror2) 25%, var(--color-mirror1) 0, var(--color-mirror1) 50%, var(--color-mirror2) 0, var(--color-mirror2) 75%, var(--color-mirror1) 0);
  }
  40%  {
    --color-mirror1: #e0e0e0d0;
    --color-mirror2: #eaeaeab8;
    background-image: linear-gradient(45deg, var(--color-mirror2) 25%, var(--color-mirror1) 0, var(--color-mirror1) 50%, var(--color-mirror2) 0, var(--color-mirror2) 75%, var(--color-mirror1) 0);
  }
  60%  {
    --color-mirror1: #eaeaeab8;
    --color-mirror2: #e0e0e0d0;
    background-image: linear-gradient(45deg, var(--color-mirror2) 25%, var(--color-mirror1) 0, var(--color-mirror1) 50%, var(--color-mirror2) 0, var(--color-mirror2) 75%, var(--color-mirror1) 0);
  }
  80%  {
    --color-mirror1: #f4f4f4a0;
    --color-mirror2: #d6d6d6e6;
    background-image: linear-gradient(45deg, var(--color-mirror2) 25%, var(--color-mirror1) 0, var(--color-mirror1) 50%, var(--color-mirror2) 0, var(--color-mirror2) 75%, var(--color-mirror1) 0);
  }
  100%  {
    --color-mirror1: #ffffff88;
    --color-mirror2: #cccccc;
    background-image: linear-gradient(45deg, var(--color-mirror2) 25%, var(--color-mirror1) 0, var(--color-mirror1) 50%, var(--color-mirror2) 0, var(--color-mirror2) 75%, var(--color-mirror1) 0);
  }
}

@keyframes mirror-reverse-animation2{
  0%  {
    --color-mirror1: #cccccc;
    --color-mirror2: #ffffff88;
    background-image: linear-gradient(45deg, var(--color-mirror2) 25%, var(--color-mirror1) 0, var(--color-mirror1) 50%, var(--color-mirror2) 0, var(--color-mirror2) 75%, var(--color-mirror1) 0);
  }
  20%  {
    --color-mirror1: #d6d6d6e6;
    --color-mirror2: #f4f4f4a0;
    background-image: linear-gradient(45deg, var(--color-mirror2) 25%, var(--color-mirror1) 0, var(--color-mirror1) 50%, var(--color-mirror2) 0, var(--color-mirror2) 75%, var(--color-mirror1) 0);
  }
  40%  {
    --color-mirror1: #e0e0e0d0;
    --color-mirror2: #eaeaeab8;
    background-image: linear-gradient(45deg, var(--color-mirror2) 25%, var(--color-mirror1) 0, var(--color-mirror1) 50%, var(--color-mirror2) 0, var(--color-mirror2) 75%, var(--color-mirror1) 0);
  }
  60%  {
    --color-mirror1: #eaeaeab8;
    --color-mirror2: #e0e0e0d0;
    background-image: linear-gradient(45deg, var(--color-mirror2) 25%, var(--color-mirror1) 0, var(--color-mirror1) 50%, var(--color-mirror2) 0, var(--color-mirror2) 75%, var(--color-mirror1) 0);
  }
  80%  {
    --color-mirror1: #f4f4f4a0;
    --color-mirror2: #d6d6d6e6;
    background-image: linear-gradient(45deg, var(--color-mirror2) 25%, var(--color-mirror1) 0, var(--color-mirror1) 50%, var(--color-mirror2) 0, var(--color-mirror2) 75%, var(--color-mirror1) 0);
  }
  100%  {
    --color-mirror1: #ffffff88;
    --color-mirror2: #cccccc;
    background-image: linear-gradient(45deg, var(--color-mirror2) 25%, var(--color-mirror1) 0, var(--color-mirror1) 50%, var(--color-mirror2) 0, var(--color-mirror2) 75%, var(--color-mirror1) 0);
  }
}

.o-mirror-btn:hover {
  animation-name: mirror-reverse-animation;
  animation-direction: normal;
}

.o-mirror-btn--inverted {
  background-color: var(--color-space-inverted);
}

.o-mirror-btn--complete {
  background-color: #314f5e;
  color:rgb(0, 120, 120)
}
</style>