import { NextRequest } from "next/server";
import { updateSession } from "./controller/authController";

export const middleware = async (request: NextRequest) => {
  return await updateSession(request);
};
