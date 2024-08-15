import { DC } from "../../constants";
import { AutobuyerState } from "../autobuyer";

export class T3AutoResearcherState extends AutobuyerState {
  get data() {
    return player.auto.T3AutoResearcher;
  }

  get name() {
    return `T3 Auto Researcher`;
  }

  get efficiency() {
    if (!this.isUnlocked || !this.data.isActive || !player.auto.autobuyersOn) return 0;
    return 2;
  }

  get isUnlocked() {
    return isSCTierCompleted(4, 1);
  }

  tick() {}
}
