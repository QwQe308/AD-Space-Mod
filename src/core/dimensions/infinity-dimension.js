import { DC } from "../constants";
import { TimeStudy } from "../time-studies/normal-time-study";

import { DimensionState } from "./dimension";

export function infinityDimensionCommonMultiplier() {
  let mult = new Decimal(1)
    .timesEffectsOf(
      Achievement(75),
      TimeStudy(82),
      TimeStudy(92),
      TimeStudy(162),
      InfinityChallenge(1).reward,
      InfinityChallenge(6).reward,
      EternityChallenge(4).reward,
      EternityChallenge(9).reward,
      EternityUpgrade.idMultEP,
      EternityUpgrade.idMultEternities,
      EternityUpgrade.idMultICRecords,
      AlchemyResource.dimensionality,
      ImaginaryUpgrade(8),
      PelleRifts.recursion.milestones[1]
    )
    .mul(light.yellow.effectValue());

  if (Replicanti.areUnlocked && Replicanti.amount.gt(1)) {
    mult = mult.times(replicantiMult());
  }

  return mult;
}

export function toggleAllInfDims() {
  const areEnabled = Autobuyer.infinityDimension(1).isActive;
  for (let i = 1; i < 9; i++) {
    Autobuyer.infinityDimension(i).isActive = !areEnabled;
  }
}

class InfinityDimensionState extends DimensionState {
  constructor(tier) {
    super(() => player.dimensions.infinity, tier);
    const UNLOCK_REQUIREMENTS = [
      undefined,
      DC.E1000,
      DC.E1800,
      DC.E2350,
      DC.E10500,
      DC.E30000,
      DC.E45000,
      DC.E54000,
      DC.E60000,
    ];
    this._unlockRequirement = UNLOCK_REQUIREMENTS[tier];
    const COST_MULTS = [null, 1e3, 1e6, 1e8, 1e10, 1e15, 1e20, 1e25, 1e30];
    this._costMultiplier = COST_MULTS[tier];
    const POWER_MULTS = [null, 50, 30, 10, 5, 5, 5, 5, 5];
    this._powerMultiplier = POWER_MULTS[tier];
    const BASE_COSTS = [null, 1e7, 1e9, 1e12, 1e20, 1e140, 1e200, 1e250, 1e280];
    this._baseCost = new Decimal(BASE_COSTS[tier]);
    this.ipRequirement = BASE_COSTS[1];
  }

  /** @returns {Decimal} */
  get cost() {
    return this.data.cost;
  }
  /** @param {Decimal} value */
  set cost(value) {
    this.data.cost = value;
  }

  get baseAmount() {
    return this.data.baseAmount;
  }

  set baseAmount(value) {
    this.data.baseAmount = value;
  }

  get isUnlocked() {
    return this.data.isUnlocked;
  }

  set isUnlocked(value) {
    this.data.isUnlocked = value;
  }

  get amRequirement() {
    return this._unlockRequirement;
  }

  get antimatterRequirementReached() {
    return player.records.thisEternity.maxAM.gte(this.amRequirement);
  }

  get hasIPUnlock() {
    return this.tier === 1 && !PlayerProgress.eternityUnlocked();
  }

  get ipRequirementReached() {
    return !this.hasIPUnlock || Currency.infinityPoints.value.gte(this.ipRequirement);
  }

  get canUnlock() {
    return (Perk.bypassIDAntimatter.canBeApplied || this.antimatterRequirementReached) && this.ipRequirementReached;
  }

  get isAvailableForPurchase() {
    return InfinityDimensions.canBuy() && this.isUnlocked && this.isAffordable && !this.isCapped;
  }

  get isAffordable() {
    return Currency.infinityPoints.gte(this.cost);
  }

