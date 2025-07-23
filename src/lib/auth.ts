import { NextRequest } from "next/server";
import { admin } from "./firebaseAdmin";
export async function getUserIdFromRequest(
  request: NextRequest
): Promise<string> {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Unauthorized");
  }
  const token = authHeader.split("Bearer ")[1];
  const decodedToken = await admin.auth().verifyIdToken(token);
  return decodedToken.uid;
}
