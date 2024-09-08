<script>
//!!! This is unused now !!!
import SliderComponent from "@/components/SliderComponent";

export default {
  name: "SpaceDivisorSlider",
  components: {
    SliderComponent,
  },
  data() {
    return {
      percentage: 10,
      shown: false,
    };
  },
  computed: {
    sliderProps() {
      return {
        min: 0,
        max: 100,
        interval: 1,
        width: "55rem",
        tooltip: false,
      };
    },
  },
  methods: {
    update() {
      this.percentage = player.spaceDivisiorActivePercentage * 100;
      this.shown = false; //isSCTierCompleted(4, 1)
      //Unused for now
    },
    adjustSliderValue(value) {
      if (value === player.spaceDivisiorActivePercentage * 100) return;
      this.percentage = value;
      player.spaceDivisiorActivePercentage = this.percentage / 100;
      bigCrunchReset(true, true);
    },
  },
};
</script>

<template>
  <div v-if="shown">
    <b>Space Divisor active percentage: {{ formatInt(percentage) }}%. Changing requires a Big Crunch Reset.</b>
    <SliderComponent v-bind="sliderProps" :value="percentage" @input="adjustSliderValue($event)" />
  </div>
</template>
