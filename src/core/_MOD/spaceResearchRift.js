import { DC } from "../constants";
import { GameMechanicState } from "../utils";
import { getSCCompletions, isSCRunning, isSCRunningOnTier, isSCRunningOnTierOrHigher } from "./space-challenges";

class SpaceResearchRift extends GameMechanicState {
  constructor(config) {
    super(config);
  }

  get canBeApplied() {
    return true;
  }

  get name() {
    return this.config.name;
  }

  get tier(){
    return this.config.tier;
  }

  get rift() {
    return player.spaceResearches[this.config.key];
  }

  get progress() {
    return this.rift.progress;
  }

  set progress(value) {
    this.rift.progress = value;
  }

  get pendingProgress() {
    return this.rift.pendingProgress;
  }

  set pendingProgress(value) {
    this.rift.pendingProgress = value;
  }

  get isActive() {
    return this.rift.active;
  }

  get costScale() {
    return this.config.costScale()
  }

  get level(){
    if(this.config.costScale){
      let max = this.costScale.getMaxBought(0,this.progress,1)
      if(max === null) return DC.D0
      return new Decimal(Math.floor(max.quantity))
    }

    let level = this.config.level(this.progress)
    level = this.config.maxLevel? level.min(this.config.maxLevel) : level
    return level
  }

  get pendingLevel(){
    if(this.config.costScale){
      let max = this.costScale.getMaxBought(0,this.pendingProgress,1)
      if(max === null) return DC.D0
      return new Decimal(Math.floor(max.quantity))
    }

    let level = this.config.level(this.pendingProgress)
    level = this.config.maxLevel? level.min(this.config.maxLevel) : level
    return level
  }

  get requirement(){
    if(this.config.costScale){
      return this.costScale.calculateCost(this.level.toNumber())
    }
    return this.config.requirement(this.level)
  }

  get pendingRequirement(){
    if(this.config.costScale){
      return this.costScale.calculateCost(this.pendingLevel.toNumber())
    }
    return this.config.requirement(this.pendingLevel)
  }

  get lastRequirement(){
    if(this.level.eq(0)) return DC.D0
    if(this.config.costScale){
      return this.costScale.calculateCost(this.level.toNumber()-1)
    }
    return this.config.requirement(this.level.sub(1))
  }

  get lastPendingRequirement(){
    if(this.pendingLevel.eq(0)) return DC.D0
    if(this.config.costScale){
      return this.costScale.calculateCost(this.pendingLevel.toNumber()-1)
    }
    return this.config.requirement(this.pendingLevel.sub(1))
  }

  get percentage() {
    return this.pendingProgress.sub(this.lastPendingRequirement).div(this.pendingRequirement.sub(this.lastPendingRequirement)).min(1).toNumber();
  }

  get description() {
    return this.config.description;
  }

  get effect() {
    let effect = this.config.effect(this.effectValue);//to change
    return effect;
  }

  get effectValue() {
    return this.config.effectValue(this.level);
  }

  get isCustomEffect() { return true; }

  get maxLevel() {
    if(!this.config.maxLevel) return
    return this.config.maxLevel();
  }
  get isMaxed() {
    return this.config.maxLevel? this.level.gte(this.config.maxLevel) : false;
  }

  get resetsNothing(){
    return SpaceResearchResetsNothing[this.tier]()
  }

  reset() {
    this.rift.progress = DC.D0
    this.rift.pendingProgress = DC.D0
  }

  clear() {
    this.rift.progress = this.lastRequirement
    this.rift.pendingProgress = this.lastRequirement
  }

  refresh() {
    this.rift.progress = this.rift.pendingProgress
  }

  toggle() {
    let active = SpaceResearchRifts.all.filter(r => r.isActive).length;
    if (!this.isActive && active >= 2) GameUI.notify.error(`You can only have 2 researches active at the same time!`);
    else this.rift.active = !this.rift.active;
  }

  fill(diff) {
    let efficiency = 0
    if(this.isActive) efficiency += 1
    if(Autobuyer[`T${this.tier}AutoResearcher`]){
      efficiency += Autobuyer[`T${this.tier}AutoResearcher`].efficiency
    }

    if(isSCRunningOnTier(1, 1) && this.tier > 0) return//sc1-1
    if(isSCRunningOnTier(1, 2)) return//sc1-2
    
    // The UI removes the fill button after 100%, so we need to turn it off here
    if (this.isActive && this.isMaxed) {
      this.rift.active = false;
      return;
    }
    if (!efficiency || this.isMaxed) return;

    let res = tierBasedResearchSpeed(this.tier).mul(efficiency).mul(diff/1000)

    this.pendingProgress = this.pendingProgress.add(res).max(this.progress)
    if(this.resetsNothing) this.progress = this.progress.add(res)
  }
}

export const SpaceResearchRifts = mapGameDataToObject(
  GameDatabase.space.spaceResearch,
  config => new SpaceResearchRift(config)
)