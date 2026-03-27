
# Contributing to LERO

We welcome contributions! To ensure a smooth workflow:

1. Fork the repository  
2. Create a feature branch: `git checkout -b feature-name`  
3. Make your changes in `src/lero.tsp` or `src/lero_config.json`  
4. Run `./lero.sh` locally to verify the build  
5. Commit and push your changes  
6. Open a Pull Request  

**Tips:**

- Keep TypeSpec models and ops modular  
- Validate `lero_config.json` before running  
- Avoid hardcoding IPs; use JSON host definitions  
- Respect task dependency order when adding new operations
