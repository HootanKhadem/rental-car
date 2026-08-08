/// <reference types="vitest" />
/// <reference types="vite/client" />

declare namespace NodeJS {
  interface Global {
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    window: any;
  }
}
