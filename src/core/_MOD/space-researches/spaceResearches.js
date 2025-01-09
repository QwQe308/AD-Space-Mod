import { DC } from "../../constants";

export function updateSpaceResearches(diff) {
  SpaceResearchRifts.all.forEach((r) => r.fill(diff));
}

export function globalResearchSpeed() {
  let spaceFactor = DC.E1.pow(getEffectiveSpace().add(1).log10().add(1).pow(2.5).sub(1));
  let dbFactor = DC.D2.pow(DimBoost.totalBoosts.pow(0.75));
  let researchFactor = SpaceResearchRifts.r21.effectValue[1]; //r21
  let achievementFactor = Achievements.power;
  let otherFactors = DC.D1.timesEffectsOf(
    InfinityUpgrade.totalTimeMult,
    TimeStudy(91),
    TimeStudy(92),
    TimeStudy(102)
  );
  if (isSCRunningOnTier(5, 1)) otherFactors = otherFactors.div(SpaceChallenge(5).effectValue);
  return spaceFactor.mul(dbFactor).mul(researchFactor).mul(achievementFactor).mul(otherFactors);
}

export function tierBasedResearchSpeed(tier) {
  let researchSpd = globalResearchSpeed();
  if (tier < 3) researchSpd = researchSpd.mul(light.blue.effectValue());
  switch (tier) {
    case 0:
      researchSpd = researchSpd.timesEffectsOf(InfinityUpgrade.dim18mult);
      break;
    case 1:
      researchSpd = researchSpd.timesEffectsOf(InfinityUpgrade.dim27mult);
      break;
    case 2:
      researchSpd = researchSpd.timesEffectsOf(InfinityUpgrade.dim36mult);
      break;
    case 3:
      researchSpd = researchSpd.timesEffectsOf(TimeStudy(32));
      break;
  }
  return researchSpd;
}

/* export const spaceResearches = {
  tier1: {
    1: {
      researchReq: level => DC.D2.pow(level).mul(100),
      effectDescription: eff => `AM gain ${formatX(eff, 2, 2)}`,
      effect: level => {
        return DC.D2.pow(level);
      },
    },
    2: {
      researchReq: level => DC.D5.pow(level).mul(1000),
      effectDescription: eff => `AD cost /${format(eff, 2, 2)}`,
      effect: level => {
        return DC.E1.pow(level);
      },
    },
  }
}; */

