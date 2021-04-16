import { Header, Footer, RouteHandler } from "@/client/components";
import type { RouteComponentProps } from "@/client/utils/types";

export default function Main({ routes }: RouteComponentProps) {
  return (
    <>
      <Header />
      <RouteHandler routes={routes} />
      <Footer />
    </>
  );
}
