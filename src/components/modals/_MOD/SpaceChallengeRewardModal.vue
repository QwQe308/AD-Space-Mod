<script>
import ModalWrapper from "@/components/modals/ModalWrapper";
import PrimaryButton from "@/components/PrimaryButton";

export default {
  name: "SpaceChallengeRewardModal",
  components: {
    PrimaryButton,
    ModalWrapper,
  },
  computed: {
    rewards() {
      return SpaceChallenges.all.map(x=>
        x.config.data.map((y,index)=>{
          return {rew:y.reward+` [SC${x.id}, Tier ${index+1}]`,ind:y.rewardDisplayOrder};
        }).slice(0,x.completions)
      ).reduce((x,y)=>x.concat(y),[]).sort((x,y)=>x.ind-y.ind).map(x=>x.rew);
    }
  }
};
</script>

<template>
  <ModalWrapper>
    <template #header>
      List of acquired rewards
    </template>
    <div class="space-challenge-rewards-container">
      <p
        v-for="(reward, idx) in rewards"
        :key="idx"
      >
        {{ reward }}
      </p>
    </div>
    <PrimaryButton
      class="o-primary-btn--width-medium c-modal-message__okay-btn c-modal__confirm-btn"
      @click="emitClose"
    >
      Okay
    </PrimaryButton>
  </ModalWrapper>
</template>

<style scoped>
.space-challenge-rewards-container {
  overflow-y: scroll;
  height: 40rem;
}

p {
  margin-bottom: 1rem;
}
</style>
