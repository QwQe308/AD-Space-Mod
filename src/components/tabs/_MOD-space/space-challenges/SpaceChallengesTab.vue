<script>
import ChallengeGrid from "@/components/ChallengeGrid";
import ChallengeTabHeader from "@/components/ChallengeTabHeader";
import SpaceChallengeBox from "./SpaceChallengeBox";

export default {
  name: "SpaceChallengesTab",
  components: {
    ChallengeTabHeader,
    ChallengeGrid,
    SpaceChallengeBox
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
    }
  }
};
</script>

<template>
  <div class="l-challenges-tab">
    <ChallengeTabHeader />
    <div>
      Complete Space Challenges again for a bigger reward.
    </div>
    <div>
      **These could be hard, do not try them too early**
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
