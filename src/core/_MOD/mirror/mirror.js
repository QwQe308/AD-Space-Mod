import { DC } from "../../constants";

export function reverseMirror() {
  if (player.light.inMirror) {
    if (canBreakMirror()) {
      player.light.prisms = Math.max(player.light.prisms, getPendingPrisms());
    }
  }
  bigCrunchReset(true, true);
  player.light.inMirror = !player.light.inMirror;
}

export function canBreakMirror() {
  return player.records.thisInfinity.maxAM.gte(getMirrorRequirement()) && player.light.inMirror;
}

export function getMirrorRequirement() {
  let highestPercent = Math.max(player.light.redPercent, player.light.greenPercent, player.light.bluePercent);
  return DC.E10000.pow(highestPercent / 100 + 1);
}

export function getPendingPrisms() {
  return player.light.redPercent + player.light.greenPercent + player.light.bluePercent;
}
