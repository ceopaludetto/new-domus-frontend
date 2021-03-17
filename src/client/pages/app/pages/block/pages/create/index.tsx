import * as React from "react";
import { FormProvider, useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Grid, Box } from "@material-ui/core";

import { Page, FormControl, Spacer, PreloadLink, FormUpload } from "@/client/components";
import { useCreateBlockMutation } from "@/client/graphql";
import { BlockSchema, BlockValues } from "@/client/helpers/validations/block.schema";
import { useErrorHandler } from "@/client/hooks";

export default function BlockCreate() {
  const [createBlock] = useCreateBlockMutation();
  const methods = useForm<BlockValues>({
    resolver: yupResolver(BlockSchema),
  });
  const { handleError } = useErrorHandler();

  const handleSubmit = methods.handleSubmit(
    handleError<BlockValues>(async ({ image, ...rest }) => {
      await createBlock({ variables: { input: { ...rest, image: image?.[0] } } });
    }, methods.setError)
  );

  return (
    <Page title="Blocos e Apartamentos" subtitle="Criar" helmetProps={{ title: "Novo Bloco" }}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl id="name" name="name" label="Nome do Bloco" />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl id="number" name="number" label="Número de Apartamentos" />
            </Grid>
            <Grid item xs={12}>
              <FormUpload id="image" name="image" label="Imagem" />
            </Grid>
            <Grid item xs={12}>
              <Box textAlign="right">
                <Spacer>
                  <Button component={PreloadLink} to="/app/blocks">
                    Cancelar
                  </Button>
                  <Button type="submit" variant="contained" color="primary">
                    Criar bloco
                  </Button>
                </Spacer>
              </Box>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </Page>
  );
}