export const spaceResearch = {
  //AM - Tier 0
  r11: {
    key: "r11",
    name: "Antimatter Research",
    tier: 0,
    costScale() {
      return new ExponentialCostScaling({
        baseCost: new Decimal(100),
        baseIncrease: new Decimal(2),
        costScale: new Decimal(1),
        purchasesBeforeScaling: DC.BEMAX,
      });
    },
    effectValue: (level) => {
      return level.pow_base(2);
    },
    effect: (value) => {
      return `AM * ${format(value, 2)}`;
    },
  },
  r12: {
    key: "r12",
    name: "Cheaper AD",
    tier: 0,
    costScale() {
      return new ExponentialCostScaling({
        baseCost: new Decimal(1000),
        baseIncrease: new Decimal(3),
        costScale: new Decimal(1),
        purchasesBeforeScaling: DC.BEMAX,
      });
    },
    effectValue: (level) => {
      return level.pow_base(10);
    },
    effect: (value) => {
      return `AD cost / ${format(value, 2)}`;
    },
  },
  r13: {
    key: "r13",
    name: "Time Amplifier",
    tier: 0,
    costScale() {
      return new ExponentialCostScaling({
        baseCost: new Decimal(1e4),
        baseIncrease: new Decimal(3),
        costScale: new Decimal(1.04),
        purchasesBeforeScaling: new Decimal(25),
      });
    },
    effectValue: (level) => {
      return level.mul(2);
    },
    effect: (value) => {
      return `+ ${format(value, 2)} extra Tickspeed Upgrades`;
    },
  },

  //DB - Tier 1
  r21: {
    key: "r21",
    name: "Dimensional Discovery",
    tier: 1,
    costScale() {
      return new ExponentialCostScaling({
        baseCost: new Decimal(1e6),
        baseIncrease: new Decimal(10),
        costScale: new Decimal(1),
        purchasesBeforeScaling: DC.BEMAX,
      });
    },
    effectValue: (level) => {
      return [level, level.pow_base(1.6)];
    },
    effect: (value) => {
      return `+ ${format(value[0], 2)} extra DB & x ${format(value[1], 2, 2)} Research Speed`;
    },
  },
  r22: {
    key: "r22",
    name: "Space Reduction",
    tier: 1,
    costScale() {
      return new ExponentialCostScaling({
        baseCost: new Decimal(1e7),
        baseIncrease: new Decimal(40),
        costScale: new Decimal(1.2),
        purchasesBeforeScaling: new Decimal(0),
      });
    },
    effectValue: (level) => {
      if (level.gt(12)) level = level.pow(0.75).mul(12 ** 0.25); //softcaps :sad:
      let baseEffect = level.pow_base(1.1);
      return baseEffect;
    },
    effect: (value) => {
      return `/ ${format(value, 2, 2)} space`;
    },
  },

  //AG - Tier 2
  r31: {
    key: "r31",
    name: "Efficiency Improvement",
    tier: 2,
    costScale() {
      return new ExponentialCostScaling({
        baseCost: new Decimal(1e11),
        baseIncrease: new Decimal(50),
        costScale: new Decimal(2),
        purchasesBeforeScaling: new Decimal(2),
      });
    },
    effectValue: (level) => {
      return [level.pow_base(1.05), level.mul(0.005).add(1)];
    },
    effect: (value) => {
      return `x ${format(value[0], 2, 3)} & ^ ${format(value[1], 2, 3)} Buy 10 AD mult`;
    },
  },

  //Inf - Tier 3
  r41: {
    key: "r41",
    name: "Infinity IP",
    tier: 3,
    costScale() {
      return new ExponentialCostScaling({
        baseCost: new Decimal(1e20),
        baseIncrease: new Decimal(1e3),
        costScale: new Decimal(1),
        purchasesBeforeScaling: DC.BEMAX,
      });
    },
    effectValue: (level) => {
      return level.pow_base(2);
    },
    effect: (value) => {
      return `x ${format(value, 2)} Infinity Points`;
    },
  },

  r42: {
    key: "r42",
    name: "Efficiency Research",
    tier: 3,
    costScale() {
      return new ExponentialCostScaling({
        baseCost: new Decimal(1e24),
        baseIncrease: new Decimal(1e4),
        costScale: new Decimal(2),
        purchasesBeforeScaling: new Decimal(0),
      });
    },
    maxLevel: () => new Decimal(25),
    effectValue: (level) => {
      if (isSCRunningOnTier(3, 2)) return DC.D1;
      return level.pow_base(1.1);
    },
    effect: (value) => {
      return `x ${format(value, 2, 2)} Effective Space`;
    },
  },

  r43: {
    key: "r43",
    name: "Infinity Infinities",
    tier: 3,
    costScale() {
      return new ExponentialCostScaling({
        baseCost: new Decimal(1e22),
        baseIncrease: new Decimal(1e3),
        costScale: new Decimal(1.25),
        purchasesBeforeScaling: new Decimal(0),
      });
    },
    effectValue: (level) => {
      return level.pow_base(1.33).mul(level.div(2).add(1).pow(2));
    },
    effect: (value) => {
      return `x ${format(value, 2, 0)} Infinities`;
    },
  },

  r44: {
    key: "r44",
    name: "Continuous Dimensions",
    tier: 3,
    level(progress) {
      if (progress.lte(1e24)) return DC.D0;
      return progress.div(1e23).log10().root(3).mul(3).sub(2).floor();
    },
    requirement(level) {
      return level.add(3).div(3).pow(3).pow_base(10).mul(1e23);
    },
    effectValue: (level) => {
      if (isSCRunningOnTier(3, 2)) return DC.D0;
      //if (level.gte(15)) level = level.sub(15).pow(0.75).add(15)
      return level.mul(0.01);
    },
    effect: (value) => {
      return `+ ${format(value.mul(100), 2)}% Continuum`;
    },
    unlocked: () => isSCTierCompleted(1, 2),
    maxLevel: () => TimeStudy(111).isBought? false : new Decimal(15),
  },

  r45: {
    key: "r45",
    name: "Powered Power",
    tier: 3,
    costScale() {
      return new ExponentialCostScaling({
        baseCost: new Decimal(1e30),
        baseIncrease: new Decimal(1e5),
        costScale: new Decimal(4),
        purchasesBeforeScaling: new Decimal(0),
      });
    },
    effectValue: (level) => {
      if (isSCRunningOnTier(3, 2)) return DC.D0;
      //if (level.gte(15)) level = level.sub(15).pow(0.75).add(15)
      return level.pow(0.75).mul(0.4);
    },
    effect: (value) => {
      return `+ ${format(value, 2, 2)} IPow conversion rate`;
    },
    unlocked: () => PlayerProgress.IDUnlocked(1),
    maxLevel: () => TimeStudy(111).isBought? false : new Decimal(15),
  },

  //Eternity - Tier 4
  r51: {
    key: "r51",
    name: "Eternal Being",
    tier: 4,
    costScale() {
      return new ExponentialCostScaling({
        baseCost: new Decimal(1e130),
        baseIncrease: new Decimal(1e20),
        costScale: new Decimal(1),
        purchasesBeforeScaling: DC.BEMAX,
      });
    },
    effectValue: (level) => {
      return level.pow_base(2);
    },
    effect: (value) => {
      return `x ${format(value, 2)} EP`;
    },
  },

  r52: {
    key: "r52",
    name: "Time Flow",
    tier: 4,
    costScale() {
      return new ExponentialCostScaling({
        baseCost: new Decimal(1e125),
        baseIncrease: new Decimal(1e23),
        costScale: new Decimal(1e2),
        purchasesBeforeScaling: DC.D0,
      });
    },
    effectValue: (level) => {
      return level.mul(0.25).add(1).mul(level.pow_base(1.1));
    },
    effect: (value) => {
      return `x ${format(value, 2, 2)} Rep Speed`;
    },
  },

  r53: {
    key: "r53",
    name: "Eternal Loop",
    tier: 4,
    costScale() {
      return new ExponentialCostScaling({
        baseCost: new Decimal(1e150),
        baseIncrease: new Decimal(1e24),
        costScale: new Decimal(10),
        purchasesBeforeScaling: new Decimal(0),
      });
    },
    effectValue: (level) => {
      return level.add(1).mul(level.pow_base(1.1));
    },
    effect: (value) => {
      return `x ${format(value, 2, 0)} Eternities`;
    },
  },
};
/*  */

export const maxTier = 4;
export const SpaceResearchTierDetail = Array.range(0, maxTier + 1).map((tier) =>
  Object.keys(spaceResearch).filter((i) => spaceResearch[i].tier == tier)
);
export const SpaceResearchResetsNothing = [
  () => true,
  () => isSCTierCompleted(2, 2),
  () => isSCTierCompleted(3, 2),
  () => isSCTierCompleted(4, 2),
  () => false,
];
export function isSpaceResearchQuickResetAvailable(tier) {
  return (
    SpaceResearchTierDetail[tier].filter((x) => SpaceResearchRifts[x].pendingLevel.gt(SpaceResearchRifts[x].level))
      .length > 0
  );
}
