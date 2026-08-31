
import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

/*
  Temporary frontend data.

  Later this entire data source can be replaced with:
  GET /api/projects?state=bihar

  The UI/filter/sorting logic can remain the same.
*/

const stateProjects = {
  bihar: [
    {
      id: "BR-001",
      name: "Ganga Bridge Development",
      budget: 850,
      expenditure: 620,
      status: "Active",
      progress: 82,
      date: "2026-02-14",
    },
    {
      id: "BR-002",
      name: "Patna Urban Infrastructure",
      budget: 620,
      expenditure: 410,
      status: "Active",
      progress: 68,
      date: "2025-11-20",
    },
    {
      id: "BR-003",
      name: "North Bihar Road Development",
      budget: 540,
      expenditure: 520,
      status: "Completed",
      progress: 100,
      date: "2025-06-18",
    },
    {
      id: "BR-004",
      name: "Muzaffarpur Smart Infrastructure",
      budget: 410,
      expenditure: 245,
      status: "Delayed",
      progress: 54,
      date: "2025-09-12",
    },
    {
      id: "BR-005",
      name: "Bihar Rural Connectivity",
      budget: 780,
      expenditure: 490,
      status: "Active",
      progress: 63,
      date: "2026-01-08",
    },
    {
      id: "BR-006",
      name: "Kosi River Infrastructure",
      budget: 930,
      expenditure: 380,
      status: "At Risk",
      progress: 41,
      date: "2025-08-04",
    },
  ],

  maharashtra: [
    {
      id: "MH-001",
      name: "Mumbai Urban Infrastructure",
      budget: 1250,
      expenditure: 980,
      status: "Active",
      progress: 84,
      date: "2026-01-12",
    },
    {
      id: "MH-002",
      name: "Pune Metro Infrastructure",
      budget: 980,
      expenditure: 790,
      status: "Active",
      progress: 81,
      date: "2025-10-08",
    },
    {
      id: "MH-003",
      name: "Nagpur Transport Development",
      budget: 720,
      expenditure: 720,
      status: "Completed",
      progress: 100,
      date: "2025-05-22",
    },
    {
      id: "MH-004",
      name: "Maharashtra Rural Roads",
      budget: 610,
      expenditure: 340,
      status: "Delayed",
      progress: 57,
      date: "2025-07-15",
    },
    {
      id: "MH-005",
      name: "Nashik Infrastructure Expansion",
      budget: 540,
      expenditure: 290,
      status: "Active",
      progress: 61,
      date: "2026-02-01",
    },
  ],

  gujarat: [
    {
      id: "GJ-001",
      name: "Ahmedabad Infrastructure Expansion",
      budget: 890,
      expenditure: 720,
      status: "Active",
      progress: 86,
      date: "2026-02-10",
    },
    {
      id: "GJ-002",
      name: "Gujarat Highway Development",
      budget: 760,
      expenditure: 580,
      status: "Active",
      progress: 74,
      date: "2025-11-11",
    },
    {
      id: "GJ-003",
      name: "Surat Urban Development",
      budget: 620,
      expenditure: 620,
      status: "Completed",
      progress: 100,
      date: "2025-04-19",
    },
    {
      id: "GJ-004",
      name: "Kutch Connectivity Project",
      budget: 480,
      expenditure: 210,
      status: "At Risk",
      progress: 44,
      date: "2025-08-27",
    },
  ],
};

/*
  Fallback projects for states whose detailed mock records
  haven't been entered yet.
*/
const createFallbackProjects = (stateName) => {
  return Array.from({ length: 8 }, (_, index) => ({
    id: `${stateName.slice(0, 2).toUpperCase()}-${String(index + 1).padStart(3, "0")}`,
    name: `${stateName} Infrastructure Project ${index + 1}`,
    budget: 180 + index * 75,
    expenditure: 100 + index * 45,
    status:
      index % 4 === 0
        ? "Completed"
        : index % 4 === 1
        ? "Delayed"
        : index % 4 === 2
        ? "At Risk"
        : "Active",
    progress:
      index % 4 === 0
        ? 100
        : 45 + index * 7,
    date: `2026-0${(index % 8) + 1}-15`,
  }));
};

