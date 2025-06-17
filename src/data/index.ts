import { abcComponentId, xyzComponentId } from "@/constant";
export interface FunctionSpec {
  id: string;
  description: string;
  function_internal_id: string;
}

export const abcComponentData = {
  id: abcComponentId,
  description: "Ends the conversation with a successful outcome",
  function_internal_id: "Functions.EndConversation",
};
export const xyzComponentData = {
  id: xyzComponentId,
  description: "Transfers the call to a human representative",
  function_internal_id: "Functions.TransferCall",
};
export const functionSpecs: FunctionSpec[] = [
  abcComponentData,
  xyzComponentData,
];

export const availableFunctions = {
  end: "Functions.End",
  transfer: "Functions.Transfer",
  knowledge: "Functions.Knowledge",
  calendar: "Functions.Calendar",
};
