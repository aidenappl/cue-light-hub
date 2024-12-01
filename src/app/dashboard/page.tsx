"use client";

import Button from "@/components/Button";
import {
  Actions,
  Command,
  Cue,
  getCueList,
  getTargets,
  useCue,
} from "@/hooks/useCue";
import Header from "@/components/dashboard/Header";
import { useEffect, useState } from "react";
import Input from "@/components/Input";
import Select from "@/components/Select/Select";
import Textarea from "@/components/Textarea";

const Dashboard = () => {
  const [commandList, setCommandList] = useState<Command[]>([]);
  const {
    cueList,
    setCueList,
    fireCue,
    backCue,
    activeCue,
    targets,
    jumpToCue,
    setTargets,
    lookupCommandID,
    resetTarget,
    addCue,
  } = useCue();
  useEffect(() => {
    console.log("Cue list", cueList);
  }, [cueList]);

  useEffect(() => {
    setCueList(getCueList());
    setTargets(getTargets());
  }, []);

  return (
    <>
      <Header />
      <div className="p-10">
        <div className="flex flex-row justify-between w-full">
          <div className="w-full">
            <div>
              <Button onClick={fireCue}>Go</Button>
              <Button onClick={backCue}>Back</Button>
            </div>
            <h2 className="text-lg font-semibold">Cue Stack</h2>
            {cueList.map((cue: Cue, idx: number) => {
              return (
                <div
                  key={idx}
                  className={`${
                    cue.active ? "bg-red-200" : ""
                  } w-full h-fit p-2 flex items-center justify-between hover:bg-slate-200 cursor-pointer`}
                >
                  <div onClick={() => jumpToCue(cue.id)}>
                    <h2 className="font-semibold">{cue.name}</h2>
                    <p>{cue.description}</p>
                  </div>
                  <Button style="secondary">Edit</Button>
                </div>
              );
            })}
            <div>
              <h2 className="text-lg font-semibold">Active Cue</h2>
              <div className="p-3 bg-slate-100 rounded border shadow w-fit h-fit min-w-[200px]">
                <h2>{activeCue?.name}</h2>
                <p>{activeCue?.description}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-row w-full">
            <div>
              <h2 className="text-lg font-semibold">New Cue</h2>
              <form
                action={async (formData) => {
                  "use client";
                  addCue({
                    name: formData.get("name") as string,
                    description: formData.get("description") as string,
                    commands: commandList,
                    id: cueList.length + 1,
                  });
                  setCommandList([]);
                }}
                className="flex flex-row"
              >
                <div>
                  <Input label="Name" name="name" />
                  <Textarea label="Description" name="description" />
                  <Button>Create Cue</Button>
                </div>
              </form>
            </div>
            <div>
              <form
                action={(formData) => {
                  "use client";
                  let tar = formData.get("target") as string;
                  let tarArr: string[] = [];
                  let time = formData.get("time") as string;
                  let timeInt = parseInt(time?.toLowerCase().trim());

                  if (tar.includes(",")) {
                    tarArr = tar.split(",").map((t) => t.trim());
                    tar = "";
                  }
                  setCommandList([
                    ...commandList,
                    {
                      id: commandList.length + 1,
                      cueName: formData.get("cueName") as string,
                      cueDesc: formData.get("cueDesc") as string,
                      action: formData.get("action") as Actions,
                      target: tar || tarArr,
                      time: timeInt || 3,
                    },
                  ]);
                }}
              >
                <h3 className="font-semibold">Commands</h3>
                <Input label="Cue Name" name="cueName" />
                <Textarea label="Cue Description" name="cueDesc" />
                <Select
                  label="Action"
                  name="action"
                  items={[
                    { name: "Go", value: "go" },
                    { name: "Ready", value: "ready" },
                    { name: "Stop", value: "stop" },
                    { name: "Reset", value: "reset" },
                  ]}
                ></Select>
                <Input
                  label="Target"
                  name="target"
                  placeholder="target_code or arr"
                />
                <Input label="Time" name="time" placeholder="3s default" />
                <Button>Add Command</Button>
              </form>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Command List</h2>
              {commandList.map((command, idx) => {
                return (
                  <div
                    key={idx}
                    className="p-3 bg-slate-100 rounded border shadow w-fit h-fit min-w-[150px]"
                  >
                    <p>{command.cueName}</p>
                    <p>{command.cueDesc}</p>
                    <p>{command.action}</p>
                    <p>{command.time}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Commands</h2>
          <div className="flex">
            {activeCue?.commands.map((command, idx) => {
              return (
                <div
                  key={idx}
                  className="p-3 bg-slate-100 rounded border shadow w-fit h-fit min-w-[150px]"
                >
                  <p className="font-semibold">{command.cueName}</p>
                  <p>{command.action}</p>
                  <p>{command.time}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="fixed left-0 bottom-0 w-full bg-slate-200 py-4 shadow">
          <h2 className="text-lg font-semibold pl-10 mb-4">Active Targets</h2>
          <div className="grid gap-2 grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8">
            {targets.map((target, idx) => {
              return (
                <div className="w-full h-full flex items-center justify-center">
                  <div
                    onClick={() => resetTarget(target.targetID)}
                    key={idx}
                    className={`p-3 bg-slate-100 rounded border shadow min-w-[190px] cursor-pointer ${
                      target.targetAction == "ready"
                        ? "animate-BLINK-READY"
                        : target.targetAction == "go"
                        ? "bg-green-400"
                        : ""
                    }`}
                  >
                    <b>{target.targetName}</b>
                    <p>
                      {target.targetID} | {target.targetGroup}
                    </p>
                    <p>{target.targetStatus}</p>
                    <p>
                      {target.commandID
                        ? lookupCommandID(target.commandID)
                        : "none"}
                    </p>
                    <p>{target.targetAction}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
