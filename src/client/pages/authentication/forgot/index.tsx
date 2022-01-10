import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";

import { AuthenticationPaper, PreloadLink } from "@/client/components";

export default function AuthenticationForgot() {
  return (
    <Box textAlign="center">
      <AuthenticationPaper>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              Recuperar Senha
            </Typography>
            <Typography color="textSecondary">Preencha seu e-mail para recuperar sua senha.</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField label="E-mail" id="email" name="email" autoFocus />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth size="large">
              Recuperar
            </Button>
          </Grid>
        </Grid>
      </AuthenticationPaper>
      <Typography color="textSecondary">
        Está perdido?{" "}
        <Link component={PreloadLink} to="/authentication/signin">
          Voltar ao login
        </Link>
        .
      </Typography>
    </Box>
  );
}
