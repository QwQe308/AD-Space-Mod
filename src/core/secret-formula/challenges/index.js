import { spaceChallenges } from "../../_MOD/space-challenges/space-challenges-config";
import { eternityChallenges } from "./eternity-challenges";
import { infinityChallenges } from "./infinity-challenges";
import { normalChallenges } from "./normal-challenges";

export const challenges = {
  normal: normalChallenges,
  infinity: infinityChallenges,
  eternity: eternityChallenges,
  space: spaceChallenges,
};
