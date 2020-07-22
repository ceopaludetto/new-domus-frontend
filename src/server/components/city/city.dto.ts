import { InputType } from "@nestjs/graphql";

import { City } from "@/server/models";
import { Sortable } from "@/server/utils/sort";

@InputType()
export class CitySortInput extends Sortable(City, ["name", "slug"]) {}
