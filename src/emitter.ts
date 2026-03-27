import { EmitContext, emitFile, Program } from "@typespec/compiler";
import * as fs from "fs";
import * as path from "path";
import {
  generateTasks,
  generateDockerVolumes,
  generateDockerServices,
  generateSambaConfig,
  generateNFSExports,
  type LEROConfig,
} from "./generators/index.js";

export async function $onEmit(context: EmitContext) {
  const program = context.program;
  const projectRoot = process.cwd();
  const configPath = path.resolve(projectRoot, "src/lero_config.json");

  let config: LEROConfig;
  try {
    const configContent = fs.readFileSync(configPath, "utf-8");
    config = JSON.parse(configContent);
  } catch (e) {
    program.reportDiagnostic({
      code: "lero/config-not-found",
      severity: "error",
      message: `Could not read LERO config from ${configPath}`,
      target: program as any,
    });
    return;
  }

  const outputDir = path.resolve(projectRoot, "output");

  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Generate tasks.json
  const tasksContent = generateTasks(config);
  await emitFile(program, {
    path: path.join(outputDir, "tasks.json"),
    content: JSON.stringify(tasksContent, null, 2),
  });

  // Generate docker-volumes.yml
  const dockerVolumesContent = generateDockerVolumes(config);
  await emitFile(program, {
    path: path.join(outputDir, "docker-volumes.yml"),
    content: dockerVolumesContent,
  });

  // Generate docker-services.yml
  const dockerServicesContent = generateDockerServices(config);
  await emitFile(program, {
    path: path.join(outputDir, "docker-services.yml"),
    content: dockerServicesContent,
  });

  // Generate smb.conf
  const smbContent = generateSambaConfig(config);
  await emitFile(program, {
    path: path.join(outputDir, "smb.conf"),
    content: smbContent,
  });

  // Generate NFS exports
  const nfsContent = generateNFSExports(config);
  await emitFile(program, {
    path: path.join(outputDir, "exports"),
    content: nfsContent,
  });
}
