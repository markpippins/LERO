# Getting Started with TypeSpec in LERO

LERO is **built around TypeSpec** — a type-driven modeling and code generation system.  
TypeSpec gives LERO **strong typing, validation, and automation**, making your homelab configuration safer and easier to deploy.

This guide shows you how to use TypeSpec to generate your infrastructure from JSON configuration.

---

## 1. Why TypeSpec?

- **Type safety:** Prevent misconfigured volumes, hosts, or services before they hit your servers.  
- **Validation:** Guard clauses ensure paths are absolute, names contain no spaces, and enums are correct.  
- **Automation:** Generates tasks, Docker Compose files, and Samba configs automatically.  
- **Scalable:** Works whether you have 3 or 50 hosts.  
- **Future-proof:** Easy to extend for Kubernetes, NFS, or custom Linux services.  

---

## 2. Install TypeSpec CLI

```bash
npm install -g @typespec/cli