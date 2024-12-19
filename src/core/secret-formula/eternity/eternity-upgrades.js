import { DC } from "../../constants";

export const eternityUpgrades = {
  idMultEP: {
    id: 1,
    cost: 5,
    description: () => `Infinity Dimension multiplier based on unspent Eternity Points (x+${formatInt(3)})`,
    effect: () => Currency.eternityPoints.value.plus(3),
    formatEffect: value => formatX(value, 2, 1)
  },
  idMultEternities: {
    id: 2,
    cost: 10,
    description: () => `Infinity Dimension multiplier based on Eternities
      ((x/${formatInt(25)})^log5(${formatInt(5)}x), softcap at ${format(2500,1)} Eternities)`,
    effect() {
      const log5 = Math.log(5);
      const eterPreCap = Currency.eternities.value.min(2500);
      const base = eterPreCap.div(25).add(1);
      const pow = Decimal.ln(eterPreCap.mul(4).add(1)).div(log5);
      const multPreCap = Decimal.pow(base, pow);
      const eterPostCap = Currency.eternities.value.sub(2500).max(1);
      //after cap
      const mult2 = eterPostCap.divide(100).plus(1);
      const pow2 = eterPostCap.plus(1).ln().div(log5).pow(0.5);
      const multPostCap = mult2.pow(pow2).clampMin(1);
      return multPostCap.times(multPreCap);
    },
    formatEffect: value => formatX(value, 2, 1)
  },
  idMultICRecords: {
    id: 3,
    cost: 5e4,
    description: "Infinity Dimension multiplier based on sum of Infinity Challenge times",
    // The cap limits this at a lower value, but we also need an explicit cap here because very old versions have
    // allowed EC12 to make all the challenge records sum to zero (causing a division by zero here)
    effect: () => DC.D2.pow(DC.E1.div(Decimal.clampMin(Time.infinityChallengeSum.totalSeconds, 0.1))),
    cap: DC.D2P15D0_61,
    formatEffect: value => formatX(value, 2, 1)
  },
  tdMultAchs: {
    id: 4,
    cost: 1e16,
    description: "Your Achievement bonus affects Time Dimensions",
    effect: () => Achievements.power,
    formatEffect: value => formatX(value, 2, 1)
  },
  tdMultTheorems: {
    id: 5,
    cost: 1e40,
    description: "Time Dimensions are multiplied by your unspent Time Theorems",
    effect: () => Decimal.max(Currency.timeTheorems.value, 1),
    formatEffect: value => formatX(value, 2, 1)
  },
  tdMultRealTime: {
    id: 6,
    cost: 1e50,
    description: () => (Pelle.isDoomed
      ? "Time Dimensions are multiplied by days played in this Armageddon"
      : "Time Dimensions are multiplied by days played"
    ),
    effect: () => (Pelle.isDoomed ? Time.thisReality.totalDays.add(1) : Decimal.max(Time.totalTimePlayed.totalDays, 1)),
    formatEffect: value => formatX(value, 2, 1)
  }
};
