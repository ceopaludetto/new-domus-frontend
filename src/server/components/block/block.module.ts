import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";

import { Block } from "@/server/models";

import { BlockResolver } from "./block.resolver";
import { BlockService } from "./block.service";

@Module({
  imports: [MikroOrmModule.forFeature([Block])],
  providers: [BlockResolver, BlockService],
  exports: [BlockService],
})
export class BlockModule {}
