import { FiPlus } from "react-icons/fi";

import { IconButton } from "@mui/material";

import { Page, PreloadLink, Tooltip } from "@/client/components";

export default function ApplicationBlocks() {
  return (
    <Page
      title="Blocos"
      actions={
        <Tooltip title="Novo Bloco">
          <IconButton component={PreloadLink} to="create" color="primary" aria-label="Novo Bloco">
            <FiPlus />
          </IconButton>
        </Tooltip>
      }
    >
      blocos
    </Page>
  );
}
