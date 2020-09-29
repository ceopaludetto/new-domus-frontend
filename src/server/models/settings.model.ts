import { Entity, Enum, OneToOne } from "@mikro-orm/core";
import { ObjectType, Field, registerEnumType } from "@nestjs/graphql";

import { SETTINGS } from "@/server/utils/constants";
import { Theme } from "@/server/utils/enums";

import { BaseModel } from "./base.model";
import { User } from "./user.model";

registerEnumType(Theme, {
  name: "Theme",
});

@ObjectType(SETTINGS)
@Entity({ tableName: SETTINGS })
export class Settings extends BaseModel {
  @Field(() => Theme, { defaultValue: Theme.DARK })
  @Enum(() => Theme)
  public theme!: Theme;

  @Field(() => User)
  @OneToOne({ entity: () => User, inversedBy: (user) => user.settings, owner: true, orphanRemoval: true })
  public user!: User;
}
