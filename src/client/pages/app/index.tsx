import loadable from "@loadable/component";
import { Box } from "@material-ui/core";

import { AppHeader, AppSidebar, RouteHandler } from "@/client/components";
import type { RouteComponentProps } from "@/client/utils/types";

const Cropper = loadable(() => import("@/client/components/cropper"));
const Snackbar = loadable(() => import("@/client/components/snackbar-container"));

export default function App({ routes }: RouteComponentProps) {
  return (
    <>
      <Snackbar />
      <Cropper />
      <AppSidebar />
      <Box ml={{ xs: 0, md: "300px" }}>
        <AppHeader />
        <RouteHandler routes={routes} />
      </Box>
    </>
  );
}
