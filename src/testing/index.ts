import { resolvePath } from "@typespec/compiler";
import { createTestLibrary, TypeSpecTestLibrary } from "@typespec/compiler/testing";
import { fileURLToPath } from "url";

export const LeroTestLibrary: TypeSpecTestLibrary = createTestLibrary({
  name: "LERO",
  packageRoot: resolvePath(fileURLToPath(import.meta.url), "../../../../"),
});
