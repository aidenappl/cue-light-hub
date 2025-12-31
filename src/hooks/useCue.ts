import { useState } from "react";

export type Actions = "ready" | "go" | "stop" | "reset" | "none";

export interface Targets {
  id: number;
  targetName: string;
  targetDescription?: string;
  targetStatus: "active" | "inactive";
  targetAction: Actions;
  targetGroup: string;
  commandID?: number;
  targetID: string;
}

export interface Cue {
  id: number;
  name: string;
  description?: string;
  active?: boolean;
  commands: Command[];
  blockCue?: boolean;
}

export interface Command {
  id: number;
  target: string | string[];
  cueName: string;
  cueDesc?: string;
  action: Actions;
  time?: "inf" | number;
}

export const getTargets = (): Targets[] => {
  return [
    {
      id: 1,
      targetName: "Light Board Operator",
      targetDescription: "Booth LBO",
      targetStatus: "active",
      targetAction: "none",
      targetID: "LBO",
      targetGroup: "light",
    },
    {
      id: 3,
      targetName: "Sound Board Operator",
      targetDescription: "Booth SBO",
      targetStatus: "active",
      targetAction: "none",
      targetID: "SBO",
      targetGroup: "sound",
    },
    {
      id: 5,
      targetName: "Midstage Drape",
      targetDescription: "Traveler",
      targetStatus: "active",
      targetAction: "none",
      targetID: "MSD",
      targetGroup: "trks",
    },
    {
      id: 6,
      targetName: "Track 2",
      targetDescription: "Walls - Castle General",
      targetStatus: "active",
      targetAction: "none",
      targetID: "TRK2",
      targetGroup: "trks",
    },
    {
      id: 7,
      targetName: "Track 3",
      targetDescription: "Walls - Castle Window",
      targetStatus: "active",
      targetAction: "none",
      targetID: "TRK3",
      targetGroup: "trks",
    },
    {
      id: 8,
      targetName: "Track 4",
      targetDescription: "Walls - Castle Door",
      targetStatus: "active",
      targetAction: "none",
      targetID: "TRK4",
      targetGroup: "trks",
    },
    {
      id: 9,
      targetName: "Track 5",
      targetDescription: "Columns - Ice Castle",
      targetStatus: "active",
      targetAction: "none",
      targetID: "TRK5",
      targetGroup: "trks",
    },
    {
      id: 10,
      targetName: "Lineset 1",
      targetDescription: "Chandeliers",
      targetStatus: "active",
      targetAction: "none",
      targetID: "LS1",
      targetGroup: "flys",
    },
    {
      id: 11,
      targetName: "Lineset 2",
      targetDescription: "Beads - Ice Castle",
      targetStatus: "active",
      targetAction: "none",
      targetID: "LS2",
      targetGroup: "flys",
    },
    {
      id: 12,
      targetName: "Main Drape",
      targetDescription: "Front of house",
      targetStatus: "active",
      targetAction: "none",
      targetID: "MD",
      targetGroup: "flys",
    },
  ];
};

export const getCueList = (): Cue[] => {
  return [
    {
      id: 1,
      name: "Cue 1",
      description: "This is the first cue",
      commands: [
        {
          id: 1,
          target: "LBO",
          cueName: "LX1",
          action: "ready",
        },
        {
          id: 2,
          target: "SBO",
          cueName: "SC1",
          action: "ready",
        },
      ],
    },
    {
      id: 2,
      name: "Cue 2",
      description: "This is the second cue",
      commands: [
        {
          id: 3,
          target: "LBO",
          cueName: "LX1",
          action: "go",
          time: 5,
        },
        {
          id: 4,
          target: "SBO",
          cueName: "SC1",
          action: "go",
          time: 5,
        },
      ],
    },
    {
      id: 3,
      name: "Cue 3",
      description: "This is the third cue",
      commands: [
        {
          id: 5,
          target: ["LS1", "LS2", "LS3"],
          cueName: "FLYs1",
          cueDesc: "Fly in screens",
          action: "ready",
        },
        {
          id: 6,
          target: "sound",
          cueName: "SC2",
          action: "ready",
        },
      ],
    },
    {
      id: 4,
      name: "Cue 4",
      description: "This is the fourth cue",
      commands: [
        {
          id: 7,
          target: "LBO",
          cueName: "LX2",
          action: "ready",
        },
        {
          id: 9,
          target: ["LS2", "LS3"],
          cueName: "FLYs1",
          action: "go",
          cueDesc: "Fly in screens",
          time: 5,
        },
      ],
    },
    {
      id: 5,
      name: "Cue 5",
      description: "This is the fifth cue",
      commands: [
        {
          id: 10,
          target: "LBO",
          cueName: "LX2",
          action: "go",
          time: 5,
        },
        {
          id: 8,
          target: "flys",
          cueName: "FLYs10",
          action: "ready",
          time: 5,
        },
      ],
    },
    {
      id: 6,
      name: "Cue 6",
      description: "This is the sixth cue",
      commands: [
        {
          id: 11,
          target: "MD",
          cueName: "FLYs12",
          action: "ready",
        },
      ],
    },
    {
      id: 7,
      name: "Cue 7",
      description: "This is the seventh cue",
      commands: [
        {
          id: 12,
          target: "MD",
          cueName: "FLYs12",
          action: "go",
          time: 5,
        },
      ],
    },
  ];
};

