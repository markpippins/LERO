import type { LEROConfig, Volume } from "./types.js";

/**
 * Generates smb.conf for Samba file sharing
 */
export function generateSambaConfig(config: LEROConfig): string {
  const lines: string[] = [
    "[global]",
    "    workgroup = WORKGROUP",
    "    server string = LERO File Server",
    "    security = user",
    "    map to guest = never",
    "    dns proxy = no",
    "    log file = /var/log/samba/%m.log",
    "    max log size = 1000",
    "    socket options = TCP_NODELAY IPTOS_LOWDELAY",
    "",
  ];

  for (const volume of config.volumes) {
    const shareName = volume.name.replace(/_pool$/, "");
    lines.push(`[${shareName}]`);
    lines.push(`    path = ${volume.path}`);
    lines.push(`    comment = ${volume.permissions_strategy.description}`);
    lines.push("    browseable = yes");
    lines.push("    read only = no");
    lines.push("    guest ok = no");
    lines.push(`    valid users = ${volume.permissions_strategy.user}`);
    lines.push(`    write list = ${volume.permissions_strategy.user}`);
    lines.push(`    create mask = 0664`);
    lines.push(`    directory mask = ${volume.permissions_strategy.chmod_folder_mode}`);
    lines.push("");
  }

  return lines.join("\n");
}
