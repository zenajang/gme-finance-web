export async function register() {
  if (process.env.NODE_ENV === "development" && typeof process.on === "function") {
    process.on("unhandledRejection", (reason) => {
      if (
        reason instanceof Error &&
        reason.message.includes('unrecognized HMR message')
      ) {
        return;
      }
      console.error("Unhandled Rejection:", reason);
    });
  }
}