  get rateOfChange() {
    const tier = this.tier;
    let toGain = DC.D0;
    if (tier === 8) {
      // We need a extra 10x here (since ID8 production is per-second and
      // other ID production is per-10-seconds).
      EternityChallenge(7).reward.applyEffect((v) => (toGain = v.times(10)));
      if (EternityChallenge(7).isRunning) EternityChallenge(7).applyEffect((v) => (toGain = v.times(10)));
    } else {
      toGain = InfinityDimension(tier + 1).productionPerSecond;
    }
    const current = Decimal.max(this.amount, 1);
    return toGain.times(10).dividedBy(current).times(getGameSpeedupForDisplay());
  }

  get productionPerSecond() {
    if (
      EternityChallenge(2).isRunning ||
      EternityChallenge(10).isRunning ||
      (Laitela.isRunning && this.tier > Laitela.maxAllowedDimension)
    ) {
      return DC.D0;
    }
    let production = this.amount;
    if (EternityChallenge(11).isRunning) {
      return production;
    }
    if (EternityChallenge(7).isRunning) {
      production = production.times(Tickspeed.perSecond);
    }
    return production.times(this.multiplier);
  }

  get multiplier() {
    const tier = this.tier;
    if (EternityChallenge(11).isRunning) return DC.D1;
    let mult = GameCache.infinityDimensionCommonMultiplier.value.timesEffectsOf(
      tier === 1 ? Achievement(94) : null,
      tier === 4 ? TimeStudy(72) : null,
      tier === 1 ? EternityChallenge(2).reward : null
    );
    mult = mult.times(Decimal.pow(this.powerMultiplier, Decimal.floor(this.baseAmount.div(DC.E1))));

    if (tier === 1) {
      mult = mult.times(PelleRifts.decay.milestones[0].effectOrDefault(1));
    }

    mult = mult.pow(getAdjustedGlyphEffect("infinitypow"));
    mult = mult.pow(getAdjustedGlyphEffect("effarigdimensions"));
    mult = mult.pow(getAdjustedGlyphEffect("curseddimensions"));
    mult = mult.powEffectOf(AlchemyResource.infinity);
    mult = mult.pow(Ra.momentumValue);
    mult = mult.powEffectOf(PelleRifts.paradox);

    if (player.dilation.active || PelleStrikes.dilation.hasStrike) {
      mult = dilatedValueOf(mult);
    }

    if (Effarig.isRunning) {
      mult = Effarig.multiplier(mult);
    } else if (V.isRunning) {
      mult = mult.pow(0.5);
    }

    if (PelleStrikes.powerGalaxies.hasStrike) {
      mult = mult.pow(0.5);
    }

    return mult;
  }

  get isProducing() {
    const tier = this.tier;
    if (
      EternityChallenge(2).isRunning ||
      EternityChallenge(10).isRunning ||
      (Laitela.isRunning && tier > Laitela.maxAllowedDimension)
    ) {
      return false;
    }
    return this.amount.gt(0);
  }

  get baseCost() {
    return this._baseCost;
  }

  get costMultiplier() {
    let costMult = new Decimal(this._costMultiplier);
    EternityChallenge(12).reward.applyEffect((v) => (costMult = Decimal.pow(costMult, v)));
    return costMult;
  }

  get powerMultiplier() {
    return new Decimal(this._powerMultiplier)
      .times(this._tier === 8 ? GlyphInfo.infinity.sacrificeInfo.effect() : new Decimal(1))
      .pow(ImaginaryUpgrade(14).effectOrDefault(1));
  }

  get purchases() {
    // Because each ID purchase gives 10 IDs
    return this.data.baseAmount.div(10);
  }

  get purchaseCap() {
    if (Enslaved.isRunning) {
      return DC.D1;
    }
    return InfinityDimensions.capIncrease.add(this.tier === 8 ? DC.BEMAX : InfinityDimensions.totalDimCap);
  }

  get purchaseSoftcap() {
    return InfinityDimensions.capIncrease.add(this.tier === 8 ? DC.BEMAX : InfinityDimensions.SOFTCAP_PURCHASES);
  }

  get isCapped() {
    return this.purchases.gte(this.purchaseCap) || (this.purchases.gte(this.purchaseSoftcap) && !this.unSoftCapped);
  }

