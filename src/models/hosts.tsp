namespace LERO.Models;

model Host {
  name: string;
  ip: string;
  role: "swarm-manager" | "swarm-worker" | "plex" | "file-server" | "experimental";
  platform: "pi4" | "nano" | "odroid-c4" | "odroid-hc4" | "pi-zero";
  boot_from: "sd" | "usb" | "emmc";
}

model Hosts {
  hosts: Host[];
}