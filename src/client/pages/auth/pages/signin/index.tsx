import * as React from "react";
import { Helmet } from "react-helmet-async";
import { useForm, FormProvider } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers";
import { Button, Box, Typography, Link, Grid } from "@material-ui/core";
import type { UserInputError } from "apollo-server-express";

import { FormControl, PreloadLink } from "@/client/components";
import {
  useLoginMutation,
  LoggedDocument,
  LoggedQuery,
  SelectedCondominiumDocument,
  SelectedCondominiumQuery,
} from "@/client/graphql";
import { SignInSchema, SignInValues } from "@/client/helpers/validations/signin.schema";
import { useVisibility } from "@/client/hooks";

export default function SignIn() {
  const [genericError, setGenericError] = React.useState(false);
  const [login, { client }] = useLoginMutation();
  const methods = useForm<SignInValues>({ resolver: yupResolver(SignInSchema) });
  const [getFieldProps] = useVisibility();

  const submit = methods.handleSubmit(async (data) => {
    setGenericError(false);
    try {
      const res = await login({
        variables: {
          input: data,
        },
      });

      if (res.data?.login.person.condominiums.length) {
        client.cache.writeQuery<SelectedCondominiumQuery>({
          query: SelectedCondominiumDocument,
          data: {
            __typename: "Query",
            selectedCondominium: res.data?.login.person.condominiums[0].id,
          },
        });
      }

      client.cache.writeQuery<LoggedQuery>({
        query: LoggedDocument,
        data: {
          __typename: "Query",
          logged: true,
        },
      });
    } catch (error) {
      if (error.graphQLErrors) {
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
        <Typography component="span" color="primary" variant="subtitle1">
          Login
        </Typography>
        <Typography gutterBottom component="h1" variant="h5">
          Bem vindo de volta
        </Typography>
        {genericError && (
          <Typography variant="body2" color="error">
            Falha ao realizar login
          </Typography>
        )}
        <Box pt={2}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl autoComplete="on" autoFocus label="Login" name="login" id="login" />
            </Grid>
            <Grid item xs={12}>
              <FormControl
                autoComplete="password"
                label="Senha"
                name="password"
                id="password"
                helperText={
                  <Link component={PreloadLink} color="primary" to="/auth/forgot">
                    Esqueceu a senha?
                  </Link>
                }
                {...getFieldProps()}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                disabled={methods.formState.isSubmitting}
                size="large"
                color="primary"
                fullWidth
                variant="contained"
                type="submit"
              >
                Entrar
              </Button>
              <Box mt={2}>
                <Button
                  component={PreloadLink}
                  variant="text"
                  fullWidth
                  size="large"
                  color="primary"
                  to="/auth/signup/step-1"
                >
                  Cadastre-se
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </form>
    </FormProvider>
  );
}
