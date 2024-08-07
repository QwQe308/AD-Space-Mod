<script>
import SpaceResearchRiftBar from "./SpaceResearchBar";

export default {
  name: "SpaceResearchRift",
  components: {
    SpaceResearchRiftBar,
  },
  data() {
    return {
      isMaxed: false,
      progress: new Decimal(0),
      requirement: new Decimal(0),
      level: new Decimal(0),
      pendingLevel: new Decimal(0),
      hasEffectiveFill: false,
      effect: "",
    };
  },
  props: {
    rift: {
      type: Object,
      required: true,
    },
  },
  computed: {
    SpaceResearchRift() {
      return this.rift;
    },
  },
  methods: {
    update() {
      const rift = this.SpaceResearchRift.rift;
      this.isMaxed = rift.isMaxed;
      this.effect = this.rift.effect;
      this.setValue("progress", this.rift.pendingProgress.sub(this.rift.lastPendingRequirement));
      this.setValue("requirement", this.rift.pendingRequirement.sub(this.rift.lastPendingRequirement));
      this.setValue("level", this.rift.level);
      this.setValue("pendingLevel", this.rift.pendingLevel);
    },
    // One rift has a number and the others are all Decimals; this reduces boilerplate for setting multiple values
    setValue(key, value) {
      this[key].copyFrom(value);
    },
    // One-off formatting function; needs to format large Decimals and a small number assumed to be a percentage
    formatRift(value) {
      return format(value, 2);
    },
    riftName() {
      return this.rift.name;
    },
  },
};
</script>

<template>
  <div class="c-pelle-single-bar">
    <div class="c-pelle-rift">
      <div class="c-pelle-rift-row">
        <div class="c-pelle-rift-column c-pelle-rift-status">
          <h2 class="c-pelle-rift-name-header">
            {{ riftName() }}
          </h2>
          <div>
            {{ effect || "" }}
          </div>
        </div>
        <div class="c-pelle-rift-column">
          <SpaceResearchRiftBar :rift="rift" style="margin: auto 0;"/>
        </div>
        <div class="c-pelle-rift-rift-info-container">
          <div class="c-pelle-rift-status">
            <div class="c-pelle-rift-fill-status">
              <div class="c-pelle-rift-rift-info-container">
                <template> Level: {{ formatRift(level) }} {{(pendingLevel.eq(level)? ``:`(-> ${formatRift(pendingLevel)})`)}}</template>
              </div>
              <div class="c-pelle-rift-rift-info-container">
                <template v-if="!isMaxed"> Current Progress: {{ formatRift(progress) }} / {{ formatRift(requirement) }} </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.c-pelle-single-bar {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0.6rem 0;
}

.c-pelle-rift {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: var(--var-border-width, 0.2rem) solid var(--color-pelle--base);
  border-radius: var(--var-border-radius, 0.5rem);

  /* transparent crimson */
  box-shadow: inset 0 0 1rem 0.1rem rgba(237, 20, 61, 45%), 0 0 1rem 0.1rem rgba(237, 20, 61, 45%);
  margin-top: 0.6rem;
  padding: 0.5rem;
}

.t-s1 .c-pelle-rift {
  box-shadow: none;
}

.c-pelle-rift-row {
  display: flex;
  justify-content: center;
  align-items: center;
}

.c-pelle-rift-column {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.c-pelle-rift-rift-info-container {
  /* height: 5rem; */
  font-weight: 400;
  color: var(--color-text);
}

.c-pelle-rift-status {
  display: flex;
  flex-direction: column;
  width: 28rem;
  align-items: center;
}

.c-pelle-rift-name-header {
  font-weight: bold;
  color: var(--color-pelle--base);
  padding: 0.2rem;
  margin: 0 0 0.5rem;
}
</style>
