export const debounce = (func: Function, duration: number = 500) => {
  let timer: NodeJS.Timeout | null;
  return function (...args: any) {
    // @ts-ignore
    const context: any[] = this;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      func.apply(context, args);
    }, duration);
  };
};
