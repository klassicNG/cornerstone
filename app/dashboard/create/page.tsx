import { createTask } from "@/app/lib/actions";

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md border border-gray-100">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">New Mission</h1>

        {/* THE MAGIC: The 'action' prop calls your Server Function directly */}
        <form action={createTask} className="space-y-4">
          {/* Task Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              What needs to be done?
            </label>
            <input
              name="title"
              type="text"
              required
              placeholder="e.g., Read Chapter 1, 30 mins Prayer"
              className="w-full p-2 border text-gray-500 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Category Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              name="category"
              className="w-full p-2 border text-gray-500 border-gray-300 rounded-md bg-white"
            >
              <option value="work">Work / Deep Focus</option>
              <option value="faith">Faith / Spirit</option>
              <option value="fitness">Fitness / Health</option>
              <option value="skill">Skill / Learning</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <a
              href="/dashboard"
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800"
            >
              Cancel
            </a>
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              Add to Schedule
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
