<script>
import AutobuyerBox from "../AutobuyerBox";
import AutobuyerIntervalButton from "../AutobuyerIntervalButton";

export default {
  name: "T4AutoResearcherBox",
  components: {
    AutobuyerBox,
    AutobuyerIntervalButton,
  },
  data() {
    return {
      isUnlocked: false,
      efficiency: 0,
      extraInfo: ``,
    };
  },
  computed: {
    autobuyer: () => Autobuyer.T4AutoResearcher,
    name: () => `T4 Auto Researcher`,
  },
  methods: {
    update() {
      this.extraInfo = `Auto Researches T4 at ${formatPercents(Autobuyer.T4AutoResearcher.efficiency)} rate`;
    },
  },
};
</script>

<template>
  <AutobuyerBox :autobuyer="autobuyer" name="T4 Auto Researcher" :extraInfos="extraInfo"> </AutobuyerBox>
</template>

<style scoped></style>

