namespace LERO.Models;

model Volume {
  name: string;
  mount_point: string;
  driver: "local" | "nfs";
  options?: string;
}

model Volumes {
  volumes: Volume[];
}