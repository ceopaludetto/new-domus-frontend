import { FormProvider, useForm } from "react-hook-form";

import { Grid } from "@mui/material";

import { Page, TextField } from "@/client/components";

export default function ApplicationBlocksCreate() {
  const form = useForm();

  return (
    <Page title="Novo Bloco">
      <FormProvider {...form}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField label="Nome" id="name" name="name" />
          </Grid>
        </Grid>
      </FormProvider>
    </Page>
  );
}
