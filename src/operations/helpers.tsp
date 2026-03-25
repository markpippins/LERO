// Utility functions for mkdir, chmod, chown, validation, etc.

namespace LERO.Operations;

op ensureDirExists(path: string): boolean;

op validateName(name: string): boolean;