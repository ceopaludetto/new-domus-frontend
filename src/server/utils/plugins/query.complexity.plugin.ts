import { GraphQLSchemaHost, Plugin } from "@nestjs/graphql";
import { ApolloServerPlugin, GraphQLRequestListener } from "apollo-server-plugin-base";
import { GraphQLError } from "graphql";
import { fieldExtensionsEstimator, getComplexity, simpleEstimator } from "graphql-query-complexity";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";

import { COMPLEXITY } from "@/server/utils/constants";

@Plugin()
export class ComplexityPlugin implements ApolloServerPlugin {
  public constructor(
    private readonly gqlSchemaHost: GraphQLSchemaHost,
    @InjectPinoLogger(ComplexityPlugin.name) private readonly logger: PinoLogger
  ) {}

  public requestDidStart(): GraphQLRequestListener {
    const { schema } = this.gqlSchemaHost;

    const { logger } = this;

    return {
      didResolveOperation({ request, document }) {
        const complexity = getComplexity({
          schema,
          operationName: request.operationName,
          query: document,
          variables: request.variables,
          estimators: [fieldExtensionsEstimator(), simpleEstimator({ defaultComplexity: 1 })],
        });

        if (complexity >= COMPLEXITY) {
          logger.error(`Query is too complex: ${complexity}. Maximum allowed complexity: ${COMPLEXITY}`);
          throw new GraphQLError(`Query is too complex: ${complexity}. Maximum allowed complexity: ${COMPLEXITY}`);
        }

        if (complexity) {
          logger.debug(`Query complexity: ${complexity}`);
        }
      },
    };
  }
}
