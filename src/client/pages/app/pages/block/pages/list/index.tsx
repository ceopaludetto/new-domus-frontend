import { useCallback, MouseEvent, useState } from "react";
import { FiMoreVertical, FiTrash2, FiEdit } from "react-icons/fi";
import { MdAdd, MdFilterList } from "react-icons/md";

import {
  Button,
  Card,
  CardMedia,
  IconButton,
  CardHeader,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import { Page, PreloadLink, Tooltip, Spacer, Masonry, RemoveDialog } from "@/client/components";
import {
  useShowBlocksQuery,
  useDeleteBlockMutation,
  ShowBlocksQuery,
  ShowBlocksDocument,
} from "@/client/graphql/index.graphql";
import { useSubscribeOnCondominiumChange } from "@/client/hooks";
import type { Client } from "@/client/utils/types";
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
        const list = current?.showBlocks.filter((item) => item.id !== data?.deleteBlock.id);

        cache.writeQuery<ShowBlocksQuery>({
          query: ShowBlocksDocument,
          data: { ...current, showBlocks: list ?? [] },
        });
      }
    },
  });

  const [blockID, setBlockID] = useState("");
  const dialog = RemoveDialog.useDialog({
    title: "Você realmente deseja excluir este bloco?",
    content: "Esta ação é irreversível",
    onDelete: () => {
      if (blockID) deleteBlock({ variables: { id: blockID } });
    },
    onClose: () => setBlockID(""),
  });
  const [anchorEl, setAnchorEl] = useState<Record<string, HTMLButtonElement | undefined>>({});

  useSubscribeOnCondominiumChange(() => refetch());

  const handleMoreOptions = useCallback(
    (id: string) => (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();

      setAnchorEl({ [id]: e.currentTarget });
    },
    []
  );

  const handleRemove = useCallback(
    (id: string) => {
      setBlockID(id);
      setAnchorEl({ [id]: undefined });
      dialog.handleOpen();
    },
    [dialog]
  );

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
        {blocks?.showBlocks?.map((block) => (
          <Card key={block.id} variant="outlined">
            <CardHeader
              title={block.name}
              classes={{ action: classes.action }}
              subheader={`N° de Apartamentos: ${block.number}`}
              titleTypographyProps={{ variant: "body1" }}
              subheaderTypographyProps={{ variant: "body2" }}
              action={
                <>
                  <Tooltip title="Mais Opções">
                    <IconButton aria-label="Mais Opções" onClick={handleMoreOptions(block.id)}>
                      <FiMoreVertical />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    anchorEl={anchorEl[block.id]}
                    open={!!anchorEl[block.id]}
                    onClose={() => setAnchorEl({ [block.id]: undefined })}
                  >
                    <MenuItem component={PreloadLink} to={`/app/blocks/create/${block.id}`}>
                      <ListItemIcon>
                        <FiEdit />
                      </ListItemIcon>
                      <ListItemText primary="Editar" />
                    </MenuItem>
                    <MenuItem button onClick={() => handleRemove(block.id)}>
                      <ListItemIcon>
                        <FiTrash2 />
                      </ListItemIcon>
                      <ListItemText primary="Excluir" />
                    </MenuItem>
                  </Menu>
                </>
              }
            />
            {block.image && <CardMedia component="img" alt={block.name} image={imageURL(block.image)} />}
          </Card>
        ))}
      </Masonry>
    </Page>
  );
}

BlockList.fetchBefore = async (client: Client) => {
  await client.query({ query: ShowBlocksDocument });
};
