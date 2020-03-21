import React from "react";

import { useQuery } from "@apollo/react-hooks";
import { ThemeProvider } from "emotion-theming";

import { Button } from "@/client/components";
import { FindAllUsuarios } from "@/client/graphql/usuario.gql";
import { theme } from "@/client/providers/theme";

import { Normalize } from "./styles/normalize";

export function App() {
  const { data, loading } = useQuery<FindAllUsuariosQuery>(FindAllUsuarios);

  return (
    <ThemeProvider theme={theme}>
      <Normalize />
      {loading && <div>carregando</div>}
      {!loading && (
        <ul>
          {data?.findAllUsuarios.map(u => (
            <li key={u.id}>{u.nome}</li>
          ))}
        </ul>
      )}
      <Button variant="flat">Anterior</Button>
      <Button>Anterior</Button>
      <Button variant="flat">Próximo</Button>
      <Button>Próximo</Button>
      <Button block>Próximo</Button>
    </ThemeProvider>
  );
}
