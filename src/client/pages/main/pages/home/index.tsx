import { Container, Box, Typography, Button, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import { Spacer, PreloadLink } from "@/client/components";
import { useLoggedQuery } from "@/client/graphql/index.graphql";

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    fontWeight: 700,
    [theme.breakpoints.down("sm")]: {
      fontSize: `${theme.spacing(4.5) / theme.typography.fontSize}rem`,
    },
    [theme.breakpoints.between("sm", "md")]: {
      fontSize: `${theme.spacing(7.5) / theme.typography.fontSize}rem`,
    },
    [theme.breakpoints.between("md", "lg")]: {
      fontSize: `${theme.spacing(10) / theme.typography.fontSize}rem`,
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: `${theme.spacing(14) / theme.typography.fontSize}rem`,
    },
  },
  overline: {
    fontSize: theme.spacing(2),
    fontWeight: 700,
    letterSpacing: 2,
  },
}));

export default function Home() {
  const classes = useStyles();
  const { data } = useLoggedQuery();

  return (
    <Container maxWidth="md">
      <Box mt={10} textAlign="center">
        <Typography className={classes.title} component="h1" variant="h1">
          Gerencie
          <br />
          Impulsione
          <br />
          <Typography className={classes.title} component="span" variant="h1" color="primary">
            Condomínios
          </Typography>
          .
        </Typography>
      </Box>
      <Box mt={8} display="flex" justifyContent="center">
        <Spacer>
          {data?.logged ? (
            <Button variant="contained" size="large" color="primary">
              Abrir
            </Button>
          ) : (
            <>
              <Button component={PreloadLink} to="/auth/signin" variant="text" size="large" color="primary">
                Entrar
              </Button>
              <Button component={PreloadLink} to="/auth/signup" variant="contained" size="large" color="primary">
                Cadastre-se
              </Button>
            </>
          )}
        </Spacer>
      </Box>
      <Box mt={8} textAlign="center">
        <Typography color="initial" variant="subtitle1" component="h2">
          Com a domus você consegue gerenciar todas as pendências de seu Condomínio de maneira rápida, acessiva e
          intuitiva.
        </Typography>
      </Box>
      <Box mt={10} textAlign="center">
        <Typography className={classes.overline} variant="button" color="primary">
          Entenda
        </Typography>
      </Box>
    </Container>
  );
}
