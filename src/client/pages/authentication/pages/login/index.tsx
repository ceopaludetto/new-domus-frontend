import { FormProvider, useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Grid, Typography, Box, Link } from "@mui/material";

import { AuthenticationPaper, PreloadLink, TextField } from "@/client/components";
import { ProfileDocument, useLoginMutation } from "@/client/graphql";
import { useVisibility } from "@/client/utils/hooks";
import { LoginSchema, LoginSchemaValues } from "@/client/utils/validation/login.schema";

export default function AuthenticationLogin() {
  const [login] = useLoginMutation({ refetchQueries: [ProfileDocument] });

  const [mapToProps] = useVisibility(["password"]);
  const form = useForm<LoginSchemaValues>({
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(LoginSchema),
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    await login({ variables: { input: values } });
  });

  return (
    <FormProvider {...form}>
      <Box textAlign="center">
        <AuthenticationPaper>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h4" gutterBottom>
                  Bem vindo de volta
                </Typography>
                <Typography color="textSecondary">Preencha suas credenciais para acessar sua conta.</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField label="E-mail" id="email" name="email" autoFocus />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Senha" id="password" name="password" {...mapToProps("password")} />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" fullWidth size="large">
                  Entrar
                </Button>
              </Grid>
            </Grid>
          </form>
        </AuthenticationPaper>
        <Typography color="textSecondary">
          Ainda não tem uma conta?{" "}
          <Link component={PreloadLink} to="/authentication/forgot">
            Criar nova conta
          </Link>
          .
        </Typography>
      </Box>
    </FormProvider>
  );
}
