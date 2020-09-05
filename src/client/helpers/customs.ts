import * as Yup from "yup";

import * as Messages from "./constants";

Yup.addMethod(Yup.string, "login", function validate(this: Yup.StringSchema, message: string) {
  return this.test("login", message ?? Messages.LOGIN, (v) => {
    if (!v) {
      return true;
    }

    if (/[\r\n(\-@?=#$\\/%)]+/.test(v)) {
      return false;
    }

    return true;
  });
});
