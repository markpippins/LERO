# Linux Environment Resource Orchestrator

This repository contains a **TypeSpec-based generator** for managing and deploying your home lab infrastructure, including:

- Samba/NFS file servers  
- Docker Swarm / Compose services  
- Raspberry Pi / Odroid SBC clusters  
- Automatic permission and directory setup  

The generator produces all necessary configuration files and can deploy them remotely from a central admin node (Osmium).

---

## **Features**

- **Single source of truth:** All hosts, services, volumes, and shares defined in `lero_config.json`  
- **Dependency tracking:** Directories → permissions → Samba → Docker  
- **Remote deployment:** One script runs commands on all hosts via SSH  
- **Scalable:** Supports dozens of hosts and multiple Samba shares or Docker volumes  
- **Type-safe:** Enums for volume types, drivers, and restart policies  
- **Template-driven:** Samba and Docker templates decoupled from logic  

---

## **Directory Structure**
