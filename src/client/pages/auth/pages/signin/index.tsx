import * as React from "react";
import { Helmet } from "react-helmet-async";
import { useForm, FormProvider } from "react-hook-form";

import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers";
import type { UserInputError } from "apollo-server-express";
import clsx from "clsx";

import { Button, FormControl, PreloadLink, Text } from "@/client/components";
import { Login, LoginMutation, LoginMutationVariables, Logged, LoggedQuery } from "@/client/graphql";
import { SignInSchema, SignInValues } from "@/client/helpers/validations/signin.schema";
import { useVisibility } from "@/client/hooks";
import u from "@/client/styles/utils.scss";

export default function SignIn() {
  const [genericError, setGenericError] = React.useState(false);
  const [login, { client }] = useMutation<LoginMutation, LoginMutationVariables>(Login);
  const methods = useForm<SignInValues>({ resolver: yupResolver(SignInSchema) });
  const [getFieldProps] = useVisibility();

  const submit = methods.handleSubmit(async (data) => {
    setGenericError(false);
    try {
      await login({
        variables: {
          input: data,
        },
      });

      client.writeQuery<LoggedQuery>({
        query: Logged,
        data: {
          __typename: "Query",
          logged: true,
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
      <form noValidate autoComplete="on" onSubmit={submit}>
        <Helmet>
          <title>Login</title>
        </Helmet>
        <Text as="span" color="primary" variant="subtitle-1">
          Login
        </Text>
        <Text gutter as="h1" variant="headline-5">
          Bem vindo de volta
        </Text>
        {genericError && (
          <Text variant="body-2" color="error">
            Falha ao realizar login
          </Text>
        )}
        <FormControl autoComplete="on" autoFocus label="Login" name="login" id="login" />
        <FormControl
          autoComplete="password"
          label="Senha"
          name="password"
          id="password"
          helperText={
            <PreloadLink as={Text} variant="body-2" color="primary" link to="/auth/forgot">
              Esqueceu a senha?
            </PreloadLink>
          }
          {...getFieldProps()}
        />
        <div className={u["pt-xs-2"]}>
          <Button disabled={methods.formState.isSubmitting} block variant="contained" type="submit">
            Entrar
          </Button>
        </div>
        <div className={clsx(u["text-align-xs-center"], u["mt-xs-4"])}>
          <PreloadLink as={Button} variant="flat" block color="primary" to="/auth/signup/step-1">
            Cadastre-se
          </PreloadLink>
        </div>
      </form>
    </FormProvider>
  );
}
