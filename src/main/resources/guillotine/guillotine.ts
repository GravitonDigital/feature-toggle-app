import { getFeature, getFeatures, isEnabled } from "/lib/feature-toggles";
import type { GraphQL, Extensions } from "@enonic-types/guillotine";

const OBJECT_TYPE_FEATURE = "Feature";
const FIELD_IS_ENABLED = "isEnabled";
const FIELD_GET_FEATURE = "getFeature";
const FIELD_GET_FEATURES = "getFeatures";

/**
 * `GraphQLFeature` reimplements the `Feature` type to lock down the output shape.
 * We want the build to fail if GraphQLFeature != Feature, so that it doesn't fail in the GraphQL-client.
 */
type GraphQLFeature = {
  id: string;
  name: string;
  enabled: boolean;
  description?: string;
  createdTime: string;
};

export function extensions(graphQL: GraphQL): Extensions {
  return {
    types: {
      [OBJECT_TYPE_FEATURE]: {
        description: "A feature toggle that can be enabled or disabled.",
        fields: {
          id: {
            type: graphQL.nonNull(graphQL.GraphQLID),
          },
          name: {
            type: graphQL.nonNull(graphQL.GraphQLString),
          },
          enabled: {
            type: graphQL.nonNull(graphQL.GraphQLBoolean),
          },
          spaceKey: {
            type: graphQL.nonNull(graphQL.GraphQLString),
          },
          description: {
            type: graphQL.GraphQLString,
          },
          createdTime: {
            type: graphQL.GraphQLString,
          },
        },
      },
    },
    creationCallbacks: {
      HeadlessCms: (params): void => {
        params.addFields({
          [FIELD_IS_ENABLED]: {
            type: graphQL.GraphQLBoolean,
            args: {
              featureKey: graphQL.nonNull(graphQL.GraphQLString),
              spaceKey: graphQL.nonNull(graphQL.GraphQLString),
              branch: graphQL.GraphQLString,
              defaultValue: graphQL.GraphQLBoolean,
            },
          },

          [FIELD_GET_FEATURE]: {
            type: graphQL.reference(OBJECT_TYPE_FEATURE),
            args: {
              featureKey: graphQL.nonNull(graphQL.GraphQLString),
              spaceKey: graphQL.nonNull(graphQL.GraphQLString),
              branch: graphQL.GraphQLString,
            },
          },

          [FIELD_GET_FEATURES]: {
            type: graphQL.list(graphQL.reference(OBJECT_TYPE_FEATURE)),
            args: {
              spaceKey: graphQL.GraphQLString,
              branch: graphQL.GraphQLString,
            },
          },
        });
      },
    },
    resolvers: {
      HeadlessCms: {
        [FIELD_IS_ENABLED]: (env): boolean => {
          return isEnabled({
            spaceKey: env.args.spaceKey,
            featureKey: env.args.featureKey,
            branch: env.args.branch,
            defaultValue: env.args.defaultValue,
          });
        },

        [FIELD_GET_FEATURE]: (env): GraphQLFeature | undefined => {
          return getFeature(`/${env.args.spaceKey}/${env.args.featureKey}`, env.args.branch);
        },

        [FIELD_GET_FEATURES]: (env): GraphQLFeature[] => {
          return getFeatures(env.args.spaceKey, env.args.branch);
        },
      },
    },
  };
}
