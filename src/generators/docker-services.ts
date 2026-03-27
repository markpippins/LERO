import type { LEROConfig, Service } from "./types.js";

/**
 * Generates docker-services.yml
 */
export function generateDockerServices(config: LEROConfig): string {
  const lines: string[] = ["version: '3.8'", "", "services:"];

  for (const service of config.services) {
    lines.push(`  ${service.name}:`);
    lines.push(`    image: ${service.container_image}`);

    if (service.volumes.length > 0) {
      lines.push("    volumes:");
      for (const vol of service.volumes) {
        lines.push(`      - ${vol}:/data/${vol}`);
      }
    }

    if (service.ports.length > 0) {
      lines.push("    ports:");
      for (const port of service.ports) {
        lines.push(`      - "${port}"`);
      }
    }

    if (Object.keys(service.environment).length > 0) {
      lines.push("    environment:");
      for (const [key, value] of Object.entries(service.environment)) {
        lines.push(`      - ${key}=${value}`);
      }
    }

    lines.push(`    restart: ${service.restart_policy}`);

    if (service.swarm) {
      lines.push("    deploy:");
      lines.push("      restart_policy:");
      lines.push(
        `        condition: ${service.restart_policy === "always" ? "any" : "on-failure"}`
      );
    }
  }

  return lines.join("\n");
}
