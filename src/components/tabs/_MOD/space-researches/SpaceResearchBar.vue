<script>
import CustomizeableTooltip from "@/components/CustomizeableTooltip";

export default {
  name: "SpaceResearchRiftBar",
  components: {
    CustomizeableTooltip,
  },
  props: {
    rift: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isActive: false,
      isMaxed: false,
      percentage: 0,
      hasEffectiveFill: false,
      // Converts 1 rem to number of px
      remToPx: parseInt(getComputedStyle(document.documentElement).fontSize, 10),
      effects: [],
      timeToNext: "",
    };
  },
  computed: {
    tooltipArrowStyle() {
      return {
        borderTop: "0.55rem solid var(--color-pelle--base)",
      };
    },
  },
  methods: {
    update() {
      const rift = this.rift;
      this.effects = rift.effects;
      this.isActive = rift.isActive;
      this.isMaxed = rift.isMaxed;
      this.percentage = rift.percentage;

      if(rift.trueFillSpeed.gt(0)) this.timeToNext = TimeSpan.fromSeconds(rift.pendingRequirement.sub(rift.pendingProgress).div(rift.trueFillSpeed).toNumber()).toTimeEstimate()
      else this.timeToNext = "Forever"
    },
    formatRift(value) {
      return typeof value === "number" ? `${formatInt(100 * value)}%` : format(value, 2);
    },
    toggle() {
      if (!this.isMaxed) this.rift.toggle();
    },
    barOverlay() {
      const overfill = this.percentage > 1;
      return {
        "o-pelle-rift-bar-permanent": !overfill && this.hasEffectiveFill,
        "o-pelle-rift-bar-overfilled": overfill,
      };
    },
  },
};
</script>

<template>
  <div
    ref="SpaceResearchRiftBar"
    v-tooltip="timeToNext"
    class="c-pelle-rift-bar"
    :class="{
      'c-pelle-rift-bar--maxed': isMaxed,
      'c-pelle-rift-bar--idle': !isActive && !isMaxed,
      'c-pelle-rift-bar--filling': isActive,
    }"
    @click="toggle"
  >
    <div class="l-overflow-hidden">
      <!-- Note: These are separate because permanent and animated fill both use the same positional attributes -->
      <div
        v-if="!isMaxed" class="o-pelle-rift-bar-fill"
        :style="{
          width: `${Math.clampMax(percentage * 100, 100)}%`,
        }"
      />
      <div
        v-else class="o-pelle-rift-bar-fill"
        :style="{
          width: `100%`,
        }"
      />
      <!-- This bar overlay adds the shadow within the bar so the ugly edges don't show -->
      <div class="o-pelle-rift-bar-overlay" />
      <div v-if="isActive && !isMaxed" class="o-pelle-rift-bar-active-fill" />
    </div>
    <div v-if="!isMaxed" class="o-pelle-rift-bar-percentage">
      {{ formatPercents(percentage, 3) }}
      <span>({{ isActive ? "Filling" : "Idle" }})</span>
    </div>
    <div v-else class="o-pelle-rift-bar-percentage">
      {{ formatPercents(1, 3) }}
    </div>
  </div>
</template>

<style scoped>
@keyframes a-pelle-bar-overfill-pulse {
  /* #ed143d66 is the base pelle colour except transparent. */
  0% {
    box-shadow: 0 0 0.7rem 1rem rgba(237, 20, 61, 40%);
  }
  50% {
    box-shadow: 0 0 1.5rem 0 rgba(237, 20, 61, 40%);
  }
  100% {
    box-shadow: 0 0 0.7rem 1rem rgba(237, 20, 61, 40%);
  }
}

@keyframes a-pelle-bar-overfill-pulse-but-green {
  0% {
    box-shadow: 0 0 0.7rem 1rem rgba(124, 183, 39, 53.3%);
  }
  50% {
    box-shadow: 0 0 1.5rem 0 rgba(124, 183, 39, 53.3%);
  }
  100% {
    box-shadow: 0 0 0.7rem 1rem rgba(124, 183, 39, 53.3%);
  }
}

/* ACTIVE RIFT FILLING STYLES */
@keyframes a-pelle-bar-filling-sweep {
  0% {
    width: 0;
    left: 0;
  }

  10% {
    width: 2rem;
    left: 0;
  }

  90% {
    width: 2rem;
    left: calc(100% - 2rem);
  }

  100% {
    width: 0;
    left: 100%;
  }
}

@keyframes a-pelle-bar-unfinished-milestone-flash {
  0% {
    opacity: 1;
  }
  20% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
  80% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}

