import { FormProvider, useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Grid } from "@material-ui/core";

import { Page, PreloadLink, Spacer, SubmitButton, TextField, Upload } from "@/client/components";
import { useCreateBlockMutation, FindAllBlocksQuery, FindAllBlocksDocument } from "@/client/graphql";
import { useErrorHandler } from "@/client/helpers/hooks";
import { BlockSchema, BlockValues } from "@/client/helpers/validations/block.schema";

export default function AppBlocksCreate() {
  const [create] = useCreateBlockMutation({
    update(cache, { data }) {
      const current = cache.readQuery<FindAllBlocksQuery>({ query: FindAllBlocksDocument });

      if (current) {
        const merge = [...(current.showBlocks?.edges ?? []), { node: data?.createBlock }];

        cache.writeQuery<FindAllBlocksQuery>({
          query: FindAllBlocksDocument,
          data: { ...current, showBlocks: { ...current.showBlocks, edges: merge } },
        });
      }
    },
  });

  const form = useForm<BlockValues>({
    resolver: yupResolver(BlockSchema),
    defaultValues: { name: "", number: 0, images: undefined },
  });

  const [handleErrorAndSubmit] = useErrorHandler(form);

  const handleSubmit = handleErrorAndSubmit(async (values) => {
    await create({ variables: { input: values } });
  });

  return (
    <Page contained title="Criar Bloco" subtitle="Visão Geral">
      <FormProvider {...form}>
        <form onSubmit={handleSubmit} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField name="name" id="name" label="Nome do Bloco" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField type="number" name="number" id="number" label="Capacidade" />
            </Grid>
            <Grid item xs={12}>
              <Upload
                multiple
                crop
                aspect={16 / 9}
                accept="image/*"
                name="images"
                label="Selecione imagens para o bloco"
              />
            </Grid>
            <Grid item xs={12}>
              <Box textAlign="right">
                <Spacer>
                  <Button component={PreloadLink} to="/app/blocks">
                    Cancelar
                  </Button>
                  <SubmitButton color="primary" variant="contained">
                    Criar bloco
                  </SubmitButton>
                </Spacer>
              </Box>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </Page>
  );
}
