import { DC } from "../../constants";
import { AutobuyerState } from "../autobuyer";

export class T4AutoResearcherState extends AutobuyerState {
  get data() {
    return player.auto.T4AutoResearcher;
  }

  get name() {
    return `T4 Auto Researcher`;
  }

  get efficiency() {
    if (!this.isUnlocked || !this.data.isActive || !player.auto.autobuyersOn) return 0;
    return 2;
  }

  get isUnlocked() {
    return isSCTierCompleted(5, 1);
  }

  tick() {}
}
