import { useEffect, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Grid, Typography, Box, Link } from "@material-ui/core";

import { AuthPaper, TextField, PreloadLink } from "@/client/components";
import { ResetSchema, ResetValues } from "@/client/helpers/validations/reset.schema";
import type { RouteComponentProps } from "@/client/utils/types";

export default function AuthReset({ location }: RouteComponentProps) {
  const token = useRef<string | null>();

  const form = useForm<ResetValues>({
    resolver: yupResolver(ResetSchema),
    defaultValues: { password: "", repeatPassword: "" },
  });

  const handleSubmit = form.handleSubmit((values) => {
    console.log(values);
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const uri = new URLSearchParams(location.search);

      if (uri.has("t")) {
        token.current = uri.get("t");
      }
    }
  }, [location.search]);

  return (
    <Box>
      <AuthPaper>
        <FormProvider {...form}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="subtitle1" color="primary">
                  Recuperar
                </Typography>
                <Typography variant="h4" color="textPrimary" component="h1">
                  Definir nova senha!
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField name="password" id="password" label="Senha" />
              </Grid>
              <Grid item xs={12}>
                <TextField name="repeatPassword" id="repeatPassword" label="Repetir Senha" />
              </Grid>
              <Grid item xs={12}>
                <Button size="large" type="submit" variant="contained" color="primary" fullWidth>
                  Definir nova senha
                </Button>
              </Grid>
            </Grid>
          </form>
        </FormProvider>
      </AuthPaper>
      <Box mt={2} textAlign="center">
        <Typography>
          Está perdido?{" "}
          <Link component={PreloadLink} to="/auth/signin">
            Voltar para Login
          </Link>
          .
        </Typography>
      </Box>
    </Box>
  );
}