  get unSoftCapped() {//All unsoftcappers works here
    return TimeStudy(42).isBought
  }

  get hardcapIPAmount() {
    if(!this.unSoftCapped && this.purchaseSoftcap.lt(this.purchaseCap)) return this._baseCost.times(Decimal.pow(this.costMultiplier, this.purchaseCap));
    return this._baseCost.times(Decimal.pow(this.costMultiplier, this.purchaseCap));
  }

  resetAmount() {
    this.amount = new Decimal(this.baseAmount);
  }

  fullReset() {
    this.cost = new Decimal(this.baseCost);
    this.amount = DC.D0;
    this.bought = DC.D0;
    this.baseAmount = DC.D0;
    this.isUnlocked = false;
  }

  unlock() {
    if (this.isUnlocked) return true;
    if (!this.canUnlock) return false;
    this.isUnlocked = true;
    if (this.tier === 4) TabNotification.ID4Unlock.tryTrigger();
    EventHub.dispatch(GAME_EVENT.INFINITY_DIMENSION_UNLOCKED, this.tier);
    if (this.tier === 1 && !PlayerProgress.eternityUnlocked()) {
      Tab.dimensions.infinity.show();
    }
    return true;
  }

  // Only ever called from manual actions
  buySingle() {
    if (!this.isUnlocked) return this.unlock();
    if (!this.isAvailableForPurchase) return false;
    if (ImaginaryUpgrade(15).isLockingMechanics) {
      const lockString =
        this.tier === 1 ? "purchase a 1st Infinity Dimension" : "purchase a Dimension which will produce 1st IDs";
      ImaginaryUpgrade(15).tryShowWarningModal(lockString);
      return false;
    }

    Currency.infinityPoints.purchase(this.cost);
    this.cost = Decimal.round(this.cost.times(this.costMultiplier)).mul(
      this.bought.add(1).round().eq(this.purchaseSoftcap.round()) ? 1e256 : 1
    );
    // Because each ID purchase gives 10 IDs
    this.bought = this.bought.plus(1);
    this.amount = this.amount.plus(10);
    this.baseAmount = this.baseAmount.add(10);

    if (EternityChallenge(8).isRunning) {
      player.eterc8ids -= 1;
    }

    return true;
  }

  buyMax(auto) {
    if (!this.isAvailableForPurchase) return false;
    if (ImaginaryUpgrade(15).isLockingMechanics) {
      const lockString =
        this.tier === 1 ? "purchase a 1st Infinity Dimension" : "purchase a Dimension which will produce 1st IDs";
      if (!auto) ImaginaryUpgrade(15).tryShowWarningModal(lockString);
      return false;
    }

    let purchasesUntilSoftcap = this.purchaseSoftcap.sub(this.purchases);
    let purchasesUntilHardcap = this.purchaseCap;
    if (EternityChallenge(8).isRunning) {
      purchasesUntilHardcap = Decimal.clampMax(purchasesUntilHardcap, player.eterc8ids);
    }

    let costScaling;
    if (
      this.purchases.lt(this.purchaseSoftcap) &&
      Currency.infinityPoints.value.lte(this.costMultiplier.pow(this.purchaseSoftcap).mul(this.baseCost).mul(1e256))
    ) {
      //cannot afford the first after cost jump
      costScaling = new LinearCostScaling(
        Currency.infinityPoints.value,
        this.baseCost.mul(this.costMultiplier.pow(this.purchases)),
        this.costMultiplier,
        purchasesUntilSoftcap.min(purchasesUntilHardcap)
      );
    } else {
      costScaling = new LinearCostScaling(
        Currency.infinityPoints.value,
        this.baseCost.mul(this.costMultiplier.pow(this.purchases)).mul(1e256), //I know if tiggered earlier will spend a little more IP but whoever cares
        this.costMultiplier,
        purchasesUntilHardcap
      );
    }

    if (costScaling.purchases.lte(0)) return false;

    Currency.infinityPoints.purchase(costScaling.totalCost);
    this.cost = costScaling.nextCost;
    this.bought = this.bought.plus(costScaling.purchases);
    this.amount = this.amount.plus(costScaling.purchases.times(10));
    this.baseAmount = DC.E1.times(costScaling.purchases).add(this.baseAmount);
    if (this.purchases.eq(this.purchaseSoftcap)) this.cost = this.cost.mul(1e256);

    if (EternityChallenge(8).isRunning) {
      player.eterc8ids -= costScaling.purchases.toNumber();
    }
    return true;
  }
}

