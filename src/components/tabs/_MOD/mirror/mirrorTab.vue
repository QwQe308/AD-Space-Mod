<script>
import EnterMirrorButton from "./enterMirrorButton";
import ColorSlider from "./colorSlider";
import PrimaryButton from "../../../PrimaryButton.vue";

export default {
  name: "MirrorTab",
  components: {
    EnterMirrorButton,
    ColorSlider,
    PrimaryButton,
  },
  data() {
    return {
      prisms: 0,
      inMirror: false,
      colors: {},
      mirrorReq: new Decimal(0),
      pendingPrisms: 0,
    };
  },
  methods: {
    update() {
      this.prisms = player.light.prisms;
      this.inMirror = player.light.inMirror;
      for (let i in light) {
        this.$set(this.colors, i, {
          amount: format(light[i].amount(), 2),
          effect: light[i].effect(light[i].effectValue()),
        });
      }
      this.mirrorReq = getMirrorRequirement();
      this.pendingPrisms = getPendingPrisms();
    },
    showMirrorHowTo() {
      ui.view.h2pForcedTab = GameDatabase.h2p.tabs.filter((tab) => tab.name === "*The Mirror")[0];
      Modal.h2p.show();
    },
  },
};
</script>

<template>
  <div class="mirror-tab">
    <div>
      Reach target AM in Mirror to gain Prism based on your total color percentage. Effects will be reversed in
      mirror.<br />
      Target AM is based on your highest color percentage.
    </div>
    <div v-if="prisms > 200">Prisms over 200 will offset white light's effect outside mirror.</div>

    <PrimaryButton class="o-primary-btn--subtab-option" @click="showMirrorHowTo"> How to play </PrimaryButton>
    <br /><br />
    <div>
      <big style="color: var(--color-mirror)">
        You have {{ format(prisms, 2) }}<span v-if="inMirror">({{ formatAdd(pendingPrisms - prisms, 2) }})</span> Prisms
      </big>
    </div>
    <EnterMirrorButton /><br /><br />
    <div v-if="inMirror">
      <big>Current Goal: {{ format(mirrorReq, 2) }} Antimatter</big>
    </div>
    <div v-if="inMirror && pendingPrisms <= prisms"><big>!!! This mirror is not giving Prisms !!!</big></div>
    <div>Total percentage cannot go past prism; Otherwise, it will be divided to prism amount.</div>
    <br /><br />
    <ColorSlider color="red" />
    <ColorSlider color="green" />
    <ColorSlider color="blue" />
    <br /><br />
    <div class="color-row">
      <div class="color-column">
        <div class="color-column">
          Red:<br />
          <big style="color: red">{{ colors.red.amount }}</big> <br />
          {{ colors.red.effect }}
        </div>
        <br />

        <div class="color-column">
          Yellow:<br />
          <big style="color: yellow">{{ colors.yellow.amount }}</big> <br />
          {{ colors.yellow.effect }}
        </div>
        <br />
      </div>
      <div class="color-column">
        <div class="color-column">
          Green:<br />
          <big style="color: green">{{ colors.green.amount }}</big> <br />
          {{ colors.green.effect }}
        </div>
        <br />

        <div class="color-column">
          Purple:<br />
          <big style="color: purple">{{ colors.purple.amount }}</big> <br />
          {{ colors.purple.effect }}
        </div>
        <br />

        <div class="color-column">
          White:<br />
          <big style="color: white">{{ colors.white.amount }}</big> <br />
          {{ colors.white.effect }}
        </div>
      </div>
      <div class="color-column">
        <div class="color-column">
          Blue:<br />
          <big style="color: blue">{{ colors.blue.amount }}</big> <br />
          {{ colors.blue.effect }}
        </div>

        <div class="color-column">
          Cyan:<br />
          <big style="color: cyan">{{ colors.cyan.amount }}</big> <br />
          {{ colors.cyan.effect }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mirror-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.color-row {
  display: flex;
  flex-direction: row;
  padding: 1rem;
  font-size: 14px;
}
.color-column {
  display: flex;
  width: 28rem;
  align-items: center;
  flex-direction: column;
  padding: 1rem;
}
</style>
