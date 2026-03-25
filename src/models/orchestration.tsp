namespace LERO.Models;

model Task {
  name: string;
  command: string;
  depends_on?: string[];
}

model Orchestration {
  tasks: Task[];
}