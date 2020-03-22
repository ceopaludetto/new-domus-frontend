import React from "react";
import { Helmet } from "react-helmet-async";

import { useQuery } from "@apollo/react-hooks";
import { ThemeProvider } from "emotion-theming";

import { Button } from "@/client/components";
import { ShowAllUsers } from "@/client/graphql/usuario.gql";
import { theme } from "@/client/providers/theme";

import { Normalize } from "./styles/normalize";

export function App() {
  const { data, loading } = useQuery<ShowAllUsersQuery>(ShowAllUsers);

  return (
    <ThemeProvider theme={theme}>
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <Normalize />
      {loading && <div>carregando</div>}
      {!loading && (
        <ul>
          {data?.showUsers.map(u => (
            <li key={u.id}>{u.login}</li>
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
