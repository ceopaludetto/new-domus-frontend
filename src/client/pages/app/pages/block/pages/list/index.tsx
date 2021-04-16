import { useCallback, useState } from "react";
import { BiTrash, BiEditAlt } from "react-icons/bi";
import { MdAdd, MdFilterList } from "react-icons/md";

import { Button, CardMedia, IconButton, CardHeader, Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import { Page, PreloadLink, Tooltip, Spacer, Masonry, RemoveDialog, Carousel } from "@/client/components";
import {
  useShowBlocksQuery,
  useDeleteBlockMutation,
  ShowBlocksQuery,
  ShowBlocksDocument,
  Image,
} from "@/client/graphql/index.graphql";
import { useSubscribeOnCondominiumChange } from "@/client/hooks";
import type { PreloadOptions } from "@/client/utils/types";
import { imageURL } from "@/client/utils/url";

const useStyles = makeStyles(() => ({
  action: {
    alignSelf: "center",
    marginTop: 0,
  },
}));

export default function BlockList() {
  const classes = useStyles();

  const { data: blocks, refetch } = useShowBlocksQuery();
  const [deleteBlock] = useDeleteBlockMutation({
    update(cache, { data }) {
      const current = cache.readQuery<ShowBlocksQuery>({ query: ShowBlocksDocument });

      if (current) {
        const list = current?.showBlocks?.edges?.filter((item) => item?.node?.id !== data?.deleteBlock.id);

        cache.writeQuery<ShowBlocksQuery>({
          query: ShowBlocksDocument,
          data: { ...current, showBlocks: { edges: list ?? [] } },
        });
      }
    },
  });

  const nodes = blocks?.showBlocks?.edges?.map((edge) => edge.node);

  const [blockID, setBlockID] = useState("");
  const dialog = RemoveDialog.useDialog({
    title: "Você realmente deseja excluir este bloco?",
    content: "Esta ação é irreversível",
    onDelete: () => {
      if (blockID) deleteBlock({ variables: { id: blockID } });
    },
    onClose: () => setBlockID(""),
  });

  useSubscribeOnCondominiumChange(() => refetch());

  const handleRemove = useCallback(
    (id?: string) => {
      if (id) {
        setBlockID(id);
        dialog.handleOpen();
      }
    },
    [dialog]
  );

  const getHeight = useCallback((images?: Partial<Image>[] | null) => {
    if (!images?.length) {
      return "auto";
    }

    const min = Math.min(...images?.map((image) => image?.height ?? 0), 400);

    return min;
  }, []);

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
      <RemoveDialog {...dialog} />
      <Masonry>
        {nodes?.map((block) => (
          <Card key={block?.id} variant="outlined">
            {block?.images?.length && (
              <Carousel count={block?.images.length}>
                {(index) => (
                  <CardMedia
                    component="img"
                    alt={block?.images?.[index].name}
                    image={imageURL(block?.images?.[index].name ?? "")}
                    style={{ height: getHeight(block.images) }}
                  />
                )}
              </Carousel>
            )}
            <CardHeader
              title={block?.name}
              classes={{ action: classes.action }}
              subheader={`N° de Apartamentos: ${block?.number}`}
              titleTypographyProps={{ variant: "body1" }}
              subheaderTypographyProps={{ variant: "body2" }}
              action={
                <Spacer>
                  <Tooltip title="Editar">
                    <IconButton
                      color="secondary"
                      component={PreloadLink}
                      to={`/app/blocks/create/${block?.id}`}
                      aria-label="Editar"
                    >
                      <BiEditAlt />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Excluir">
                    <IconButton color="secondary" aria-label="Excluir" onClick={() => handleRemove(block?.id)}>
                      <BiTrash />
                    </IconButton>
                  </Tooltip>
                </Spacer>
              }
            />
          </Card>
        ))}
      </Masonry>
    </Page>
  );
}

BlockList.fetchBefore = async ({ client }: PreloadOptions) => {
  await client.query({ query: ShowBlocksDocument });
};
