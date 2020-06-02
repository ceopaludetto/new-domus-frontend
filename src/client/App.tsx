import * as React from "react";
import { Helmet } from "react-helmet-async";

import { useQuery } from "@apollo/react-hooks";
import { OutlineVisibility } from "mdi-norm";

import { Button, Control, IconButton, Paper } from "@/client/components";
import { ShowAllUsers } from "@/client/graphql/usuario.gql";
import { useMultipleVisibility } from "@/client/hooks";

import "@/client/styles/normalize.scss";

export function App() {
  const [field] = useMultipleVisibility(["password", "repeat-password"]);
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
      <Paper>
        <Button variant="flat">Anterior</Button>
        <Button>Anterior</Button>
        <Button variant="raised">Anterior</Button>
        <Button variant="flat" color="secondary">
          Próximo
        </Button>
        <Button color="secondary">Próximo</Button>
        <Button block>Próximo</Button>
        <IconButton>
          <OutlineVisibility />
        </IconButton>
        <Control label="E-mail" id="email" />
        <Control label="Password" id="password" {...field.getFieldProps("password")} />
        <Control label="Repeat Password" id="repeat-password" {...field.getFieldProps("repeat-password")} />
        <Button variant="raised">Salvar</Button>
      </Paper>
    </>
  );
}
