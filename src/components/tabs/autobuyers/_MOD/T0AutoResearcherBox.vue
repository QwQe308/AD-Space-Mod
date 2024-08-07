<script>
import AutobuyerBox from "../AutobuyerBox";
import AutobuyerIntervalButton from "../AutobuyerIntervalButton";

export default {
  name: "T0AutoResearcherBox",
  components: {
    AutobuyerBox,
    AutobuyerIntervalButton
  },
  data() {
    return {
      isUnlocked: false,
      efficiency: 0,
      extraInfo: ``,
    };
  },
  computed: {
    autobuyer: () => Autobuyer.T0AutoResearcher,
    name: () => `T0 Auto Researcher`,
  },
  methods: {
    update(){
      this.extraInfo = `Auto Researches T0 at ${formatPercents(Autobuyer.T0AutoResearcher.efficiency)} rate`
    }
  }
};
</script>

<template>
  <AutobuyerBox
    :autobuyer="autobuyer"
    name="T0 Auto Researcher"
    :extraInfos="extraInfo"
  >
  </AutobuyerBox>
</template>

<style scoped>

</style>
