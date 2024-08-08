import { GameMechanicState } from "../game-mechanics";

export class SpaceChallengeState extends GameMechanicState {
  constructor(config) {
    super(config);
  }

  /* get unlockAM() {
    return this.config.unlockAM;
  } */

  get isUnlocked() {
    return this.config.data[0].isUnlocked();
  }

  isTierUnlocked(x) {
    return this.config.data[x].isUnlocked();
  }

  get isRunning() {
    return player.challenge.space.current === this.id;
  }

  requestStart() {
    if (!this.isUnlocked) return;
    if (GameEnd.creditsEverClosed) return;
    if (!player.options.confirmations.challenges) {
      this.start();
      return;
    }
    Modal.startSpaceChallenge.show(this.id);//to change
  }

  start() {
    if (!this.isUnlocked || this.isRunning) return;
    // Forces big crunch reset but ensures IP gain, if any.
    this.config.data[this.displayCompletions].reset();
    player.challenge.normal.current = 0;
    player.challenge.space.current = this.id;
  }

  get completions() {
    return player.spaceChalls[this.id]
  }

  isRewardActive(compRequired){
    return compRequired >= this.completions
  }
  
  isNerfActive(tierRequired) {
    return this.isRunning && tierRequired >= this.completions + 1;
  }

  complete() {
    player.spaceChalls[this.id] += 1
    this.exit()
  }

  get maxCompletions() {
    return this.config.data.filter(x => x.isUnlocked()).length
  }

  get isFullyCompleted(){
    return this.completions == this.maxCompletions
  }

  get displayCompletions(){
    return Math.min(this.completions,this.maxCompletions-1)
  }

  get isQuickResettable() {
    return this.config.data[this.displayCompletions].isQuickResettable;
  }

  get description() {
    return this.config.data[this.displayCompletions].description;
  }

  get goal() {
    return this.config.data[this.displayCompletions].goal;
  }

  get reward() {
    return this.config.data[this.displayCompletions].reward
  }

  get resetDescription() {
    return this.config.data[this.displayCompletions].resetDescription
  }

  get canComplete() {
    if(!this.config.data[this.displayCompletions].canComplete) return false
    return this.config.data[this.displayCompletions].canComplete()
  }

  exit() {
    player.challenge.space.current = 0;
    this.config.data[this.displayCompletions].reset()
  }
}

/**
 * @param {number} id
 * @return {SpaceChallengeState}
 */
export const SpaceChallenge = SpaceChallengeState.createAccessor(GameDatabase.challenges.space);

/**
 * @returns {SpaceChallengeState}
 */
Object.defineProperty(SpaceChallenge, "current", {
  get: () => (player.challenge.space.current > 0
    ? SpaceChallenge(player.challenge.space.current)
    : undefined),
});

Object.defineProperty(SpaceChallenge, "isRunning", {
  get: () => SpaceChallenge.current !== undefined,
});

export const SpaceChallenges = {
  /**
   * @type {SpaceChallengeState[]}
   */
  all: SpaceChallenge.index.compact(),
  completeAll() {
    for (const challenge of SpaceChallenges.all) challenge.complete();
  },
  /**
   * Displays a notification if the antimatter gained will surpass the next unlockAM requirement.
   * @param value {Decimal} - total antimatter
   */
  notifyChallUnlock(value) {
    /* if (SpaceChallenges.nextSC === undefined) return;
    for (const sc of SpaceChallenges.all) {
      if (sc.isUnlocked || sc.completions) continue;
      //if (value.lt(sc.unlockAM)) break;
      // This has a reasonably high likelihood of happening when the player isn't looking at the game, so
      // we also give it a tab notification
      TabNotification.ICUnlock.clearTrigger();
      GameUI.notify.infinity(`You have unlocked Space Challenge ${sc.id}`, 7000);
      TabNotification.ICUnlock.tryTrigger();
    } */
  },
  /**
   * @returns {SpaceChallengeState[]}
   */
  get completed() {
    return SpaceChallenges.all.filter(sc => sc.completions);
  }
};

export function getSCCompletions(id){
  return SpaceChallenge(id).completions
}

export function isSCTierCompleted(id, tier){
  return SpaceChallenge(id).completions >= tier
}

export function isSCRunning(id){
  return SpaceChallenge(id).isRunning
}

export function isSCRunningOnTier(id, tier){
  return SpaceChallenge(id).isRunning && SpaceChallenge(id).completions + 1 == tier
}
export function isSCRunningOnTierOrHigher(id, tier){
  return SpaceChallenge(id).isRunning && SpaceChallenge(id).completions + 1 >= tier
}