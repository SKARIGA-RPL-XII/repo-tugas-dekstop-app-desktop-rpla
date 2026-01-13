type Task = () => Promise<unknown>;

const tasks: Task[] = [];

export function registerTask(task: Task) {
  tasks.push(task);
}

export async function runAppLoader(onProgress: (p: number) => void) {
  let done = 0;
  const total = tasks.length || 1;

  for (const task of tasks) {
    await task();
    done++;
    onProgress(Math.round((done / total) * 100));
  }
}
