import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { RouteComponentProps, useParams } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Grid, Box } from "@material-ui/core";

import { Page, FormControl, Spacer, PreloadLink, FormUpload } from "@/client/components";
import {
  useCreateBlockMutation,
  useUpdateBlockMutation,
  useFindBlockByIdLazyQuery,
  ShowBlocksQuery,
  ShowBlocksDocument,
} from "@/client/graphql/index.graphql";
import { BlockSchema, BlockValues } from "@/client/helpers/validations/block.schema";
import { useErrorHandler, usePreload } from "@/client/hooks";

export default function BlockCreate({ history }: RouteComponentProps) {
  const { id } = useParams<{ id?: string }>();
  const [createBlock] = useCreateBlockMutation();
  const [updateBlock] = useUpdateBlockMutation();
  const [loadBlock, { data: editBlock }] = useFindBlockByIdLazyQuery();
  const { handlePreload } = usePreload();

  const methods = useForm<BlockValues>({
    resolver: yupResolver(BlockSchema),
  });
  const { handleError } = useErrorHandler();

  useEffect(() => {
    if (id) {
      loadBlock({ variables: { id } });
    }
  }, [id, loadBlock]);

  useEffect(() => {
    if (editBlock?.findBlockByID) {
      methods.reset({ name: editBlock.findBlockByID.name, number: editBlock.findBlockByID.number });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editBlock]);

  const handleSubmit = methods.handleSubmit(
    handleError<BlockValues>(async ({ image, ...rest }) => {
      if (id) {
        await updateBlock({ variables: { id, input: { ...rest, image: image?.[0] } } });
      } else {
        await createBlock({
          variables: { input: { ...rest, image: image?.[0] } },
          update: (proxy, { data }) => {
            const currentListData = proxy.readQuery<ShowBlocksQuery>({ query: ShowBlocksDocument });

            proxy.writeQuery({
              query: ShowBlocksDocument,
              data: { ...currentListData, showBlocks: [...(currentListData?.showBlocks ?? []), data?.createBlock] },
            });
          },
        });
      }

      await handlePreload("/app/blocks");
      history.push("/app/blocks");
    }, methods.setError)
  );

  return (
    <Page title="Blocos e Apartamentos" subtitle={id ? "Editar" : "Criar"} helmetProps={{ title: "Novo Bloco" }}>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl id="name" name="name" label="Nome do Bloco" />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl id="number" name="number" label="Número de Apartamentos" inputMode="numeric" />
            </Grid>
            <Grid item xs={12}>
              <FormUpload id="image" name="image" label="Arraste sua imagem aqui ou clique para escolher" />
            </Grid>
            <Grid item xs={12}>
              <Box textAlign="right">
                <Spacer>
                  <Button component={PreloadLink} to="/app/blocks">
                    Cancelar
                  </Button>
                  <Button type="submit" variant="contained" color="primary">
                    {id ? "Editar" : "Criar"} Bloco
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
