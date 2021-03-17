import * as React from "react";
import { MdAdd, MdFilterList } from "react-icons/md";

import { Button, Grid, Card, CardMedia, CardActionArea, CardContent, Typography, IconButton } from "@material-ui/core";

import { Page, PreloadLink, Tooltip, Spacer } from "@/client/components";
import { useShowBlocksQuery } from "@/client/graphql";

export default function BlockList() {
  const { data: blocks } = useShowBlocksQuery();

  return (
    <Page
      title="Blocos e Apartamentos"
      subtitle="Geral"
      actions={
        <Spacer flex>
          <Button
            component={PreloadLink}
            to="/app/blocks/create"
            color="primary"
            variant="contained"
            startIcon={<MdAdd />}
          >
            Novo Bloco
          </Button>
          <Tooltip title="Filtro">
            <IconButton color="default">
              <MdFilterList />
            </IconButton>
          </Tooltip>
        </Spacer>
      }
      helmetProps={{ title: "Blocos e Apartamentos" }}
      maxWidth="xl"
    >
      <Grid container spacing={1}>
        {blocks?.showBlocks?.map((block) => (
          <Grid key={block.id} xs={12} md={4} item>
            <Card variant="outlined">
              <CardActionArea>
                {block.image && <CardMedia image={block.image} />}
                <CardContent>
                  <Typography>{block.name}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Page>
  );
}
