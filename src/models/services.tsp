namespace LERO.Models;

model DockerService {
  name: string;
  image: string;
  replicas: int32;
  ports?: string[];
  environment?: Record<string>;
  volumes?: string[];
  restart_policy?: "always" | "unless-stopped" | "no";
}

model Services {
  services: DockerService[];
}