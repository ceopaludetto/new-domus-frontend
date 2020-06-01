import * as React from "react";
import { Helmet } from "react-helmet-async";

import { useQuery } from "@apollo/react-hooks";
import { OutlineVisibility } from "mdi-norm";

import { Button, Control, IconButton } from "@/client/components";
import { ShowAllUsers } from "@/client/graphql/usuario.gql";

import "@/client/styles/normalize.scss";

export function App() {
  const { data, loading } = useQuery<ShowAllUsersQuery>(ShowAllUsers);

  return (
    <>
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      {loading && <div>carregando</div>}
      {!loading && (
        <ul>
          {data?.showUsers.map((u) => (
            <li key={u.id}>{u.login}</li>
          ))}
        </ul>
      )}
      <Button variant="flat">Anterior</Button>
      <Button>Anterior</Button>
      <Button variant="flat">Próximo</Button>
      <Button>Próximo</Button>
      <Button block>Próximo</Button>
      <IconButton>
        <OutlineVisibility />
      </IconButton>
      <Control label="E-mail" id="email" />
      <Control
        type="password"
        label="Password"
        id="password"
        append={
          <IconButton>
            <OutlineVisibility />
          </IconButton>
        }
      />
      <Button>Salvar</Button>
    </>
  );
}
