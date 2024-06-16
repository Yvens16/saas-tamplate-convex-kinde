import { ConvexError } from "convex/values";
interface KindeError {
  response: any;
  code: "string",
  message: "string"
}
interface KindeErrors {
  "errors": [
    {
      "code": "string",
      "message": "string"
    }
  ]
}


export function isKindeError(err: unknown): err is KindeError {
  return (typeof err === 'object' &&
    err !== null && 'name' in err && err.name === "ResponseError" && 'response' in err && typeof err.response === 'object');
}

export async function throwErrorMessage(err: unknown): Promise<string | null> {
  if (isKindeError(err)) {
    const error = await err.response.json();
    const message: string = error.errors.reduce((acc: any, curr: { code: any; }, idx: number) => `${acc}${idx !== 0 ? " + " : ""}${curr.code}`, "");
    return message;
  }
  if (err instanceof ConvexError) {
    const convexErrorMessage = err.data;
    return convexErrorMessage;
  }
  if (err instanceof Error) {
    return err.message;
  }
  return "Unknown error";
}