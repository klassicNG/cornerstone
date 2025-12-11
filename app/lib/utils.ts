export function calculateStreak(tasks: any[]) {
  // 1. Filter only completed tasks & sort by date (newest first)
  const completedTasks = tasks
    .filter((t) => t.status === "completed")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (completedTasks.length === 0) return 0;

  // 2. Get unique dates (remove duplicates if you did 2 tasks in one day)
  const uniqueDates = Array.from(
    new Set(completedTasks.map((t) => new Date(t.date).toDateString()))
  );

  // 3. Check if the streak is alive (Today or Yesterday must be present)
  const today = new Date().toDateString();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toDateString();

  // If you haven't done anything today OR yesterday, streak is broken.
  if (uniqueDates[0] !== today && uniqueDates[0] !== yesterdayStr) {
    return 0;
  }

  // 4. Count backwards
  let streak = 0;
  let currentDate = new Date();

  // If the latest task was yesterday, start counting from yesterday
  if (uniqueDates[0] === yesterdayStr) {
    currentDate.setDate(currentDate.getDate() - 1);
  }

  for (let i = 0; i < uniqueDates.length; i++) {
    const dateToCheck = currentDate.toDateString();

    // If the date matches, increment streak and move back one day
    if (uniqueDates[i] === dateToCheck) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      // Gap found! Streak ends.
      break;
    }
  }

  return streak;
}
