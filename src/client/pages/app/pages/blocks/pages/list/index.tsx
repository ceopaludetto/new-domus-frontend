import { IoFilter } from "react-icons/io5";

import { Button, Card, CardContent, Grid, IconButton, Typography } from "@material-ui/core";

import { Page, PreloadLink, Spacer, Tooltip } from "@/client/components";
import { Carousel } from "@/client/components/carousel";
import { useFindAllBlocksQuery } from "@/client/graphql";

export default function AppBlocksList() {
  const { data } = useFindAllBlocksQuery();

  const nodes = data?.showBlocks?.edges?.map((item) => item.node);

  return (
    <Page
      title="Blocos"
      subtitle="Visão Geral"
      actions={
        <Spacer>
          <Button component={PreloadLink} to="/app/blocks/create" variant="contained" color="primary">
            Novo Bloco
          </Button>
          <Tooltip title="Filtros">
            <IconButton aria-label="Filtros">
              <IoFilter />
            </IconButton>
          </Tooltip>
        </Spacer>
      }
    >
      <Grid container spacing={3}>
        {nodes?.map((item) => (
          <Grid key={item?.id} item xs={12} md={6} lg={4}>
            <Card variant="outlined">
              <Carousel images={item?.images?.map((image) => image.url) ?? []} aspect={item?.images?.[0].aspectRatio} />
              <CardContent>
                <Typography component="p" color="textSecondary" variant="subtitle2">
                  Capacidade: {item?.number}
                </Typography>
                <Typography>{item?.name}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Page>
  );
}
