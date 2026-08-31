import { useState } from "react";

const ministryData = {
  "Department of Telecommunications": {
    updated: "July, 2026",
    projects: 31,
    originalCost: "₹ 207,194.71",
    revisedCost: "₹ 133,825.11",
    expenditure: "₹ 102,879.15",
    completed: 0,
    newlyAdded: 0,
    active: 31,
    delayed: 7,
    atRisk: 5,
    progress: "68%",
  },

  "Ministry of Power": {
    updated: "July, 2026",
    projects: 48,
    originalCost: "₹ 318,420.50",
    revisedCost: "₹ 341,280.72",
    expenditure: "₹ 221,450.32",
    completed: 4,
    newlyAdded: 2,
    active: 44,
    delayed: 9,
    atRisk: 6,
    progress: "72%",
  },

  "Ministry of Railways": {
    updated: "July, 2026",
    projects: 76,
    originalCost: "₹ 520,310.25",
    revisedCost: "₹ 587,420.80",
    expenditure: "₹ 398,210.45",
    completed: 8,
    newlyAdded: 3,
    active: 68,
    delayed: 12,
    atRisk: 9,
    progress: "74%",
  },
};

const sectorData = {
  Transport: {
    updated: "July, 2026",
    projects: 92,
    originalCost: "₹ 625,410.20",
    revisedCost: "₹ 701,220.45",
    expenditure: "₹ 480,120.30",
    completed: 11,
    newlyAdded: 4,
    active: 81,
    delayed: 14,
    atRisk: 10,
    progress: "71%",
  },

  Energy: {
    updated: "July, 2026",
    projects: 67,
    originalCost: "₹ 490,250.60",
    revisedCost: "₹ 522,310.40",
    expenditure: "₹ 341,210.20",
    completed: 7,
    newlyAdded: 2,
    active: 60,
    delayed: 10,
    atRisk: 8,
    progress: "69%",
  },

  Communication: {
    updated: "July, 2026",
    projects: 54,
    originalCost: "₹ 310,420.10",
    revisedCost: "₹ 345,620.30",
    expenditure: "₹ 224,310.15",
    completed: 5,
    newlyAdded: 3,
    active: 49,
    delayed: 8,
    atRisk: 6,
    progress: "76%",
  },
};

const Metric = ({ icon, title, value }) => {
  return (
    <div className="flex min-h-[120px] items-center gap-5 border-b border-r border-slate-200 p-5 last:border-r-0">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-3xl">
        {icon}
      </div>

      <div>
        <p className="text-sm font-semibold text-[#10147F]">
          {title}
        </p>

        <p className="mt-2 text-2xl font-bold text-[#111827]">
          {value}
        </p>
      </div>
    </div>
  );
};

const MonitoringSection = () => {
  const [mode, setMode] = useState("ministry");

  const [selected, setSelected] = useState(
    "Department of Telecommunications"
  );

  const data =
    mode === "ministry"
      ? ministryData[selected]
      : sectorData[selected];

  const options =
    mode === "ministry"
      ? Object.keys(ministryData)
      : Object.keys(sectorData);

  const handleModeChange = (newMode) => {
    setMode(newMode);

    if (newMode === "ministry") {
      setSelected("Department of Telecommunications");
    } else {
      setSelected("Transport");
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#f7fbff] px-4 py-16 sm:px-8 lg:px-14">

      {/* Decorative background */}
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-[600px] rotate-12 rounded-[50%] border-[35px] border-blue-100/60" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-80 w-[600px] -rotate-12 rounded-[50%] border-[35px] border-sky-100/60" />

      <div className="relative mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-[#10147F] sm:text-4xl">
            Project Monitoring
          </h2>

          <p className="mt-2 text-gray-600">
            Central Sector Infrastructure & Projects
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-5 flex justify-center">
          <div className="flex overflow-hidden rounded-lg border border-gray-300 bg-white shadow-sm">

            <button
              onClick={() => handleModeChange("ministry")}
              className={`px-8 py-3 text-sm font-semibold transition sm:px-12 ${
                mode === "ministry"
                  ? "bg-[#f5ae00] text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Ministry-Wise
            </button>

            <button
              onClick={() => handleModeChange("sector")}
              className={`px-8 py-3 text-sm font-semibold transition sm:px-12 ${
                mode === "sector"
                  ? "bg-[#f5ae00] text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Sector-Wise
            </button>

          </div>
        </div>

        {/* Selection */}
        <div className="mb-5 flex justify-center">
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="w-full max-w-xl rounded-lg border border-gray-300 bg-white px-5 py-3 text-center font-semibold text-[#10147F] shadow-sm outline-none focus:border-[#18A4DC]"
          >
            {options.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>

        {/* Main Card */}
        <div className="overflow-hidden rounded-2xl bg-white p-4 shadow-[0_8px_30px_rgba(0,0,0,0.12)] sm:p-5">

          {/* Blue title */}
          <div className="rounded-2xl bg-[#080d46] px-5 py-4 text-center text-white">
            <h3 className="text-xl font-bold sm:text-2xl">
              {selected}

              <span className="ml-2 text-xs font-normal sm:text-sm">
                (as of {data.updated})
              </span>
            </h3>
          </div>

          {/* Metrics */}
          <div className="mt-2 grid grid-cols-1 overflow-hidden border-l border-t border-slate-200 sm:grid-cols-2 lg:grid-cols-3">

            <Metric
              icon="📊"
              title="Project Count (No.)"
              value={data.projects}
            />

            <Metric
              icon="💰"
              title="Original Cost (in Cr)"
              value={data.originalCost}
            />

            <Metric
              icon="💰"
              title="Latest Revised Cost (in Cr)"
              value={data.revisedCost}
            />

            <Metric
              icon="📈"
              title="Expenditure (Cumm.) (in Cr)"
              value={data.expenditure}
            />

            <Metric
              icon="📅"
              title="Completed During Month (No.)"
              value={data.completed}
            />

            <Metric
              icon="🏗️"
              title="Newly Added (No.)"
              value={data.newlyAdded}
            />

            {/* Our additional metrics */}
            <Metric
              icon="⚙️"
              title="Active Projects (No.)"
              value={data.active}
            />

            <Metric
              icon="⚠️"
              title="Delayed Projects (No.)"
              value={data.delayed}
            />

            <Metric
              icon="🔴"
              title="Projects At Risk (No.)"
              value={data.atRisk}
            />

          </div>

          {/* Progress */}
          <div className="mt-5 rounded-xl bg-blue-50 p-5">

            <div className="mb-2 flex items-center justify-between">
              <span className="font-semibold text-[#10147F]">
                Overall Project Progress
              </span>

              <span className="font-bold text-[#10147F]">
                {data.progress}
              </span>
            </div>

            <div className="h-3 overflow-hidden rounded-full bg-white">
              <div
                className="h-full rounded-full bg-[#18A4DC] transition-all duration-500"
                style={{ width: data.progress }}
              />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default MonitoringSection;