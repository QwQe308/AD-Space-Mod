import { SpaceResearchRifts } from "./spaceResearchRift";

function getSpaceNerfExponent() {
  return 0.925; //dilated ^0.925
}

export function getSpaceDivisor() {
  //space amount divisor
  let divisor = new Decimal(1);
  divisor = divisor.mul(SpaceResearchRifts.r22.effectValue)
  return divisor;
}

export function getAMMultplier() {
  let amMult = new Decimal(1);
  amMult = amMult.mul(SpaceResearchRifts.r11.effectValue)
  return amMult;
}

function getSpaceAmount(realAM) {
  //calc space amount
  let spaceDivisor = getSpaceDivisor();
  let baseSpace = Decimal.pow10(realAM.max(10).log10() ** (1 - getSpaceNerfExponent()))
    .pow(2)
    .div(100)
    .sub(1); //100 ^ lg(realAM) ^ (1-dil) /100 -1
  return baseSpace.div(spaceDivisor);
}

export function getSpaceNerf(space = player.space) {
  return space.add(1).log10() / 3 + 1;
}

export function produceAM(proc, diff) {
  let recordAM = player.antimatter;

  let amMult = getAMMultplier();
  let realAM = player.antimatter.div(amMult).pow(getSpaceNerf());
  let pendingAM = realAM.add(proc);
  player.space = getSpaceAmount(pendingAM);
  player.antimatter = pendingAM.pow(1 / getSpaceNerf()).mul(amMult);

  player.amProc = player.antimatter.sub(recordAM).div(diff / 1000);
}

export function updateSpaceItems(diff) {
  updateSpaceResearches(diff);
}
