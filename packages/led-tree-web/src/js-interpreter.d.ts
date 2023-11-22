declare module 'js-interpreter' {
  class Interpreter {
    constructor(
      code: string,
      initFunction?: (interpreter: Interpreter, globalObject: Object) => void
    );
    step(): boolean;
    run(): boolean;
    setProperty(
      obj: Object,
      name: string,
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      value: any,
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      opt_descriptor?: any
    ): Interpreter | undefined;
    createNativeFunction<T extends CallableFunction>(
      nativeFunc: T,
      isConstructor: boolean = false
    ): T;
    createAsyncFunction<T extends CallableFunction>(
      nativeFunc: T,
      isConstructor: boolean = false
    ): T;
  }

  export default Interpreter;
}
