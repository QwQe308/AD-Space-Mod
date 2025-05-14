import { DC } from "../../constants";

export const spaceChallenges = [
  {
    //SC1
    id: 1,
    data: [
      {
        description: `Non-T0 researches are disabled.`,
        goal: `Big Crunch`,
        reward: "T0 Auto Researcher now works at 200% efficiency.",
        rewardDisplayOrder: 1,
        reset() {
          bigCrunchReset(true, true);
        },
        exit() {},
        resetDescription: `Calls a Big Crunch Reset on entering.`,
        isUnlocked() {
          return PlayerProgress.infinityUnlocked();
        },
      },
      {
        description: `Pre-Infinity Space Researches are disabled.`,
        goal: `Big Crunch`,
        reward:
          "Unlock continuum for AD & Tickspeed.(Disabled if not having Infinity broken) Unlock another T3 research.",
        rewardDisplayOrder: 4,
        reset() {
          bigCrunchReset(true, true);
        },
        exit() {},
        resetDescription: `Calls a Big Crunch Reset on entering.`,
        isUnlocked() {
          return PlayerProgress.hasBroken();
        },
      },
    ],
  },
  {
    //SC2
    id: 2,
    data: [
      {
        description: `There is only 4 antimatter dimensions, with Dimension Boosts' & Galaxies' cost not modified.`,
        goal: `Big Crunch`,
        reward: "T1 Auto Researcher now works at 200% efficiency.",
        rewardDisplayOrder: 2,
        reset() {
          bigCrunchReset(true, true);
        },
        exit() {},
        resetDescription: `Calls a Big Crunch Reset on entering.`,
        isUnlocked() {
          return PlayerProgress.infinityUnlocked();
        },
      },
      {
        description: `There is only 4 antimatter dimensions, and you cannot buy any Galaxies.`,
        goal: `Big Crunch`,
        reward: "T1 Research no longer requires reset.",
        rewardDisplayOrder: 5,
        reset() {
          bigCrunchReset(true, true);
        },
        exit() {},
        resetDescription: `Calls a Big Crunch Reset on entering.`,
        isUnlocked() {
          return PlayerProgress.hasBroken();
        },
      },
    ],
  },
  {
    //SC3
    id: 3,
    data: [
      {
        description: `You are stuck in C11, and buying AD requires Matter instead. Matter cannot go below 10.`,
        goal: `Big Crunch`,
        reward: "T2 Auto Researcher now works at 200% efficiency.",
        rewardDisplayOrder: 3,
        reset() {
          bigCrunchReset(true, true);
        },
        exit() {},
        resetDescription: `Calls a Big Crunch Reset on entering.`,
        isUnlocked() {
          return PlayerProgress.infinityUnlocked();
        },
      },
      {
        description: `Researches multplies space.
        T0: +0.1x
        T1: +0.3x
        T2: +0.6x
        All of these multpliers are additive. Also disables galaxy, some T4 researches, first 6 break infinity upgrades.`,
        goal: `Big Crunch`,
        reward: "T2 Research no longer requires reset.",
        rewardDisplayOrder: 6,
        reset() {
          bigCrunchReset(true, true);
        },
        exit() {},
        resetDescription: `Calls a Big Crunch Reset on entering.`,
        isUnlocked() {
          return PlayerProgress.hasBroken();
        },
      },
    ],
  },
  {
    //SC4
    id: 4,
    data: [
      {
        description: `Only multpliers affecting every AD works. (i.e. IU11)`,
        goal: `Big Crunch`,
        reward: `Unlocks T3 Auto Researcher.`,
        rewardDisplayOrder: 7,
        reset() {
          bigCrunchReset(true, true);
        },
        exit() {},
        resetDescription: `Calls a Big Crunch Reset on entering.`,
        isUnlocked() {
          return PlayerProgress.hasBroken();
        },
      },
      {
        description: `Only multpliers affecting every single AD works. (i.e. Buymult)`,
        goal: `Big Crunch`,
        reward: `T3 Research no longer requires reset.`,
        rewardDisplayOrder: 8,
        reset() {
          eternity(true, true);
        },
        exit() {
          eternity(true, true);
        },
        resetDescription: `Calls a Eternity Reset on entering.`,
        isUnlocked() {
          return PlayerProgress.reachedEternities(2);
        },
      },
    ],
  },

  {
    //SC5
    id: 5,
    data: [
      {
        description: `Infinity cannot be broken and disable IP & IS multiplier. All NC and Infinity / Break Upgrades are reseted. /1e6 Research Speed. Completing any NC will x1.6 Research Speed. Also start with 2 IP.`,
        goal: `Complete all NC`,
        reward: `Unlocks T4 Auto Researcher.`,
        rewardDisplayOrder: 9,
        reset() {
          eternity(true, true);
          player.infinityPoints = new Decimal(2);
          player.break = false;
          NormalChallenges.clearCompletions();
          player.infinityUpgrades = new Set();
        },
        exit() {
          eternity(true, true);
          player.break = true;
        },
        resetDescription: `Calls a Eternity Reset on entering.`,
        isUnlocked() {
          return PlayerProgress.reachedEternities(2);
        },
        canComplete() {
          return player.challenge.normal.completedBits === 8190;
        },
        effectValue() {
          return 1e6 / 1.6 ** NormalChallenges.all.filter((x) => x.isCompleted).length;
        },
      },
    ],
  },

  {
    //SC6
    id: 6,
    data: [
      {
        description: `Temporarily unlocks Automator, and you can only use the automator to control anything except cancelling challenges.
        Some extra codes are provided to simulate real runs. Auto retry challenges is disabled. *You may want to keep your code for future eternity runs*`,
        goal: `Eternity`,
        reward: `Unlocks Automator.`,
        rewardDisplayOrder: 10,
        reset() {
          eternity(true, true);
          Tab.automation.subtabs[1].show(true, true);
        },
        exit() {},
        resetDescription: `Calls a Eternity Reset on entering.`,
        isUnlocked() {
          return PlayerProgress.reachedEternities(2);
        },
      },
    ],
  },
];
