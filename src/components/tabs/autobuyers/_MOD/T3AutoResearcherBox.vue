<script>
import AutobuyerBox from "../AutobuyerBox";
import AutobuyerIntervalButton from "../AutobuyerIntervalButton";

export default {
  name: "T3AutoResearcherBox",
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
    autobuyer: () => Autobuyer.T3AutoResearcher,
    name: () => `T3 Auto Researcher`,
  },
  methods: {
    update(){
      this.extraInfo = `Auto Researches T3 at ${formatPercents(Autobuyer.T3AutoResearcher.efficiency)} rate`
    }
  }
};
</script>

<template>
  <AutobuyerBox
    :autobuyer="autobuyer"
    name="T3 Auto Researcher"
    :extraInfos="extraInfo"
  >
  </AutobuyerBox>
</template>

<style scoped>

</style>
