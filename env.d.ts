declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NAMESPACE: "edu" | "beta" | "canary" | "next";
    }
  }
}
export {};
