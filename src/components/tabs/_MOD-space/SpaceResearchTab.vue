<script>
  
import SpaceResearchBarPanel from "./SpaceResearchBarPanel.vue";
import PrimaryButton from "@/components/PrimaryButton";
  
export default {
  name: "entropy",
  components: {
    SpaceResearchBarPanel,
    PrimaryButton,
  },
  data(){
    return {
      t1QuickResetAvailable: false,
      t2QuickResetAvailable: false,
    }
  },
  computed: {
    rifts() {
      return SpaceResearchRifts.all;
    },
  },
  methods: {
    totalrifts() {
      return SpaceResearchRifts.all.length;
    },
    update() {
      this.t1QuickResetAvailable = SpaceResearchTierDetail[1].filter(x => SpaceResearchRifts[x].pendingLevel.neq(SpaceResearchRifts[x].level)).length > 0
      this.t2QuickResetAvailable = SpaceResearchTierDetail[2].filter(x => SpaceResearchRifts[x].pendingLevel.neq(SpaceResearchRifts[x].level)).length > 0
    }
  },
};
</script>

<template>

    <div class="l-pelle-celestial-tab">
        <SpaceResearchBarPanel />
        <PrimaryButton
        v-if="t1QuickResetAvailable"
        class="o-primary-btn--quick-reset"
        onclick="softReset(0, true, true)"
      >
        Perform a Dimension Boost reset (for nothing) to upgrade T1 researches immediately
        </PrimaryButton>
        <PrimaryButton
        v-if="t2QuickResetAvailable"
        class="o-primary-btn--quick-reset"
        onclick="forceGalaxyReset()"
      >
        Perform a Galaxy reset (for nothing) to upgrade T2 researches immediately
        </PrimaryButton>
    </div>

</template>

<style scoped>
.l-pelle-celestial-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>
