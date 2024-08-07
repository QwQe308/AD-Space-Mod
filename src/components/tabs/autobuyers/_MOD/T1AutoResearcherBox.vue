<script>
import AutobuyerBox from "../AutobuyerBox";
import AutobuyerIntervalButton from "../AutobuyerIntervalButton";

export default {
  name: "T1AutoResearcherBox",
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
    autobuyer: () => Autobuyer.T1AutoResearcher,
    name: () => `T1 Auto Researcher`,
  },
  methods: {
    update(){
      this.extraInfo = `Auto Researches T1 at ${formatPercents(Autobuyer.T1AutoResearcher.efficiency)} rate`
    }
  }
};
</script>

<template>
  <AutobuyerBox
    :autobuyer="autobuyer"
    name="T1 Auto Researcher"
    :extraInfos="extraInfo"
  >
  </AutobuyerBox>
</template>

<style scoped>

</style>
