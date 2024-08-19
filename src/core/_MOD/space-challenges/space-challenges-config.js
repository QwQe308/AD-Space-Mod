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
        resetDescription: `Calls a Big Crunch Reset on entering.`,
        isUnlocked() {
          return PlayerProgress.infinityUnlocked();
        },
      },
      {
        description: `Pre-Infinity Space Researches are disabled.`,
        goal: `Big Crunch`,
        reward: "Unlock continuum for AD & Tickspeed. Unlock another T3 research.",
        rewardDisplayOrder: 4,
        reset() {
          bigCrunchReset(true, true);
        },
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
        reward: `Unlocks T3 Auto Researcher & T3 Auto Researcher works at 200% efficiency.`,
        rewardDisplayOrder: 7,
        reset() {
          bigCrunchReset(true, true);
        },
        resetDescription: `Calls a Big Crunch Reset on entering.`,
        isUnlocked() {
          return PlayerProgress.hasBroken();
        },
      },
    ],
  },
];
