import sanityStudioConfig from "@sanity/eslint-config-studio";
import { fixupConfigRules } from "@eslint/compat";

export default [...fixupConfigRules(sanityStudioConfig)];
