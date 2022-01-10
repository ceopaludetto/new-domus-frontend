import { BiBuildings } from "react-icons/bi";
import { FiUser, FiLock } from "react-icons/fi";

import { SidePage } from "@/client/components";

const basePattern = "/application/:condominium/settings/";

export default function ApplicationSettings() {
  return (
    <SidePage
      title="Ajustes"
      options={[
        { label: "Conta", description: "Informações pessoais, área de risco.", to: "", icon: FiUser },
        { label: "Segurança", description: "Senha, 2FA.", to: "security", icon: FiLock },
        {
          label: "Condomínio",
          description: "Informações de condomínio, caractere especial.",
          to: "condominium",
          icon: BiBuildings,
        },
      ]}
      basePattern={basePattern}
    />
  );
}
