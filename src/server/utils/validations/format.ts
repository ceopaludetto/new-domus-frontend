import type { ValidationError } from "class-validator";

type Constraints = { [index: string]: string[] };

type Result = {
  fields: string[];
  messages: Constraints;
  children: { [index: string]: Result };
};

export function formatErrors(errors: ValidationError[]) {
  const constraints: Constraints = {};
  const properties = errors.map((e) => e.property);
  const children: { [index: string]: Result } = {};

  errors.forEach((e) => {
    const messages: string[] = [];

    if (e?.children?.length) {
      children[e.property] = formatErrors(e.children);
    } else {
      if (e.constraints) {
        Object.keys(e.constraints).forEach((ck) => {
          messages.push(e.constraints[ck]);
        });
      }

      constraints[e.property] = messages;
    }
  });

  const res: Result = {
    fields: properties,
    messages: constraints,
    children,
  };

  if (!Object.keys(res.children).length) {
    delete res.children;
  }

  return res;
}
