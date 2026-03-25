import { createTypeSpecLibrary } from "@typespec/compiler";

export const $lib = createTypeSpecLibrary({
  name: "LERO",
  diagnostics: {},
});

export const { reportDiagnostic, createDiagnostic } = $lib;
