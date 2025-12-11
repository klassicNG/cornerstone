import { sql } from "@vercel/postgres";
import Link from "next/link"; // Import this at the top
import { createTask, toggleTask, signOutUser } from "@/app/lib/actions"; // Import the new action
import { calculateStreak } from "@/app/lib/utils";

// 1. Define the Shape of your Data (TypeScript)
interface Task {
  id: string;
  title: string;
  status: "pending" | "completed";
  category: string;
  date: Date;
}

export default async function Page() {
  // 2. Fetch the data directly from the DB
  // For now, we fetch ALL tasks (since we haven't built Login yet)
  const { rows } = await sql<Task>`
    SELECT * FROM tasks ORDER BY date DESC
  `;

  const tasks = rows;

  const streak = calculateStreak(tasks);

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Cornerstone</h1>
            <p className="text-gray-500">Active Recovery Dashboard</p>
          </div>
          <div className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium">
            Streak: {streak} Days
          </div>
          {/* New Sign Out Button */}
          <form action={signOutUser}>
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors">
              Sign Out
            </button>
          </form>
        </div>

        {/* The "Today's Plan" Container */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Today's Mission
            </h2>
            <Link
              href="/dashboard/create"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              + New Task
            </Link>
          </div>

          {/* The List */}
          <div className="divide-y divide-gray-100">
            {tasks.length === 0 ? (
              <p className="p-8 text-center text-gray-500">No tasks found.</p>
            ) : (
              tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
                >
                  {/* The Toggle Form */}
                  <form action={toggleTask}>
                    {/* We pass the ID and Status secretly using hidden inputs */}
                    <input type="hidden" name="id" value={task.id} />
                    <input type="hidden" name="status" value={task.status} />

                    <button
                      type="submit"
                      className={`
                      w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all hover:scale-110
                      ${
                        task.status === "completed"
                          ? "bg-green-500 border-green-500"
                          : "border-gray-300 hover:border-blue-400"
                      }
                    `}
                    >
                      {/* Only show the checkmark if completed */}
                      {task.status === "completed" && (
                        <span className="text-white text-xs font-bold">✓</span>
                      )}
                    </button>
                  </form>

                  {/* Task Details */}
                  <div className="flex-1">
                    <p
                      className={`font-medium ${
                        task.status === "completed"
                          ? "text-gray-400 line-through"
                          : "text-gray-900"
                      }`}
                    >
                      {task.title}
                    </p>
                    <div className="flex gap-2 mt-1">
                      <span className="text-xs font-medium px-2 py-0.5 rounded bg-gray-100 text-gray-600 uppercase">
                        {task.category}
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(task.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
