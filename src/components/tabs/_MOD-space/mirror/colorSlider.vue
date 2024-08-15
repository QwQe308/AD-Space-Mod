<script>
import SliderComponent from "@/components/SliderComponent";
export default {
  name: "ColorSlider",
  components: {
    SliderComponent,
  },
  props: {
    color: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      colors: {
        red: "R",
        green: "G",
        blue: "B",
      },
      colorsToStyle: {
        red: "rgb(255,0,0)",
        green: "rgb(255,0,0)",
        blue: "rgb(255,0,0)",
      },
      percentage: 0,
      percentageMultplier: 1,
    };
  },
  computed: {
    sliderProps() {
      return {
        min: 0,
        max: 100,
        interval: 5,
        width: "50rem",
        tooltip: false,
        bgClass: "c-mirror-slider__bg_" + this.color,
        processClass: "c-mirror-slider__process_" + this.color,
      };
    },
  },
  methods: {
    update() {
      this.percentage = this.playerData();
      this.percentageMultplier = calcPercentMultplier();
    },
    adjustSliderValue(value) {
      if (value === this.playerData()) return;
      this.percentage = value;
      player.light[this.color + "Percent"] = this.percentage;
      bigCrunchReset(true, true);
    },
    playerData() {
      return player.light[this.color + "Percent"];
    },
  },
};
</script>

<template>
  <div :style="'color:' + color">
    <big> {{ colors[color] }}: {{ formatPercents(this.percentage / 100) }} </big>
    <big v-if="percentageMultplier !== 1">
      (active: {{ formatPercents((this.percentage * this.percentageMultplier) / 100) }})
    </big>
    <SliderComponent v-bind="sliderProps" :value="percentage" @input="adjustSliderValue($event)" />
  </div>
</template>
