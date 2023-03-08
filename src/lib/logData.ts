import Log from "@/schemas/Log";

export async function logError(
  message: string,
  method = "",
  payload: any = {},
  createdBy: string = ""
) {
  // create new Campaign on MongoDB
  const newCampaign = new Log({
    method,
    message,
    payload,
    createdBy,
    type: "error",
  });

  return newCampaign.save();
}
