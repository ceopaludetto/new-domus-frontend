import * as React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { MdAdd } from "react-icons/md";

import { useMutation, useQuery } from "@apollo/client";
import { Button, Grid } from "@material-ui/core";

import { Page, Modal, FormControl } from "@/client/components";
import {
  CreateBlock,
  CreateBlockMutation,
  CreateBlockMutationVariables,
  ShowBlocks,
  ShowBlocksQuery,
} from "@/client/graphql";

export default function Block() {
  const [newBlock, setNewBlock] = React.useState(false);
  const methods = useForm({
    defaultValues: {
      name: "",
      number: "",
    },
  });
  const [createBlock] = useMutation<CreateBlockMutation, CreateBlockMutationVariables>(CreateBlock, {
    update(cache, { data }) {
      const blocks = cache.readQuery<ShowBlocksQuery>({ query: ShowBlocks });

      if (data?.createBlock && blocks?.showBlocks) {
        cache.writeQuery<ShowBlocksQuery>({
          query: ShowBlocks,
          data: {
            __typename: "Query",
            showBlocks: [...blocks?.showBlocks, data.createBlock],
          },
        });
      }
    },
  });
  const { data } = useQuery<ShowBlocksQuery>(ShowBlocks);

  const handleSubmit = methods.handleSubmit(async ({ name, number }) => {
    try {
      const res = await createBlock({
        variables: {
          input: {
            name,
            number: Number(number),
          },
        },
      });

      if (res.data?.createBlock) {
        setNewBlock(false);
      }
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Page
      title="Blocos e Apartamentos"
      subtitle="Geral"
      actions={
        <Button onClick={() => setNewBlock(true)} color="primary" variant="contained" startIcon={<MdAdd />}>
          Novo Bloco
        </Button>
      }
      maxWidth="xl"
    >
      <Modal
        title="Novo Bloco"
        open={newBlock}
        actions={
          <>
            <Button color="primary" onClick={() => setNewBlock(false)}>
              Cancelar
            </Button>
            <Button disabled={methods.formState.isSubmitting} color="primary" type="submit" onClick={handleSubmit}>
              Adicionar
            </Button>
          </>
        }
        onClose={() => setNewBlock(false)}
      >
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl name="name" id="name" label="Nome" />
              </Grid>
              <Grid item xs={12}>
                <FormControl name="number" id="number" label="Número" />
              </Grid>
            </Grid>
          </form>
        </FormProvider>
      </Modal>
      {data?.showBlocks.map((blocks) => (
        <div key={blocks.id}>{blocks.name}</div>
      ))}
    </Page>
  );
}