export const useCue = () => {
  const [cueList, setCueList] = useState<Cue[]>([]);
  const [targets, setTargets] = useState<Targets[]>([]);

  const resetStack = () => {
    const cueListCopy = [...cueList];
    cueListCopy.forEach((cue) => {
      cue.active = false;
    });
    setCueList(cueListCopy);
    // clear all targets
    targets.forEach((target) => {
      target.targetAction = "none";
      target.commandID = undefined;
    });
    setTargets([...targets]);
  };

  const fireCue = () => {
    const cueListCopy = [...cueList];
    const activeCue = cueListCopy.find((cue) => cue.active);
    // check if at end of stack
    if (activeCue && activeCue.id === cueListCopy[cueListCopy.length - 1].id) {
      console.log("At end of stack");
      return;
    }
    if (activeCue) {
      activeCue.active = false;
      const nextCue = cueListCopy[cueListCopy.indexOf(activeCue) + 1];
      if (nextCue) {
        nextCue.active = true;
        determineCommands(nextCue);
      }
    } else {
      const firstCue = cueListCopy[0];
      if (firstCue) {
        firstCue.active = true;
        determineCommands(firstCue);
      }
    }

    setCueList(cueListCopy);
  };

  const backCue = () => {
    const cueListCopy = [...cueList];
    const activeCue = cueListCopy.find((cue) => cue.active);
    // check if at beginning of stack
    if (activeCue && activeCue.id === cueListCopy[0].id) {
      console.log("At beginning of stack");
      // remove all actives
      cueListCopy.forEach((cue) => {
        cue.active = false;
      });
      // clear all targets
      targets.forEach((target) => {
        target.targetAction = "none";
        target.commandID = undefined;
      });
      setCueList(cueListCopy);
      return;
    }
    if (activeCue) {
      activeCue.active = false;
      const prevCue = cueListCopy[cueListCopy.indexOf(activeCue) - 1];
      if (prevCue) {
        prevCue.active = true;
        determineCommands(prevCue, true);
      }
    }
    setCueList(cueListCopy);
  };

  const determineCommands = (cue: Cue, forceBlock?: boolean) => {
    if (!cue) {
      return;
    }

    if (cue.blockCue || forceBlock) {
      // reset all targets
      targets.forEach((target) => {
        target.targetAction = "none";
        target.commandID = undefined;
      });
    }

    cue.commands.forEach((command) => {
      // if multiple targets
      if (Array.isArray(command.target)) {
        command.target.forEach((targetID) => {
          const target = targets.filter(
            (target) =>
              target.targetID === targetID || target.targetGroup === targetID
          );
          if (target) {
            target.map((t) => {
              t.targetAction = command.action;
              t.commandID = command.id;
            });
          }
        });
      } else {
        const target = targets.filter(
          (target) =>
            target.targetID === command.target ||
            target.targetGroup === command.target
        );
        if (target) {
          target.map((t) => {
            t.targetAction = command.action;
            t.commandID = command.id;
          });
        }
      }
    });

    setTargets([...targets]);

    // simulate time
    cue.commands.forEach((command) => {
      if (command.action != "go") return;
      if (command.time && command.time !== "inf") {
        if (command.target instanceof Array) {
          // if multiple targets, clear after 5 seconds
          setTimeout(() => {
            (command.target as string[]).forEach((targetID) => {
              const target = targets.filter(
                (target) =>
                  target.targetID === targetID ||
                  target.targetGroup === targetID
              );
              target.map((t) => {
                if (t && command.id === t.commandID) {
                  t.targetAction = "none";
                }
              });
            });
            setTargets([...targets]);
          }, command.time * 1000);
        } else {
          setTimeout(() => {
            const target = targets.filter(
              (target) =>
                target.targetID === command.target ||
                target.targetGroup === command.target
            );
            target.map((t) => {
              if (t && command.id === t.commandID) {
                t.targetAction = "none";
              }
            });
            setTargets([...targets]);
          }, command.time * 1000);
        }
      } else {
        setTimeout(() => {
          const target = targets.filter(
            (target) =>
              target.targetID === command.target ||
              target.targetGroup === command.target
          );
          target.map((t) => {
            if (t && command.id === t.commandID) {
              t.targetAction = "none";
            }
          });
          setTargets([...targets]);
        }, 3000);
      }
    });
  };

  const jumpToCue = (cueID: number) => {
    const cueListCopy = [...cueList];
    const activeCue = cueListCopy.find((cue) => cue.active);
    if (activeCue) {
      activeCue.active = false;
    }
    // clear all targets
    targets.forEach((target) => {
      target.targetAction = "none";
      target.commandID = undefined;
    });
    const nextCue = cueListCopy.find((cue) => cue.id === cueID);
    if (nextCue) {
      nextCue.active = true;
      determineCommands(nextCue);
    }
    setCueList(cueListCopy);
  };

  const addCue = (cue: Cue) => {
    const cueListCopy = [...cueList];
    cueListCopy.push(cue);
    setCueList(cueListCopy);
  };

  const resetTarget = (targetID: string) => {
    const targetsCopy = [...targets];
    const target = targetsCopy.find((target) => target.targetID === targetID);
    if (target) {
      target.targetAction = "none";
      target.commandID = undefined;
    }
    setTargets(targetsCopy);
  };

  const lookupCommandID = (commandID: number) => {
    const command = cueList
      .map((cue) => cue.commands)
      .flat()
      .find((c) => c.id === commandID);
    if (!command) {
      return "none";
    }
    return command.cueName;
  };

  const editCue = (cue: Cue) => {
    if (!cue) {return}
    
    
  };

  const activeCue = cueList.find((cue) => cue.active);

  return {
    cueList,
    setCueList,
    editCue,
    fireCue,
    resetStack,
    backCue,
    addCue,
    activeCue,
    lookupCommandID,
    targets,
    setTargets,
    jumpToCue,
    resetTarget,
  };
};
