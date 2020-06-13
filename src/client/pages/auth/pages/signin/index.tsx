import * as React from "react";
import { useForm, FormContext } from "react-hook-form";

import { useMutation } from "@apollo/react-hooks";
import type { UserInputError } from "apollo-server-express";
import clsx from "clsx";

import { Title, SubTitle, Button, FormControl, Link, PreloadLink, ColorText } from "@/client/components";
import { Login } from "@/client/graphql/auth.gql";
import { LoginMutation, LoginMutationVariables } from "@/client/graphql/operations";
import { SignInSchema, SignInValues } from "@/client/helpers/validations/signin.schema";
import { useVisibility, useYupValidationResolver } from "@/client/hooks";
import u from "@/client/styles/utils.scss";

export default function SignIn() {
  const [genericError, setGenericError] = React.useState(false);
  const validationResolver = useYupValidationResolver(SignInSchema);
  const [login] = useMutation<LoginMutation, LoginMutationVariables>(Login);
  const methods = useForm<SignInValues>({ validationResolver });
  const [getFieldProps] = useVisibility();

  async function submit(data: SignInValues) {
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
        methods.setError(field, "graphql", graphQLError.message);
      } else {
        setGenericError(true);
      }
    }
  }

  return (
    <FormContext {...methods}>
      <form noValidate onSubmit={methods.handleSubmit(submit)}>
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
            <PreloadLink as={Button} variant="flat" to="/auth/signup">
              Cadastre-se
            </PreloadLink>{" "}
            <Button variant="raised" type="submit">
              Entrar
            </Button>
          </div>
        </div>
      </form>
    </FormContext>
  );
}
