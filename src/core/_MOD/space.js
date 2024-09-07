import { DC } from "../constants";

function getSpaceNerfExponent() {
  return 0.925; //dilated ^0.925
}

export function getSpaceDivisor() {
  //space amount divisor
  let divisor = new Decimal(1);
  divisor = divisor.mul(SpaceResearchRifts.r22.effectValue);
  if (isSCRunningOnTier(3, 2)) {
    let sc3Nerf = DC.D1;
    SpaceResearchTierDetail[0].forEach((x) => (sc3Nerf = sc3Nerf.add(SpaceResearchRifts[x].level.mul(0.1))));
    SpaceResearchTierDetail[1].forEach((x) => (sc3Nerf = sc3Nerf.add(SpaceResearchRifts[x].level.mul(0.3))));
    SpaceResearchTierDetail[2].forEach((x) => (sc3Nerf = sc3Nerf.add(SpaceResearchRifts[x].level.mul(0.6))));
    divisor = divisor.div(sc3Nerf);
  }
  divisor = divisor.div(light.white.effectValue());
  return divisor.pow(player.spaceDivisiorActivePercentage);
}

export function getEffectiveSpace() {
  let effectiveSpace = player.space.mul(getEffectiveSpaceMult()).mul(light.cyan.effectValue());
  return effectiveSpace;
}

export function getSpaceAfterCalc() {
  return player.space.div(getSpaceDivisor());
}

export function getEffectiveSpaceMult() {
  let effectiveMult = new Decimal(1);
  effectiveMult = effectiveMult.mul(SpaceResearchRifts.r42.effectValue);
  return effectiveMult;
}

export function getAMMultplier() {
  let amMult = new Decimal(1);
  amMult = amMult.mul(SpaceResearchRifts.r11.effectValue);
  amMult = amMult.timesEffectsOf(InfinityUpgrade.dim45mult);
  amMult = amMult.mul(light.red.effectValue());
  return amMult;
}

function getSpaceAmount(realAM) {
  //calc space amount
  let baseSpace = Decimal.pow10(realAM.max(10).log10().pow(1 - getSpaceNerfExponent()))
    .pow(2)
    .div(100)
    .sub(1); //100 ^ lg(realAM) ^ (1-dil) /100 -1
  return baseSpace;
}

export function getSpaceNerf(space = getSpaceAfterCalc()) {
  return space.add(1).log10().div(3).add(1);
}

export function produceAM(proc, diff) {
  let recordAM = player.antimatter;

  let amMult = getAMMultplier();
  let realAM = player.antimatter.div(amMult).pow(getSpaceNerf());
  let pendingAM = realAM.add(proc);
  player.space = getSpaceAmount(pendingAM);
  Currency.antimatter.value = pendingAM.root(getSpaceNerf()).mul(amMult);
  player.records.totalAntimatter = player.records.totalAntimatter.max(player.antimatter);

  player.amProc = player.antimatter
    .sub(recordAM)
    .div(diff.div(1000))
    .max(0);

  //some precision bugs happened after using BE and has to do so
  if(player.dimensions.antimatter[0].amount.eq(0)) Currency.antimatter.bumpTo(10)
}

export function updateSpaceItems(diff) {
  updateSpaceResearches(diff);
  if (isSCRunningOnTier(3, 1)) Currency.matter.bumpTo(10);
  if (Player.isInSpaceChallenge) if (Player.spaceChallenge.canComplete) Player.spaceChallenge.complete();
}
