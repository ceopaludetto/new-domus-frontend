import React from "react";

import { useQuery } from "@apollo/react-hooks";
import "@/client/scss/normalize.scss";

import { Button } from "@/client/components";
import { FindAllUsuarios } from "@/client/graphql/usuario.gql";

export function App() {
  const { data, loading } = useQuery<FindAllUsuariosQuery>(FindAllUsuarios);

  return (
    <>
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
    </>
  );
}
