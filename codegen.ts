import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:3000/api/graphql",
  documents: "graphql/**/*.graphql",
  generates: {
    "generated/graphql-frontend.ts": {
      plugins: ["typescript", "typescript-operations", "typescript-react-apollo"],
    },
  },
};

export default config;
