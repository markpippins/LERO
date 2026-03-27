import type { LEROConfig, Volume } from "./types.js";

/**
 * Generates docker-volumes.yml
 */
export function generateDockerVolumes(config: LEROConfig): string {
  const lines: string[] = ["version: '3.8'", "", "volumes:"];

  for (const volume of config.volumes) {
    if (volume.type === "nfs") {
      const nfsServerHost = findNfsServerHost(config, volume);
      const serverIp = nfsServerHost?.ip || "192.168.1.1";

      lines.push(`  ${volume.name}:`);
      lines.push(`    driver: local`);
      lines.push(`    driver_opts:`);
      lines.push(`      type: nfs`);
      lines.push(`      o: addr=${serverIp},rw`);
      lines.push(`      device: ":${volume.path}"`);
    } else {
      lines.push(`  ${volume.name}:`);
      lines.push(`    driver: local`);
    }
  }

  return lines.join("\n");
}

function findNfsServerHost(
  config: LEROConfig,
  volume: Volume
): { ip: string } | undefined {
  return config.hosts.find(
    (h) => volume.hosts.includes(h.name) && !h.roles.includes("swarm_worker")
  );
}
