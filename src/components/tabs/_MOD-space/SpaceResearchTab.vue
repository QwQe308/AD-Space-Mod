<script>
import SpaceResearchBarPanel from "./SpaceResearchBarPanel.vue";
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "entropy",
  components: {
    SpaceResearchBarPanel,
    PrimaryButton,
  },
  data() {
    return {
      t1QuickResetAvailable: false,
      dimensionBoostUnlocked: false,
      t2QuickResetAvailable: false,
      galaxyUnlocked: false,
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

      this.dimensionBoostUnlocked = PlayerProgress.dimensionBoostUnlocked()
      this.galaxyUnlocked = PlayerProgress.galaxyUnlocked()
    },
  },
};
</script>

<template>
  <div class="l-pelle-celestial-tab">
    <SpaceResearchBarPanel />
    <div class="c-pelle-row">
      <PrimaryButton
        v-if="dimensionBoostUnlocked"
        :class="{
          'o-primary-btn--disabled': !t1QuickResetAvailable,
          'o-primary-btn--quick-reset': true
        }"
        onclick="if(isSpaceResearchQuickResetAvailable(1)){requestDimensionBoost(true);softReset(0, true, true)}"
      >
        Force perform a DB reset to upgrade T1 researches immediately
      </PrimaryButton>
      <PrimaryButton
        v-if="galaxyUnlocked"
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
