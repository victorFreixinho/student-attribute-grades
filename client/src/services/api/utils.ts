export default function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return `${error.name ?? "Error"}: ${error.message}`;
  }
  if (typeof error === "string") {
    return error;
  }
  return "An unknown error occurred.";
}
