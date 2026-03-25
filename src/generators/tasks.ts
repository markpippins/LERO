import type { HomelabConfig, Task, TasksFile } from "./types.js";

/**
 * Generates tasks.json with deployment tasks
 */
export function generateTasks(config: HomelabConfig): TasksFile {
  const tasks: Task[] = [];

  // Task 1: Create directories on all hosts
  const dirsToCreate = new Set<string>();
  for (const volume of config.volumes) {
    dirsToCreate.add(volume.path);
  }

  tasks.push({
    name: "create_directories",
    command: `mkdir -p ${Array.from(dirsToCreate).join(" ")}`,
    depends_on: [],
  });

  // Task 2: Set permissions
  for (const volume of config.volumes) {
    tasks.push({
      name: `set_permissions_${volume.name}`,
      command: volume.permissions_strategy.chown_command,
      depends_on: ["create_directories"],
    });
  }

  // Task 3: Setup NFS server (if NFS volumes exist)
  const nfsVolumes = config.volumes.filter((v) => v.type === "nfs");
  if (nfsVolumes.length > 0) {
    tasks.push({
      name: "setup_nfs_server",
      command:
        "apt-get install -y nfs-kernel-server && systemctl enable nfs-kernel-server",
      depends_on: ["create_directories"],
    });

    tasks.push({
      name: "export_nfs_shares",
      command: "exportfs -ra && systemctl restart nfs-kernel-server",
      depends_on: ["setup_nfs_server"],
    });
  }

  // Task 4: Setup Docker Swarm
  const swarmManagers = config.hosts.filter((h) =>
    h.roles.includes("swarm_manager")
  );
  if (swarmManagers.length > 0) {
    tasks.push({
      name: "init_docker_swarm",
      command: `docker swarm init --advertise-addr ${swarmManagers[0].ip}`,
      depends_on: [],
    });

    const swarmWorkers = config.hosts.filter((h) =>
      h.roles.includes("swarm_worker")
    );
    for (const worker of swarmWorkers) {
      tasks.push({
        name: `join_swarm_${worker.name}`,
        command: `docker swarm join --token <TOKEN> ${swarmManagers[0].ip}:2377`,
        depends_on: ["init_docker_swarm"],
      });
    }
  }

  // Task 5: Deploy services
  for (const service of config.services) {
    if (service.swarm) {
      tasks.push({
        name: `deploy_${service.name}`,
        command: `docker service create --name ${service.name} ${service.container_image}`,
        depends_on: swarmManagers.length > 0 ? ["init_docker_swarm"] : [],
      });
    } else {
      tasks.push({
        name: `start_${service.name}`,
        command: `docker run -d --name ${service.name} ${service.container_image}`,
        depends_on: [],
      });
    }
  }

  return { tasks };
}
