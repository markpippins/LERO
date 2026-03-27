import "./models/hosts.tsp";
import "./models/volumes.tsp";
import "./models/services.tsp";
import "./models/orchestration.tsp";

import "./operations/generateTasks.tsp";
import "./operations/generateDocker.tsp";
import "./operations/generateSamba.tsp";
import "./operations/generateNFS.tsp";
import "./operations/helpers.tsp";

namespace LERO;

using LERO.Models;
using LERO.Operations;

// Entry-point operation
op buildAll(configJson: string): string;
