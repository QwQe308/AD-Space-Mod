<script>
import DescriptionDisplay from "@/components/DescriptionDisplay";
import EffectDisplay from "@/components/EffectDisplay";
import SpaceChallengeBoxWrapper from "./SpaceChallengeBoxWrapper";

export default {
  name: "SpaceChallengeBox",
  components: {
    SpaceChallengeBoxWrapper,
    DescriptionDisplay,
    EffectDisplay
  },
  props: {
    challenge: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isUnlocked: false,
      isRunning: false,
      isCompleted: false,
      canBeUnlocked: false,
      maxCompletions: 0,
      completions: 0,
      reward: "",
      goal: "",
      description: "",
      resetDescription: "",
    };
  },
  computed: {
    config() {
      return this.challenge.config;
    },
    name() {
      return `SC${this.challenge.id}`;
    }
  },
  methods: {
    update() {
      const challenge = this.challenge;
      this.isUnlocked = challenge.isUnlocked;
      this.isRunning = challenge.isRunning;
      this.isCompleted = challenge.isFullyCompleted;
      this.completions = challenge.completions;
      this.maxCompletions = challenge.maxCompletions;
      this.reward = challenge.reward;
      this.goal = challenge.goal;
      this.description = challenge.description;
      this.resetDescription = challenge.resetDescription;
    },
    start() {
      this.challenge.requestStart();
    },
  }
};
</script>

<template>
  <SpaceChallengeBoxWrapper
    :name="name"
    :is-unlocked="isUnlocked"
    :is-running="isRunning"
    :is-completed="isCompleted"
    :completion-count="completions"
    :max-completions="maxCompletions"
    @start="start"
  >
    <template #top>
      <div>
        {{ description }}
      </div>
      <div style="color: #ff2f2f;">
        {{ resetDescription }}
      </div>
    </template>
    <template #bottom>
      <div :style="{ visiblity: completions < maxCompletions ? 'visible' : 'hidden' }">
        <div>
          Completed {{ completions }} / {{ maxCompletions }} times
        </div>
        <div v-if="!isCompleted">
          {{ goal }} to complete this challenge.
        </div>
      </div>
      <span>
        <span v-if="completions < maxCompletions">Next: {{ reward }}</span>
      </span>
    </template>
  </SpaceChallengeBoxWrapper>
</template>

<style scoped>

</style>
