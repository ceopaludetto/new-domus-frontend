import { Box } from "@material-ui/core";

import { Logo } from "@/client/assets/logo";
import { RouteHandler } from "@/client/components";
import type { RouteComponentProps } from "@/client/utils/types";

export default function Auth({ routes }: RouteComponentProps) {
  return (
    <Box height="100vh" display="flex" alignItems="center" justifyContent="center">
      <Box flex="1" display="flex" justifyContent="center" flexWrap="wrap">
        <Box mb={3} flex="0 0 100%" textAlign="center">
          <Logo isLogoType height={45} />
        </Box>
        <RouteHandler routes={routes} />
      </Box>
    </Box>
  );
}