/* #region CONTAINER STYLES */
.c-pelle-rift-bar {
  display: flex;
  width: 32rem;
  height: 5rem;
  position: relative;
  justify-content: center;
  align-items: center;
  background: linear-gradient(45deg, #ffffff, #e6e6e6);
  border: var(--var-border-width, 0.2rem) solid var(--color-pelle--secondary);
  border-radius: var(--var-border-radius, 0.5rem);
  margin-bottom: 1rem;
}

.s-base--metro .c-pelle-rift-bar {
  width: 31.9rem;
  height: 4.8rem;
}

.s-base--dark .c-pelle-rift-bar {
  background: linear-gradient(45deg, #1e1e1e, #262626);
}

.c-pelle-rift-bar--filling,
.c-pelle-rift-bar--idle {
  transition: box-shadow 0.5s;
  cursor: pointer;
}

.c-pelle-rift-bar--filling:hover,
.c-pelle-rift-bar--idle:hover {
  box-shadow: 0 0 2rem var(--color-pelle--secondary);
}

.l-overflow-hidden {
  overflow: hidden;
  width: 32rem;
  height: 5rem;
  position: absolute;
  top: -0.2rem;
  left: -0.2rem;
  z-index: 0;
  border: var(--var-border-width, 0.16rem) solid transparent;
  border-radius: var(--var-border-radius, 0.5rem);
}

.o-pelle-rift-bar-overlay {
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 0;
  box-shadow: inset 0 0 0.3rem 0.1rem #222222;
}

.c-pelle-rift-bar--filling .o-pelle-rift-bar-overlay {
  box-shadow: inset 0 0 0.3rem 0.1rem var(--color-pelle--secondary);
}
/* #endregion CONTAINER STYLES */

/* #region FILLING STYLES */
.o-pelle-rift-bar-fill {
  height: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 0;
  opacity: 0.7;
  background: var(--color-pelle--secondary);
}

.o-pelle-rift-bar-reducedto {
  height: 100%;
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 0;
  background: var(--color-pelle--base);
  filter: brightness(0.5);
}
/* #endregion FILLING STYLES */

/* #region SPECIAL BAR OVERLAY STYLES */
.o-pelle-rift-bar-permanent {
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 0;
  opacity: 0.5;
  background: var(--color-pelle--secondary);
  filter: grayscale(0.6);
}

.o-pelle-rift-bar-overfilled {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
  opacity: 0.5;
  background: var(--color-pelle--base);
}

.c-pelle-rift-bar-overfill-container {
  animation: a-pelle-bar-overfill-pulse 1s infinite linear;
}

.t-s1 .c-pelle-rift-bar-overfill-container {
  animation: a-pelle-bar-overfill-pulse-but-green 1s infinite linear;
}

.o-pelle-rift-bar-active-fill {
  height: 100%;
  position: absolute;
  z-index: 1;
  opacity: 0.3;
  background: var(--color-pelle--base);
  animation: a-pelle-bar-filling-sweep infinite 2s linear;
}
/* #endregion SPECIAL BAR OVERLAY STYLES */

/* #region PERCENTAGE STYLES */
.o-pelle-rift-bar-percentage {
  z-index: 2;
  font-size: 1.5rem;
  color: var(--color-text);
  filter: drop-shadow(0.1rem 0.1rem 0.1rem var(--color-pelle--base));

  /* This keeps the percentage from blocking the hover area */
  pointer-events: none;
}

.c-pelle-rift-bar--idle .l-overflow-hidden,
.c-pelle-rift-bar--idle .o-pelle-rift-bar-percentage {
  opacity: 0.6;
}

.c-pelle-rift-bar--maxed .l-overflow-hidden,
.c-pelle-rift-bar--maxed .o-pelle-rift-bar-percentage {
  opacity: 0.6;
}
/* #endregion PERCENTAGE STYLES */

/* #region MILESTONE STYLES */
.o-pelle-rift-bar-milestone-hover-container {
  height: 100%;
}

.o-pelle-rift-bar-milestone-line {
  width: 0.25rem;
  height: 100%;
  position: absolute;
  z-index: 1;
  background: var(--color-pelle--base);
  animation: a-pelle-bar-unfinished-milestone-flash infinite 1s linear;
}

.o-pelle-rift-bar-milestone-line--unlocked {
  animation: none;
}

.o-pelle-rift-bar-milestone-line--disabled {
  filter: brightness(0.25);
  animation: none;
}
/* #endregion MILESTONE STYLES */
</style>

<style>
.o-pelle-rift-bar-milestone-hover-area {
  width: 2rem;
  height: 100%;
}

.c-pelle-milestone-tooltip {
  width: 20rem;
  z-index: 4;
  font-size: 1.1rem;
  font-weight: bold;
  color: var(--color-text);
  background-color: var(--color-base);
  border: 0.1rem solid var(--color-pelle--base);
}

.s-base--dark .c-pelle-milestone-tooltip {
  background-color: #111111;
}

.c-pelle-milestone-tooltip--unlocked {
  color: black;
  background-color: var(--color-pelle--base);
  box-shadow: 0 0 0 0.1rem black;
}

.s-base--dark .c-pelle-milestone-tooltip--unlocked {
  background-color: var(--color-pelle--base);
}
</style>
