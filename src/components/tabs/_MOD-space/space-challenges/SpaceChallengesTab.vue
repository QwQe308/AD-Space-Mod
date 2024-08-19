<script>
import ChallengeGrid from "@/components/ChallengeGrid";
import ChallengeTabHeader from "@/components/ChallengeTabHeader";
import SpaceChallengeBox from "./SpaceChallengeBox";
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "SpaceChallengesTab",
  components: {
    ChallengeTabHeader,
    ChallengeGrid,
    SpaceChallengeBox,
    PrimaryButton
  },
  data() {
    return {
      unlockedCount: 0,
    };
  },
  computed: {
    challenges() {
      return SpaceChallenges.all;
    },
  },
  methods: {
    update() {
      this.unlockedCount = SpaceChallenges.all
        .filter(this.isChallengeVisible)
        .length;
    },
    isChallengeVisible(challenge) {
      return challenge.completions > 0 || challenge.isUnlocked || challenge.hasUnlocked;
    },
    showModal() {
      Modal.spaceChallengeReward.show();
    },
  }
};
</script>

<template>
  <div class="l-challenges-tab">
    <ChallengeTabHeader />
    <PrimaryButton
      class="o-primary-btn--subtab-option"
      @click="showModal"
    >
      View acquired rewards
    </PrimaryButton>
    <br>
    <div>
      Complete Space Challenges again for another reward.
    </div>
    <div>
      <b>These could be hard, do not try them too early</b>
    </div>
    <div v-if="unlockedCount !== challenges.length">
      You have seen {{ formatInt(unlockedCount) }} out of {{ formatInt(challenges.length) }} Space Challenges.
    </div>
    <div v-else>
      You have seen all {{ formatInt(challenges.length) }} Space Challenges.
    </div>
    <ChallengeGrid
      v-slot="{ challenge }"
      :challenges="challenges"
      :is-challenge-visible="isChallengeVisible"
    >
      <SpaceChallengeBox :challenge="challenge" />
    </ChallengeGrid>
  </div>
</template>

<style scoped>

</style>
