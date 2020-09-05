interface ConditionalWrapProps<T> {
  condition: boolean;
  wrap: (children: T) => T;
  children: T;
}

export function ConditionalWrap<T>({ condition, wrap, children }: ConditionalWrapProps<T>): T {
  return condition ? wrap(children) : children;
}