const formatStateName = (state) => {
  return state
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const StateProjectExplorer = () => {
  const { state } = useParams();

  const stateName = formatStateName(state || "India");

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [budgetFilter, setBudgetFilter] = useState("All");
  const [progressFilter, setProgressFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  const projects = stateProjects[state] || createFallbackProjects(stateName);

  const filteredProjects = useMemo(() => {
    let result = [...projects];

    // Search
    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter(
        (project) =>
          project.name.toLowerCase().includes(query) ||
          project.id.toLowerCase().includes(query)
      );
    }

    // Status
    if (status !== "All") {
      result = result.filter(
        (project) => project.status === status
      );
    }

    // Budget
    if (budgetFilter === "below-500") {
      result = result.filter((project) => project.budget < 500);
    }

    if (budgetFilter === "500-1000") {
      result = result.filter(
        (project) =>
          project.budget >= 500 &&
          project.budget <= 1000
      );
    }

    if (budgetFilter === "above-1000") {
      result = result.filter(
        (project) => project.budget > 1000
      );
    }

    // Progress
    if (progressFilter === "0-25") {
      result = result.filter(
        (project) => project.progress <= 25
      );
    }

    if (progressFilter === "25-50") {
      result = result.filter(
        (project) =>
          project.progress > 25 &&
          project.progress <= 50
      );
    }

    if (progressFilter === "50-75") {
      result = result.filter(
        (project) =>
          project.progress > 50 &&
          project.progress <= 75
      );
    }

    if (progressFilter === "75-100") {
      result = result.filter(
        (project) => project.progress > 75
      );
    }

    // Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case "budget-high":
          return b.budget - a.budget;

        case "budget-low":
          return a.budget - b.budget;

        case "expenditure-high":
          return b.expenditure - a.expenditure;

        case "progress-high":
          return b.progress - a.progress;

        case "progress-low":
          return a.progress - b.progress;

        case "name":
          return a.name.localeCompare(b.name);

        case "oldest":
          return new Date(a.date) - new Date(b.date);

        case "newest":
        default:
          return new Date(b.date) - new Date(a.date);
      }
    });

    return result;
  }, [
    projects,
    search,
    status,
    budgetFilter,
    progressFilter,
    sortBy,
  ]);

  const resetFilters = () => {
    setSearch("");
    setStatus("All");
    setBudgetFilter("All");
    setProgressFilter("All");
    setSortBy("newest");
  };

  return (
    <main className="min-h-screen bg-[#f5f9ff] px-4 py-8 sm:px-8 lg:px-14">

      <div className="mx-auto max-w-7xl">

        {/* Back */}

        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#10147F] hover:underline"
        >
          ← Back to Dashboard
        </Link>

        {/* Header */}

        <div className="mb-8 rounded-2xl bg-[#080d46] p-6 text-white shadow-lg sm:p-8">

          <p className="text-sm text-blue-200">
            State Project Explorer
          </p>

          <div className="mt-2 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

            <div>
              <h1 className="text-3xl font-bold sm:text-4xl">
                {stateName}
              </h1>

              <p className="mt-2 text-blue-200">
                Detailed view of infrastructure projects
              </p>
            </div>

            <div className="rounded-xl bg-white/10 px-5 py-3">
              <p className="text-xs text-blue-200">
                Projects shown
              </p>

              <p className="text-2xl font-bold">
                {projects.length}
              </p>
            </div>

          </div>

        </div>

        {/* Search + Filters */}

        <div className="rounded-2xl bg-white p-5 shadow-[0_6px_25px_rgba(0,0,0,0.08)]">

          <div className="mb-5 flex flex-col gap-4 lg:flex-row">

            {/* Search */}

            <div className="flex-1">

              <label className="mb-1 block text-xs font-semibold text-[#10147F]">
                Search Project
              </label>

              <input
                type="text"
                placeholder="Search by project name or ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-[#10147F] focus:ring-2 focus:ring-blue-100"
              />

            </div>

            {/* Status */}

            <div className="lg:w-48">

              <label className="mb-1 block text-xs font-semibold text-[#10147F]">
                Status
              </label>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm outline-none"
              >
                <option>All</option>
                <option>Active</option>
                <option>Completed</option>
                <option>Delayed</option>
                <option>At Risk</option>
              </select>

            </div>

            {/* Budget */}

            <div className="lg:w-48">

              <label className="mb-1 block text-xs font-semibold text-[#10147F]">
                Budget
              </label>

              <select
                value={budgetFilter}
                onChange={(e) => setBudgetFilter(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm outline-none"
              >
                <option value="All">All Budgets</option>
                <option value="below-500">Below ₹500 Cr</option>
                <option value="500-1000">₹500–1000 Cr</option>
                <option value="above-1000">Above ₹1000 Cr</option>
              </select>

            </div>

            {/* Progress */}

            <div className="lg:w-48">

              <label className="mb-1 block text-xs font-semibold text-[#10147F]">
                Progress
              </label>

              <select
                value={progressFilter}
                onChange={(e) => setProgressFilter(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm outline-none"
              >
                <option value="All">All Progress</option>
                <option value="0-25">0–25%</option>
                <option value="25-50">25–50%</option>
                <option value="50-75">50–75%</option>
                <option value="75-100">75–100%</option>
              </select>

            </div>

          </div>

          {/* Sort + Reset */}

          <div className="flex flex-col justify-between gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center">

            <div className="flex items-center gap-2">

              <span className="text-sm font-semibold text-gray-600">
                Sort by
              </span>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="budget-high">
                  Budget: High to Low
                </option>
                <option value="budget-low">
                  Budget: Low to High
                </option>
                <option value="expenditure-high">
                  Expenditure: High to Low
                </option>
                <option value="progress-high">
                  Progress: High to Low
                </option>
                <option value="progress-low">
                  Progress: Low to High
                </option>
                <option value="name">Project Name</option>
              </select>

            </div>

            <button
              onClick={resetFilters}
              className="rounded-lg px-4 py-2 text-sm font-semibold text-[#10147F] hover:bg-blue-50"
            >
              Reset Filters
            </button>

          </div>

        </div>

        {/* Result count */}

        <div className="my-5 flex items-center justify-between">

          <p className="text-sm text-gray-600">
            Showing{" "}
            <span className="font-bold text-[#10147F]">
              {filteredProjects.length}
            </span>{" "}
            projects
          </p>

        </div>

        {/* DESKTOP TABLE */}

        <div className="hidden overflow-hidden rounded-2xl bg-white shadow-[0_6px_25px_rgba(0,0,0,0.08)] md:block">

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-[#080d46] text-left text-xs uppercase text-white">

                <tr>
                  <th className="px-5 py-4">Project</th>
                  <th className="px-5 py-4">Budget</th>
                  <th className="px-5 py-4">Expenditure</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Progress</th>
                  <th className="px-5 py-4">Date</th>
                </tr>

              </thead>

              <tbody className="divide-y divide-slate-100">

                {filteredProjects.map((project) => (

                  <tr
                    key={project.id}
                    className="transition hover:bg-blue-50/50"
                  >

                    <td className="px-5 py-5">

                      <p className="font-semibold text-gray-900">
                        {project.name}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {project.id}
                      </p>

                    </td>

                    <td className="px-5 py-5 font-semibold text-gray-900">
                      ₹{project.budget} Cr
                    </td>

                    <td className="px-5 py-5 text-gray-700">
                      ₹{project.expenditure} Cr
                    </td>

                    <td className="px-5 py-5">

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          project.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : project.status === "Delayed"
                            ? "bg-orange-100 text-orange-700"
                            : project.status === "At Risk"
                            ? "bg-red-100 text-red-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {project.status}
                      </span>

                    </td>

                    <td className="px-5 py-5">

                      <div className="flex items-center gap-3">

                        <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100">

                          <div
                            className="h-full rounded-full bg-[#10147F]"
                            style={{
                              width: `${project.progress}%`,
                            }}
                          />

                        </div>

                        <span className="text-sm font-semibold">
                          {project.progress}%
                        </span>

                      </div>

                    </td>

                    <td className="px-5 py-5 text-sm text-gray-600">
                      {new Date(project.date).toLocaleDateString(
                        "en-IN"
                      )}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

        {/* MOBILE CARDS */}

        <div className="grid gap-4 md:hidden">

          {filteredProjects.map((project) => (

            <div
              key={project.id}
              className="rounded-2xl bg-white p-5 shadow-[0_6px_25px_rgba(0,0,0,0.08)]"
            >

              <div className="flex items-start justify-between gap-3">

                <div>
                  <p className="font-bold text-gray-900">
                    {project.name}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {project.id}
                  </p>
                </div>

                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                    project.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : project.status === "Delayed"
                      ? "bg-orange-100 text-orange-700"
                      : project.status === "At Risk"
                      ? "bg-red-100 text-red-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {project.status}
                </span>

              </div>

              <div className="mt-5 grid grid-cols-2 gap-4">

                <div>
                  <p className="text-xs text-gray-500">
                    Budget
                  </p>

                  <p className="mt-1 font-bold text-gray-900">
                    ₹{project.budget} Cr
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Expenditure
                  </p>

                  <p className="mt-1 font-bold text-gray-900">
                    ₹{project.expenditure} Cr
                  </p>
                </div>

              </div>

              <div className="mt-5">

                <div className="mb-2 flex justify-between text-xs">

                  <span className="font-semibold text-gray-600">
                    Progress
                  </span>

                  <span className="font-bold text-[#10147F]">
                    {project.progress}%
                  </span>

                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-100">

                  <div
                    className="h-full rounded-full bg-[#10147F]"
                    style={{
                      width: `${project.progress}%`,
                    }}
                  />

                </div>

              </div>

              <p className="mt-4 text-xs text-gray-500">
                Updated:{" "}
                {new Date(project.date).toLocaleDateString("en-IN")}
              </p>

            </div>

          ))}

        </div>

        {/* Empty state */}

        {filteredProjects.length === 0 && (

          <div className="rounded-2xl bg-white px-6 py-16 text-center shadow">

            <p className="text-lg font-bold text-gray-800">
              No projects found
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Try changing your filters or search query.
            </p>

            <button
              onClick={resetFilters}
              className="mt-5 rounded-lg bg-[#10147F] px-5 py-2.5 text-sm font-semibold text-white"
            >
              Clear Filters
            </button>

          </div>

        )}

      </div>
    </main>
  );
};

export default StateProjectExplorer;
