import { DC } from "../constants";

export const spaceChallenges = [
  {//SC1
    id: 1,
    data:[
      {
        description: `Non-T0 researches are disabled.`,
        goal: `Big Crunch`,
        reward: "T0 Auto Researcher now works at 200% efficiency.",
        reset(){bigCrunchReset(true,true)},
        resetDescription: `Calls a Big Crunch Reset on entering.`,
        isUnlocked(){return PlayerProgress.infinityUnlocked()},
      },
      {
        description: `Space Researches are disabled.`,
        goal: `Big Crunch`,
        reward: "Unlock continuum for AD & Tickspeed.",
        reset(){bigCrunchReset(true,true)},
        resetDescription: `Calls a Big Crunch Reset on entering.`,
        isUnlocked(){return PlayerProgress.hasBroken()},
      },
    ],
  },
  {//SC2
    id: 2,
    data:[
      {
        description: `There is only 4 antimatter dimensions, with Dimension Boosts' & galaxies' cost not modified.`,
        goal: `Big Crunch`,
        reward: "T1 Auto Researcher now works at 200% efficiency.",
        reset(){bigCrunchReset(true,true)},
        resetDescription: `Calls a Big Crunch Reset on entering.`,
        isUnlocked(){return PlayerProgress.infinityUnlocked()},
      },
      {
        description: `There is only 3 antimatter dimensions, with Dimension Boosts' & galaxies' cost not modified.`,
        goal: `Big Crunch`,
        reward: "T1 Research no longer requires reset.",
        reset(){bigCrunchReset(true,true)},
        resetDescription: `Calls a Big Crunch Reset on entering.`,
        isUnlocked(){return PlayerProgress.hasBroken()},
      },
    ],
  },
  {//SC3
    id: 3,
    data:[
      {
        description: `You are stuck in C11, and buying AD requires Matter instead. Matter cannot go below 10.`,
        goal: `Big Crunch`,
        reward: "T2 Auto Researcher now works at 200% efficiency.",
        reset(){bigCrunchReset(true,true)},
        resetDescription: `Calls a Big Crunch Reset on entering.`,
        isUnlocked(){return PlayerProgress.infinityUnlocked()},
      },
      {
        description: `Researches multplies space.
        T0: +0.005x
        T1: +0.02x
        T2: +0.05x
        All of these multpliers are additive. Also disables galaxy.`,
        goal: `Big Crunch`,
        reward: "T2 Research no longer requires reset.",
        reset(){bigCrunchReset(true,true)},
        resetDescription: `Calls a Big Crunch Reset on entering.`,
        isUnlocked(){return PlayerProgress.hasBroken()},
      },
    ],
  },
];
