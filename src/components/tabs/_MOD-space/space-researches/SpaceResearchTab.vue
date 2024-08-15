<script>
import SpaceResearchBarPanel from "./SpaceResearchBarPanel.vue";
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "SpaceResearchTab",
  components: {
    SpaceResearchBarPanel,
    PrimaryButton,
  },
  data() {
    return {
      t1QuickResetAvailable: false,
      t1QuickResetUnlocked: false,
      t2QuickResetAvailable: false,
      t2QuickResetUnlocked: false,
    };
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
      this.t1QuickResetAvailable = isSpaceResearchQuickResetAvailable(1);
      this.t2QuickResetAvailable = isSpaceResearchQuickResetAvailable(2);

      this.t1QuickResetUnlocked = PlayerProgress.dimensionBoostUnlocked() && !SpaceResearchResetsNothing[1]
      this.t2QuickResetUnlocked = PlayerProgress.galaxyUnlocked() && !SpaceResearchResetsNothing[2]
    },
  },
};
</script>

<template>
  <div class="l-pelle-celestial-tab">
    <SpaceResearchBarPanel />
    <div class="c-pelle-row">
      <PrimaryButton
        v-if="t1QuickResetUnlocked"
        :class="{
          'o-primary-btn--disabled': !t1QuickResetAvailable,
          'o-primary-btn--quick-reset': true
        }"
        onclick="if(isSpaceResearchQuickResetAvailable(1)){requestDimensionBoost(true);softReset(0, true, true)}"
      >
        Force perform a DB reset to upgrade T1 researches immediately
      </PrimaryButton>
      <PrimaryButton
        v-if="t2QuickResetUnlocked"
        :class="{
          'o-primary-btn--disabled': !t2QuickResetAvailable,
          'o-primary-btn--quick-reset': true
        }"
        onclick="if(isSpaceResearchQuickResetAvailable(2)){requestGalaxyReset(true);forceGalaxyReset()}"
      >
        Force perform a Galaxy reset to upgrade T2 researches immediately
      </PrimaryButton>
    </div>
  </div>
</template>

<style scoped>
.l-pelle-celestial-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.c-pelle-row {
  display: flex;
  flex-direction: row;
  margin: 0 0.6rem;
}
</style>
