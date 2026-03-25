import type { HomelabConfig, Volume } from "./types.js";

/**
 * Generates /etc/exports for NFS shares
 */
export function generateNFSExports(config: HomelabConfig): string {
  const lines: string[] = [];
  const nfsVolumes = config.volumes.filter((v) => v.type === "nfs");

  for (const volume of nfsVolumes) {
    const hosts = getHostIps(config, volume);
    const hostsSpec = hosts.length > 0 ? hosts.join(",") : "192.168.1.0/24";
    lines.push(
      `${volume.path}  ${hostsSpec}(rw,sync,no_subtree_check,no_root_squash)`
    );
  }

  return lines.join("\n");
}

function getHostIps(config: HomelabConfig, volume: Volume): string[] {
  return volume.hosts
    .map((hostName) => {
      const host = config.hosts.find((h) => h.name === hostName);
      return host?.ip;
    })
    .filter((ip): ip is string => ip !== undefined);
}
