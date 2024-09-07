<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "SpaceChallengeStartModal",
  components: {
    ModalWrapperChoice
  },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  computed: {
    challenge() {
      return SpaceChallenge(this.id);
    },
    challengeIsCompleted() {
      return this.challenge.isFullyCompleted;
    },
    message() {
      return `You will call a corresponding RESET on entering the Challenge,
        BE SURE to know about what will happen.
        To complete the Challenge${this.challengeIsCompleted ? "" : " and gain its reward"},
        you must reach the Challenge goal of
        ${this.challenge.goal}.`;
    },
    entranceLabel() {
      return `You are about to enter Space Challenge ${this.id}`;
    },
    reward() {
      let rewardDescription = this.challenge.reward;
      if (typeof rewardDescription === "function") {
        rewardDescription = rewardDescription();
      }
      return `The reward for completing this challenge is: ${rewardDescription}`;
    },
    condition() {
      let conditionOfChallenge = this.challenge.description;
      if (typeof conditionOfChallenge === "function") {
        conditionOfChallenge = conditionOfChallenge();
      }
      return `Inside this Space Challenge, ${conditionOfChallenge}`;
    }
  },
  created() {
    this.on$(GAME_EVENT.ETERNITY_RESET_AFTER, this.emitClose);
    this.on$(GAME_EVENT.REALITY_RESET_AFTER, this.emitClose);
  },
  methods: {
    handleYesClick() {
      this.challenge.start(true);
      EventHub.ui.offAll(this);
    }
  },
};
</script>

<template>
  <ModalWrapperChoice
    option="challenges"
    @confirm="handleYesClick"
  >
    <template #header>
      {{ entranceLabel }}
    </template>
    <div class="c-modal-message__text">
      {{ message }}
      <br><br>
      {{ condition }}
    </div>
    <div
      v-if="!challengeIsCompleted"
      class="c-modal-message__text"
    >
      <br>
      {{ reward }}
    </div>
    <template #confirm-text>
      Begin
    </template>
  </ModalWrapperChoice>
</template>
