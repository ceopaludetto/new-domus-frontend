import { Divider } from "@/client/components";

import { Password } from "./password";
import { Personal } from "./personal";

export default function AppSettingsProfile() {
  return (
    <>
      <Personal />
      <Divider>Senha</Divider>
      <Password />
      <Divider>Área de Risco</Divider>
    </>
  );
}
