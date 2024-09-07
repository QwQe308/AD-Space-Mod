<script>
export default {
  name: "HeaderSpaceInfo",
  data() {
    return {
      space: new Decimal(0),
      spaceDivisior: new Decimal(1),
      ESMult: new Decimal(1),
      nerf: new Decimal(0),
      baseSpace: new Decimal(0)
    };
  },
  computed: {
    effectDisplay() {
      let spaceInfo = `Space: ${format(this.space, 2, 2)}`;
      if (this.spaceDivisior.gt(1)) spaceInfo += ` (after /${format(this.spaceDivisior, 2, 2)})`;
      if (this.spaceDivisior.lt(1)) spaceInfo += ` (after *${format(this.spaceDivisior.recip(), 2, 2)})`;
      if (this.ESMult.neq(1) || this.spaceDivisior.neq(1))
        spaceInfo += ` | Effective Space: ${format(this.baseSpace.mul(this.ESMult), 2, 2)}`;
      if (this.ESMult.neq(1)) spaceInfo += ` (after *${format(this.ESMult, 2, 2)})`;
      spaceInfo += ` | AM ^ (1/${format(this.nerf, 2, 3)})`;
      return spaceInfo;
    },
  },
  methods: {
    update() {
      this.spaceDivisior = getSpaceDivisor();
      this.space = getSpaceAfterCalc();
      this.baseSpace.copyFrom(player.space);
      this.ESMult = getEffectiveSpaceMult();
      this.nerf = getSpaceNerf();
    },
  },
};
</script>

<template>
  <div>
    <br />
    {{ effectDisplay }}
  </div>
</template>

<style scoped></style>