/**
 * @function
 * @param {number} tier
 * @return {InfinityDimensionState}
 */
export const InfinityDimension = InfinityDimensionState.createAccessor();

export const InfinityDimensions = {
  /**
   * @type {InfinityDimensionState[]}
   */
  all: InfinityDimension.index.compact(),
  SOFTCAP_PURCHASES: new Decimal(16),
  HARDCAP_PURCHASES: new Decimal(2e6),

  unlockNext() {
    if (InfinityDimension(8).isUnlocked) return;
    this.next().unlock();
  },

  next() {
    if (InfinityDimension(8).isUnlocked) throw "All Infinity Dimensions are unlocked";
    return this.all.first((dim) => !dim.isUnlocked);
  },

  resetAmount() {
    Currency.infinityPower.reset();
    for (const dimension of InfinityDimensions.all) {
      dimension.resetAmount();
    }
  },

  fullReset() {
    for (const dimension of InfinityDimensions.all) {
      dimension.fullReset();
    }
  },

  get capIncrease() {
    return Decimal.floor(Tesseracts.capIncrease());
  },

  get totalDimCap() {
    if(!this.unSoftCapped) return this.HARDCAP_PURCHASES.add(this.capIncrease).max(this.SOFTCAP_PURCHASES);
    return this.HARDCAP_PURCHASES.add(this.capIncrease);
  },

  canBuy() {
    return (
      !EternityChallenge(2).isRunning &&
      !EternityChallenge(10).isRunning &&
      (!EternityChallenge(8).isRunning || player.eterc8ids > 0)
    );
  },

  canAutobuy() {
    return this.canBuy() && !EternityChallenge(8).isRunning;
  },

  tick(diff) {
    for (let tier = 8; tier > 1; tier--) {
      InfinityDimension(tier).produceDimensions(InfinityDimension(tier - 1), diff.div(10));
    }

    if (EternityChallenge(7).isRunning) {
      if (DimBoost.maxDimensionsUnlockable === 8) {
        InfinityDimension(1).produceDimensions(AntimatterDimension(7), diff);
      }
    } else {
      InfinityDimension(1).produceCurrency(Currency.infinityPower, diff);
    }

    player.requirementChecks.reality.maxID1 = player.requirementChecks.reality.maxID1.clampMin(
      InfinityDimension(1).amount
    );
  },

  tryAutoUnlock() {
    if (!EternityMilestone.autoUnlockID.isReached || InfinityDimension(8).isUnlocked) return;
    for (const dimension of this.all) {
      // If we cannot unlock this one, we can't unlock the rest, either
      if (!dimension.unlock()) break;
    }
  },

  // Called from "Max All" UI buttons and nowhere else
  buyMax() {
    // Try to unlock dimensions
    const unlockedDimensions = this.all.filter((dimension) => dimension.unlock());

    // Try to buy single from the highest affordable new dimensions
    unlockedDimensions
      .slice()
      .reverse()
      .forEach((dimension) => {
        if (dimension.purchases === 0) dimension.buySingle();
      });

    // Try to buy max from the lowest dimension (since lower dimensions have bigger multiplier per purchase)
    unlockedDimensions.forEach((dimension) => dimension.buyMax(false));
  },

  get powerConversionRate() {
    let base = getAdjustedGlyphEffect("infinityrate").add(7).add(PelleUpgrade.infConversion.effectOrDefault(0));
    base = base.add(SpaceResearchRifts.r45.effectValue);
    let multplier = PelleRifts.paradox.milestones[2].effectOrDefault(1);
    return base.mul(multplier);
  },
};
