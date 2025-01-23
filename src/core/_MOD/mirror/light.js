import { DC } from "../../constants";

function calcBaseLight(percentage, mirror = player.light.inMirror) {
  return new Decimal(calcFunctioningPercentage(percentage));
}
function calcComplexLight(light1, light2, light3 = null) {
  if (!light3) return light[light1].amount().min(light[light2].amount());
  return light[light1].amount().min(light[light2].amount()).min(light[light3].amount());
}
function calcFunctioningPercentage(percentage) {
  return percentage * calcPercentMultplier(); //total percent of colors cannot go beyond prisms
}

export function calcPercentMultplier() {
  if (player.light.inMirror) return 1;
  if (!player.light.prisms) return 0;
  return (
    player.light.prisms /
    Math.max(player.light.redPercent + player.light.bluePercent + player.light.greenPercent, player.light.prisms)
  );
}

export const light = {
  red: {
    amount: () => calcBaseLight(player.light.redPercent),
    effectValue(amount = this.amount()) {
      let eff = amount.mul(4).pow(0.9).pow_base(1e6);
      return player.light.inMirror ? eff.recip() : eff;
    },
    effect: (eff) => `AM multiplier ${formatMultplier(eff, 2)}`,
  },
  green: {
    amount: () => calcBaseLight(player.light.greenPercent),
    effectValue(amount = this.amount()) {
      let eff = amount.mul(4).pow(0.9).pow_base(1.01);
      return player.light.inMirror ? eff.recip() : eff;
    },
    effect: (eff) => `Dimension Boost base ${formatMultplier(eff, 2, 2)}`,
  },
  blue: {
    amount: () => calcBaseLight(player.light.bluePercent),
    effectValue(amount = this.amount()) {
      let eff = amount.mul(4).pow(0.9).pow_base(1.3);
      return player.light.inMirror ? eff.recip() : eff;
    },
    effect: (eff) => `Pre-Inf Research Speed ${formatMultplier(eff, 2)}`,
  },

  //complex colors
  yellow: {
    amount: () => calcComplexLight("red", "green"), // Yellow = Red + Green
    effectValue(amount = this.amount()) {
      let eff = amount.mul(4).pow(0.9).pow_base(1.05);
      return player.light.inMirror ? eff.recip() : eff;
    },
    effect: (eff) => `Infinity Dimensions ${formatMultplier(eff, 2, 2)}`,
  },
  purple: {
    amount: () => calcComplexLight("red", "blue"), // Purple = Red + Blue
    effectValue(amount = this.amount()) {
      let eff = amount.mul(4).pow(0.9).div(3);
      return player.light.inMirror ? eff.neg() : eff;
    },
    effect: (eff) => `Free Tickspeed Upgrades ${formatAdd(eff, 2, 2)}`,
  },
  cyan: {
    amount: () => calcComplexLight("blue", "green"), // Cyan = Blue + Green
    effectValue(amount = this.amount()) {
      let eff = amount.mul(4).pow(0.9).pow_base(1.006);
      return player.light.inMirror ? eff.recip() : eff;
    },
    effect: (eff) => `Effective Space ${formatMultplier(eff, 2, 2)}`,
  },
  //Final color
  white: {
    amount: () => calcComplexLight("red", "blue", "green").min(100), // White = Red + Blue + Green
    effectValue(amount = this.amount()) {
      if (!player.light.inMirror) amount = amount.sub(Math.max(player.light.prisms - 200, 0)).max(0);
      let eff = amount.mul(4).pow(0.9).pow_base(1.006);
      return player.light.inMirror ? eff.recip() : eff;
    },
    effect: (eff) => `Space ${formatMultplier(eff, 2, 2)}`,
  },
};
