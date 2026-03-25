/**
 * Common types for LERO homelab configuration
 */

export interface Host {
  name: string;
  ip: string;
  roles: string[];
  services: string[];
  volumes: string[];
  networks: string[];
  os: string;
}

export interface Volume {
  name: string;
  type: string;
  path: string;
  hosts: string[];
  permissions_strategy: PermissionsStrategy;
}

export interface PermissionsStrategy {
  description: string;
  user: string;
  uid: number;
  gid: number;
  chmod_folder_mode: string;
  chown_command: string;
  chmod_command: string;
}

export interface Service {
  name: string;
  container_image: string;
  volumes: string[];
  ports: string[];
  environment: Record<string, string>;
  restart_policy: string;
  swarm: boolean;
  k8s: boolean;
}

export interface Network {
  name: string;
  type: string;
  subnet: string;
  gateway: string;
  attach_hosts: string[];
}

export interface HomelabConfig {
  hosts: Host[];
  volumes: Volume[];
  services: Service[];
  networks: Network[];
}

export interface Task {
  name: string;
  command: string;
  depends_on?: string[];
}

export interface TasksFile {
  tasks: Task[];
}
