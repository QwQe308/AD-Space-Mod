<script>
import SpaceResearchRift from "./SpaceResearch.vue";
import SpaceDivisorSlider from "../SpaceDivisorSlider.vue";
import PrimaryButton from "../../../PrimaryButton.vue";

export default {
  name: "SpaceResearchBarPanel",
  components: {
    SpaceResearchRift,
    SpaceDivisorSlider,
    PrimaryButton,
  },
  data() {
    return {
      decayRate: 0,
      isCollapsed: false,
      researchSpeed: new Decimal(0),
      tierResearchSpeed: [],
      resetsNothing: [],
      SpaceResearchTierDetail: SpaceResearchTierDetail,
      dimensionBoostUnlocked: false,
      galaxyUnlocked: false,
      hasBroken: false,
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
      this.researchSpeed.copyFrom(globalResearchSpeed());
      this.dimensionBoostUnlocked = PlayerProgress.dimensionBoostUnlocked();
      this.galaxyUnlocked = PlayerProgress.galaxyUnlocked();
      this.hasBroken = PlayerProgress.hasBroken();
      for (let tier = 0; tier <= maxTier; tier++) {
        this.tierResearchSpeed[tier] = tierBasedResearchSpeed(tier);
        this.resetsNothing[tier] = SpaceResearchResetsNothing[tier]();
      }
    },
    toggleCollapse() {
      //player.celestials.pelle.collapsed.rifts = !this.isCollapsed;
    },
    totalrifts() {
      return SpaceResearchRifts.all.length;
    },
    showSpaceHowTo() {
      ui.view.h2pForcedTab = GameDatabase.h2p.tabs.filter((tab) => tab.name === "*About Space")[0];
      Modal.h2p.show();
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
      <big>Current base research speed: {{ format(researchSpeed, 2) }} /s</big><br />

      <PrimaryButton class="o-primary-btn--subtab-option" @click="showSpaceHowTo"> How to play </PrimaryButton
      ><br /><br />

      <SpaceDivisorSlider />

      <div class="c-pelle-bar-container">
        <big><big>--- Antimatter - T0 ---</big></big>
        <big v-if="tierResearchSpeed[0].neq(researchSpeed)"
          >T0 research speed: {{ format(tierResearchSpeed[0], 2) }} /s</big
        >
        <SpaceResearchRift
          v-for="rift in rifts"
          v-if="SpaceResearchTierDetail[0].includes(rift.config.key) && rift.unlocked"
          :key="rift.config.key"
          :rift="rift"
        />
      </div>
      <br /><br />

      <div class="c-pelle-bar-container" v-if="dimensionBoostUnlocked">
        <big><big>--- Dimension Boost - T1 ---</big></big>
        <big v-if="tierResearchSpeed[1].neq(researchSpeed)"
          >T1 research speed: {{ format(tierResearchSpeed[1], 2) }} /s</big
        >
        <div v-if="!resetsNothing[1]">Leveling up these requires a Dimension Boost reset.</div>
        <SpaceResearchRift
          v-for="rift in rifts"
          v-if="SpaceResearchTierDetail[1].includes(rift.config.key) && rift.unlocked"
          :key="rift.config.key"
          :rift="rift"
        />
      </div>
      <br /><br />

      <div class="c-pelle-bar-container" v-if="galaxyUnlocked">
        <big><big>--- Galaxy - T2 ---</big></big>
        <big v-if="tierResearchSpeed[2].neq(researchSpeed)"
          >T2 research speed: {{ format(tierResearchSpeed[2], 2) }} /s</big
        >
        <div v-if="!resetsNothing[2]">Leveling up these requires a Galaxy reset.</div>
        <SpaceResearchRift
          v-for="rift in rifts"
          v-if="SpaceResearchTierDetail[2].includes(rift.config.key) && rift.unlocked"
          :key="rift.config.key"
          :rift="rift"
        />
      </div>
      <br /><br />

      <div class="c-pelle-bar-container" v-if="hasBroken">
        <big><big>--- Infinity - T3 ---</big></big>
        <big v-if="tierResearchSpeed[3].neq(researchSpeed)"
          >T3 research speed: {{ format(tierResearchSpeed[3], 2) }} /s</big
        >
        <div v-if="!resetsNothing[3]">Leveling up these requires a Infinity reset.</div>
        <SpaceResearchRift
          v-for="rift in rifts"
          v-if="SpaceResearchTierDetail[3].includes(rift.config.key) && rift.unlocked"
          :key="rift.config.key"
          :rift="rift"
        />
      </div>
      <br /><br />
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

