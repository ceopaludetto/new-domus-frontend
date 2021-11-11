import { Button, Grid, TextField, Typography, Box, Link } from "@mui/material";

import { AuthenticationPaper, PreloadLink } from "@/client/components";

export default function AuthenticationLogin() {
  return (
    <Box textAlign="center">
      <AuthenticationPaper>
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
            <TextField label="Senha" id="password" name="password" />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth size="large">
              Entrar
            </Button>
          </Grid>
        </Grid>
      </AuthenticationPaper>
      <Typography color="textSecondary">
        Ainda não tem uma conta?{" "}
        <Link component={PreloadLink} to="/authentication/forgot">
          Criar nova conta
        </Link>
        .
      </Typography>
    </Box>
  );
}
