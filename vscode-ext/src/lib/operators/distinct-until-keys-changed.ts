import { distinctUntilChanged } from "rxjs/operators";

const distinctUntilKeysChanged = <T>(...keys: (keyof T)[]) =>
  distinctUntilChanged<T>((old, current) => {
    return !keys.map(key => old[key] === current[key]).includes(false);
  });

export default distinctUntilKeysChanged;
