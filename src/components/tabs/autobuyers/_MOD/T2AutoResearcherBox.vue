<script>
import AutobuyerBox from "../AutobuyerBox";
import AutobuyerIntervalButton from "../AutobuyerIntervalButton";

export default {
  name: "T2AutoResearcherBox",
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
    autobuyer: () => Autobuyer.T2AutoResearcher,
    name: () => `T2 Auto Researcher`,
  },
  methods: {
    update(){
      this.extraInfo = `Auto Researches T2 at ${formatPercents(Autobuyer.T2AutoResearcher.efficiency)} rate`
    }
  }
};
</script>

<template>
  <AutobuyerBox
    :autobuyer="autobuyer"
    name="T2 Auto Researcher"
    :extraInfos="extraInfo"
  >
  </AutobuyerBox>
</template>

<style scoped>

</style>
