import { useForm, FormProvider } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { Typography, Button, Grid, Link, Box } from "@material-ui/core";

import { TextField, PreloadLink, AuthPaper } from "@/client/components";
import { MeDocument, useLoginMutation } from "@/client/graphql";
import { useVisibility, useErrorHandler } from "@/client/helpers/hooks";
import { SignInSchema, SignInValues } from "@/client/helpers/validations/signin.schema";

export default function AuthSignin() {
  const [login] = useLoginMutation({
    update(cache, { data }) {
      cache.writeQuery({ query: MeDocument, data: data?.login });
    },
  });

  const [mapVisibility] = useVisibility();
  const form = useForm<SignInValues>({
    resolver: yupResolver(SignInSchema),
    defaultValues: { login: "", password: "" },
  });

  const [handleErrorAndSubmit] = useErrorHandler(form);

  const handleSubmit = handleErrorAndSubmit(async (values) => {
    await login({ variables: { input: values } });
  });

  return (
    <Box>
      <AuthPaper>
        <FormProvider {...form}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="subtitle1" color="primary">
                  Entrar
                </Typography>
                <Typography variant="h4" color="textPrimary" component="h1">
                  Bem vindo de volta!
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField name="login" id="login" label="Login" />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="password"
                  id="password"
                  label="Senha"
                  helperText={
                    <Link component={PreloadLink} to="/auth/forgot">
                      Esqueceu a senha?
                    </Link>
                  }
                  {...mapVisibility()}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" size="large" fullWidth>
                  Entrar
                </Button>
              </Grid>
            </Grid>
          </form>
        </FormProvider>
      </AuthPaper>
      <Box mt={2} textAlign="center">
        <Typography>
          Novo por aqui?{" "}
          <Link component={PreloadLink} to="/auth/signup">
            Criar conta
          </Link>
          .
        </Typography>
      </Box>
    </Box>
  );
}
