import * as React from "react";
import { Helmet } from "react-helmet-async";

import { useQuery } from "@apollo/react-hooks";

import OpenSans400 from "@/client/assets/fonts/open-sans-400.woff2";
import OpenSans600 from "@/client/assets/fonts/open-sans-600.woff2";
import { Button, Control, Paper, Switch, Title, SubTitle } from "@/client/components";
import { ShowAllUsersQuery } from "@/client/graphql/operations";
import { ShowAllUsers } from "@/client/graphql/usuario.gql";
import { useMultipleVisibility } from "@/client/hooks";

import "@/client/styles/normalize.scss";

export function App() {
  const [field] = useMultipleVisibility(["password", "repeat-password"]);
  const { data, loading } = useQuery<ShowAllUsersQuery>(ShowAllUsers);

  return (
    <>
      <Helmet htmlAttributes={{ lang: "pt-BR" }}>
        <title>Nest New Graphql</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Testing my all learned skills in web development" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com/" crossOrigin="anonymous" />
        <link rel="preload" href={OpenSans400} as="font" crossOrigin="anonymous" />
        <link rel="preload" href={OpenSans600} as="font" crossOrigin="anonymous" />
      </Helmet>
      {loading && <div>carregando</div>}
      {!loading && (
        <ul>
          {data?.showUsers.map((u) => (
            <li key={u.id}>{u.login}</li>
          ))}
        </ul>
      )}
      <Paper outline>
        <SubTitle>Criação de Usuário</SubTitle>
        <Title>Cadastro</Title>
        <Control label="E-mail" id="email" />
        <Control label="Password" id="password" {...field.getFieldProps("password")} />
        <Control label="Repeat Password" id="repeat-password" {...field.getFieldProps("repeat-password")} />
        <Switch label="Receive updates" id="newsletter" info="When activated app will send news to your e-mail" />
        <Button variant="raised">Salvar</Button>
      </Paper>
    </>
  );
}
