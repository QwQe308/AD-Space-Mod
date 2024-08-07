<script>
import { getSpaceNerf } from "@/core/_MOD/space";
import { getSpaceDivisor } from "@/core/_MOD/space";

export default {
  name: "HeaderSpaceInfo",
  data() {
    return {
      space: new Decimal(0),
      spaceDivisior: 1,
      nerf: new Decimal(0),
    };
  },
  computed: {
    effectDisplay() {
        let spaceInfo = `Space: ${format(this.space, 2, 3)}`
        if(this.spaceDivisior.neq(1)) spaceInfo += ` (after /${format(this.spaceDivisior, 2, 3)})`
        spaceInfo += ` | AM ^ (1/${format(this.nerf, 2, 3)})`
        return spaceInfo;
    },
  },
  methods: {
    update() {
      this.space = new Decimal(player.space);
      this.spaceDivisior = getSpaceDivisor();
      this.nerf = getSpaceNerf();
    },
  },
};
</script>

<template>
  <div>
    <br>
    {{ effectDisplay }}
  </div>
</template>

<style scoped>

</style>
