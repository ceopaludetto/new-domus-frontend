import * as React from "react";
import { Helmet } from "react-helmet-async";
import { useForm, FormProvider } from "react-hook-form";

import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers";
import type { UserInputError } from "apollo-server-express";
import clsx from "clsx";

import { Title, SubTitle, Button, FormControl, Link, PreloadLink, ColorText } from "@/client/components";
import { Login } from "@/client/graphql/auth.gql";
import { LoginMutation, LoginMutationVariables } from "@/client/graphql/operations";
import { SignInSchema, SignInValues } from "@/client/helpers/validations/signin.schema";
import { useVisibility } from "@/client/hooks";
import u from "@/client/styles/utils.scss";

export default function SignIn() {
  const [genericError, setGenericError] = React.useState(false);
  const [login] = useMutation<LoginMutation, LoginMutationVariables>(Login);
  const methods = useForm<SignInValues>({ resolver: yupResolver(SignInSchema) });
  const [getFieldProps] = useVisibility();

  const submit = methods.handleSubmit(async (data) => {
    try {
      await login({
        variables: {
          input: data,
        },
      });
    } catch (error) {
      const graphQLError = (error.graphQLErrors as UserInputError[])[0];
      if (graphQLError.extensions.fields) {
        const field: "login" | "password" = graphQLError.extensions.fields[0];
        methods.setError(field, {
          type: "graphql",
          message: graphQLError.message,
        });
      } else {
        setGenericError(true);
      }
    }
  });

  return (
    <FormProvider {...methods}>
      <form noValidate onSubmit={submit}>
        <Helmet>
          <title>Login</title>
        </Helmet>
        <SubTitle>Login</SubTitle>
        <Title>Entrar</Title>
        {genericError && <ColorText color="error">Falha ao realizar login</ColorText>}
        <FormControl label="Login" name="login" id="login" />
        <FormControl
          label="Senha"
          name="password"
          id="password"
          helperText={
            <PreloadLink as={Link} to="/auth/forgot">
              Esqueceu a senha?
            </PreloadLink>
          }
          {...getFieldProps()}
        />
        <div className={clsx(u.row, u["justify-content-xs-flex-end"])}>
          <div className={u.col}>
            <PreloadLink as={Button} variant="flat" to="/auth/signup/step-1">
              Cadastre-se
            </PreloadLink>{" "}
            <Button variant="raised" type="submit">
              Entrar
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
