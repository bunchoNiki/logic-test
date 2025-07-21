import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";


export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js },
    extends: ["js/recommended"],
    ignores: ["*.config.*"],
    rules: {
      "no-var": "error",
      "max-len": [
        "error",
        {
          "code": 120,
          "ignorePattern": "^\\s*import\\s.+$"
        }
      ],
      "no-console": ["warn"],
      "semi": ["error", "always"],
    }
  },
  { files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], languageOptions: { globals: globals.browser } },
  tseslint.configs.recommended,
]);
