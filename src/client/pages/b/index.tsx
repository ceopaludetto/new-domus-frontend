import * as React from "react";

import { useQuery } from "@apollo/react-hooks";

import { PreloadLink } from "@/client/components";
import { ShowAllUsersQuery } from "@/client/graphql/operations";
import { ShowAllUsers } from "@/client/graphql/usuario.gql";
import { Client } from "@/client/utils/common.dto";

export default function B() {
  const { loading, data } = useQuery<ShowAllUsersQuery>(ShowAllUsers);

  return (
    <>
      {loading && <>carregando</>}
      <ul>{!loading && data?.showUsers && data?.showUsers?.map((u) => <li key={u.person.id}>{u.person.email}</li>)}</ul>
      <PreloadLink to="/">main</PreloadLink>
    </>
  );
}

B.fetchBefore = async (client: Client) => {
  await client.query<ShowAllUsersQuery>({ query: ShowAllUsers });
};
