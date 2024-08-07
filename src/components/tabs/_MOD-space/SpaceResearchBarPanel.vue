<script>
import SpaceResearchRift from "./SpaceResearch.vue";

export default {
  name: "SpaceResearchBarPanel",
  components: {
    SpaceResearchRift,
  },
  data() {
    return {
      decayRate: 0,
      isCollapsed: false,
      researchSpeed: new Decimal(0),
      SpaceResearchTierDetail: SpaceResearchTierDetail,
      dimensionBoostUnlocked: false,
      galaxyUnlocked: false,
    };
  },
  computed: {
    collapseIcon() {
      return this.isCollapsed ? "fas fa-expand-arrows-alt" : "fas fa-compress-arrows-alt";
    },
    rifts() {
      return SpaceResearchRifts.all;
    },
  },
  methods: {
    update() {
      //this.decayRate = Pelle.riftDrainPercent;
      //this.isCollapsed = player.celestials.pelle.collapsed.rifts;
      this.researchSpeed.copyFrom(researchSpeed());
      this.dimensionBoostUnlocked = PlayerProgress.dimensionBoostUnlocked()
      this.galaxyUnlocked = PlayerProgress.galaxyUnlocked()
    },
    toggleCollapse() {
      //player.celestials.pelle.collapsed.rifts = !this.isCollapsed;
    },
    totalrifts() {
      return SpaceResearchRifts.all.length;
    },
  },
};
</script>

<template>
  <div class="l-pelle-panel-container">
    <div class="c-pelle-panel-title">
      <i :class="collapseIcon" class="c-collapse-icon-clickable" @click="toggleCollapse" />
      Space Researches
    </div>
    <div v-if="!isCollapsed" class="l-pelle-content-container">
      Researches can be progressed by clicking on their bars.<br />
      Research speed is based on dimension boosts and space amount.<br /><br />
      <big>Current research speed: {{ format(researchSpeed, 2) }} /s</big><br /><br />

      <div class="c-pelle-bar-container">
        <big><big>--- Antimatter - T0 ---</big></big>
        <SpaceResearchRift v-for="rift in rifts" v-if="SpaceResearchTierDetail[0].includes(rift.config.key)" :key="rift.config.key" :rift="rift" />
      </div><br /><br />

      <div class="c-pelle-bar-container" v-if="dimensionBoostUnlocked">
        <big><big>--- Dimension Boost - T1 ---</big></big>
        Leveling up these requires a dimension boost reset.
        <SpaceResearchRift v-for="rift in rifts" v-if="SpaceResearchTierDetail[1].includes(rift.config.key)" :key="rift.config.key" :rift="rift" />
      </div><br /><br />

      <div class="c-pelle-bar-container" v-if="galaxyUnlocked">
        <big><big>--- Galaxy - T2 ---</big></big>
        Leveling up these requires a galaxy reset.
        <SpaceResearchRift v-for="rift in rifts" v-if="SpaceResearchTierDetail[2].includes(rift.config.key)" :key="rift.config.key" :rift="rift" />
      </div><br /><br />

    </div>
  </div>
</template>

<style scoped>
.c-collapse-icon-clickable {
  position: absolute;
  top: 50%;
  left: 1.5rem;
  width: 3rem;
  align-content: center;
  transform: translateY(-50%);
  cursor: pointer;
}

.c-pelle-bar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1.2em;
}

.o-strike-warning {
  color: var(--color-pelle--base);
  font-size: 1.4rem;
}
</style>

