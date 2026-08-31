import { useState } from "react";
import india from "@svg-maps/india";
import { Link } from "react-router-dom";
const stateData = {
  "Andhra Pradesh": {
    projects: 96,
    originalCost: "₹ 84,250 Cr",
    revisedCost: "₹ 91,430 Cr",
    expenditure: "₹ 62,180 Cr",
    completed: 8,
    newlyAdded: 3,
    active: 88,
    delayed: 12,
    atRisk: 7,
    progress: "74%",
  },

  Bihar: {
    projects: 87,
    originalCost: "₹ 52,450 Cr",
    revisedCost: "₹ 61,230 Cr",
    expenditure: "₹ 38,910 Cr",
    completed: 12,
    newlyAdded: 4,
    active: 75,
    delayed: 11,
    atRisk: 18,
    progress: "68%",
  },

  Delhi: {
    projects: 64,
    originalCost: "₹ 71,240 Cr",
    revisedCost: "₹ 78,520 Cr",
    expenditure: "₹ 55,430 Cr",
    completed: 9,
    newlyAdded: 2,
    active: 55,
    delayed: 6,
    atRisk: 4,
    progress: "81%",
  },

  Gujarat: {
    projects: 143,
    originalCost: "₹ 1,12,450 Cr",
    revisedCost: "₹ 1,24,310 Cr",
    expenditure: "₹ 89,420 Cr",
    completed: 16,
    newlyAdded: 5,
    active: 127,
    delayed: 14,
    atRisk: 9,
    progress: "77%",
  },

  Karnataka: {
    projects: 118,
    originalCost: "₹ 96,320 Cr",
    revisedCost: "₹ 1,05,410 Cr",
    expenditure: "₹ 74,820 Cr",
    completed: 13,
    newlyAdded: 4,
    active: 105,
    delayed: 10,
    atRisk: 8,
    progress: "79%",
  },

  Maharashtra: {
    projects: 182,
    originalCost: "₹ 5,35,255 Cr",
    revisedCost: "₹ 6,01,442 Cr",
    expenditure: "₹ 4,54,254 Cr",
    completed: 20,
    newlyAdded: 6,
    active: 162,
    delayed: 17,
    atRisk: 13,
    progress: "82%",
  },

  "Madhya Pradesh": {
    projects: 109,
    originalCost: "₹ 78,420 Cr",
    revisedCost: "₹ 86,310 Cr",
    expenditure: "₹ 61,220 Cr",
    completed: 11,
    newlyAdded: 3,
    active: 98,
    delayed: 13,
    atRisk: 9,
    progress: "72%",
  },

  Odisha: {
    projects: 91,
    originalCost: "₹ 67,430 Cr",
    revisedCost: "₹ 74,210 Cr",
    expenditure: "₹ 51,320 Cr",
    completed: 7,
    newlyAdded: 4,
    active: 84,
    delayed: 8,
    atRisk: 6,
    progress: "76%",
  },

  Rajasthan: {
    projects: 104,
    originalCost: "₹ 81,540 Cr",
    revisedCost: "₹ 90,210 Cr",
    expenditure: "₹ 63,450 Cr",
    completed: 10,
    newlyAdded: 3,
    active: 94,
    delayed: 15,
    atRisk: 11,
    progress: "70%",
  },

  "Tamil Nadu": {
    projects: 136,
    originalCost: "₹ 1,08,430 Cr",
    revisedCost: "₹ 1,18,520 Cr",
    expenditure: "₹ 82,610 Cr",
    completed: 15,
    newlyAdded: 5,
    active: 121,
    delayed: 9,
    atRisk: 7,
    progress: "84%",
  },

  Telangana: {
    projects: 82,
    originalCost: "₹ 62,430 Cr",
    revisedCost: "₹ 69,210 Cr",
    expenditure: "₹ 48,520 Cr",
    completed: 8,
    newlyAdded: 3,
    active: 74,
    delayed: 7,
    atRisk: 5,
    progress: "78%",
  },

  "Uttar Pradesh": {
    projects: 165,
    originalCost: "₹ 1,42,430 Cr",
    revisedCost: "₹ 1,56,210 Cr",
    expenditure: "₹ 1,02,520 Cr",
    completed: 18,
    newlyAdded: 7,
    active: 147,
    delayed: 21,
    atRisk: 16,
    progress: "69%",
  },

  "West Bengal": {
    projects: 113,
    originalCost: "₹ 94,430 Cr",
    revisedCost: "₹ 1,02,210 Cr",
    expenditure: "₹ 71,520 Cr",
    completed: 9,
    newlyAdded: 4,
    active: 104,
    delayed: 14,
    atRisk: 10,
    progress: "73%",
  },
};

const defaultData = {
  projects: 74,
  originalCost: "₹ 58,430 Cr",
  revisedCost: "₹ 64,210 Cr",
  expenditure: "₹ 43,520 Cr",
  completed: 6,
  newlyAdded: 2,
  active: 68,
  delayed: 8,
  atRisk: 5,
  progress: "75%",
};

const Metric = ({ title, value, icon }) => {
  return (
    <div className="flex items-center gap-3 border-b border-r border-slate-200 p-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-xl">
        {icon}
      </div>

      <div>
        <p className="text-xs font-semibold text-[#10147F] sm:text-sm">
          {title}
        </p>

        <p className="mt-1 text-lg font-bold text-gray-900 sm:text-xl">
          {value}
        </p>
      </div>
    </div>
  );
};

const StateProjects = () => {
  const [selectedState, setSelectedState] = useState("Maharashtra");
  const [hoveredState, setHoveredState] = useState(null);

  const activeState = hoveredState || selectedState;
  const data = stateData[activeState] || defaultData;

  /*
   * Find minimum and maximum project counts.
   * This lets the map automatically create the color scale.
   */
  const projectValues = Object.values(stateData).map(
    (state) => state.projects
  );

  const minProjects = Math.min(...projectValues);
  const maxProjects = Math.max(...projectValues);

  /*
   * Convert project count into a color.
   *
   * Low projects  -> light blue
   * High projects -> dark navy
   */
const getStateColor = (stateName) => {
  const state = stateData[stateName];

  // Every state gets a color.
  // States without database data receive the lightest palette color.
  if (!state) {
    return "#E9D5FF";
  }

  const range = maxProjects - minProjects;

  const normalized =
    range === 0
      ? 0
      : (state.projects - minProjects) / range;

  /*
   * Purple → Violet → Indigo → Blue → Navy
   *
   * The interpolation is continuous,
   * so the map works with ANY future database values.
   */

  const colors = [
    [233, 213, 255], // light purple
    [196, 181, 253], // lavender
    [139, 92, 246],  // violet
    [79, 70, 229],   // indigo
    [16, 20, 127],   // Paimana navy
  ];

  const scaled = normalized * (colors.length - 1);

  const index = Math.floor(scaled);
  const nextIndex = Math.min(index + 1, colors.length - 1);

  const localProgress = scaled - index;

  const r = Math.round(
    colors[index][0] +
      (colors[nextIndex][0] - colors[index][0]) * localProgress
  );

  const g = Math.round(
    colors[index][1] +
      (colors[nextIndex][1] - colors[index][1]) * localProgress
  );

  const b = Math.round(
    colors[index][2] +
      (colors[nextIndex][2] - colors[index][2]) * localProgress
  );

  return `rgb(${r}, ${g}, ${b})`;
};

  const handleMouseEnter = (event) => {
    const stateName = event.currentTarget.getAttribute("data-name");

    if (stateName) {
      setHoveredState(stateName);
    }
  };

  const handleMouseLeave = () => {
    setHoveredState(null);
  };

  const handleClick = (event) => {
    const stateName = event.currentTarget.getAttribute("data-name");

    if (stateName) {
      setSelectedState(stateName);
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#dff4ff] px-4 py-16 sm:px-8 lg:px-14">

      {/* Background decorations */}

      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-[700px] rotate-12 rounded-[50%] border-[45px] border-white/40" />

      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-[700px] -rotate-12 rounded-[50%] border-[45px] border-sky-300/30" />

      <div className="relative mx-auto max-w-7xl">

        {/* Heading */}

        <div className="mb-10">
          <h2 className="text-3xl font-bold text-[#10147F] sm:text-4xl">
            State-wise Projects
          </h2>

          <p className="mt-2 text-sm text-gray-600">
            Interactive overview of projects across India
          </p>
        </div>

        {/* Main content */}

        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.2fr]">

          {/* LEFT — Information */}

          <div className="order-2 lg:order-1">

            <div className="rounded-2xl bg-white p-4 shadow-[0_8px_30px_rgba(0,0,0,0.12)] sm:p-5">

              {/* State heading */}

              <div className="rounded-2xl bg-[#080d46] px-5 py-4 text-center text-white">
                <h3 className="text-2xl font-bold">
                  {activeState}
                </h3>

                <p className="mt-1 text-sm text-blue-200">
                  {data.projects} Projects
                </p>
              </div>

              {/* Metrics */}

              <div className="mt-3 grid grid-cols-1 overflow-hidden border-l border-t border-slate-200 sm:grid-cols-2">

                <Metric
                  icon="📊"
                  title="Project Count"
                  value={data.projects}
                />

                <Metric
                  icon="💰"
                  title="Original Cost"
                  value={data.originalCost}
                />

                <Metric
                  icon="💰"
                  title="Latest Revised Cost"
                  value={data.revisedCost}
                />

                <Metric
                  icon="📈"
                  title="Expenditure"
                  value={data.expenditure}
                />

                <Metric
                  icon="📅"
                  title="Completed"
                  value={data.completed}
                />

                <Metric
                  icon="🏗️"
                  title="Newly Added"
                  value={data.newlyAdded}
                />

                <Metric
                  icon="⚙️"
                  title="Active Projects"
                  value={data.active}
                />

                <Metric
                  icon="⚠️"
                  title="Delayed Projects"
                  value={data.delayed}
                />

                <Metric
                  icon="🔴"
                  title="Projects At Risk"
                  value={data.atRisk}
                />

                <Metric
                  icon="📈"
                  title="Overall Progress"
                  value={data.progress}
                />

              </div>

              {/* Hover indicator */}

             {/* Hover indicator */}
<div className="mt-4 rounded-xl bg-blue-50 px-4 py-3 text-center text-sm text-[#10147F]">
  {hoveredState
    ? `Viewing ${hoveredState}`
    : "Hover over a state to explore project data"}
</div>

{/* View all projects button */}
<Link
  to={`/projects/${activeState
    .toLowerCase()
    .replace(/\s+/g, "-")}`}
  className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-[#10147F] px-5 py-3 font-semibold text-white transition hover:bg-[#080d46]"
>
  View All {activeState} Projects
  <span>→</span>
</Link>

            </div>
          </div>

          {/* RIGHT — INDIA MAP */}

          <div className="order-1 flex justify-center lg:order-2">

            <div className="w-full max-w-[600px] rounded-3xl bg-white/30 p-4 backdrop-blur-sm sm:p-8">

              <svg
                viewBox={india.viewBox}
                className="h-auto w-full overflow-visible"
                xmlns="http://www.w3.org/2000/svg"
              >
                {india.locations.map((location) => {

                  const stateName = location.name;
                  const isHovered = hoveredState === stateName;
                  const isSelected = selectedState === stateName;

                  return (
                    <path
                      key={location.id}
                      d={location.path}
                      data-name={stateName}
                      fill={getStateColor(stateName)}
                      stroke="white"
                      strokeWidth="1.5"
                      className="cursor-pointer transition-all duration-200"
                      style={{
                        filter:
                          isHovered || isSelected
                            ? "drop-shadow(0 4px 5px rgba(0,0,0,0.25))"
                            : "none",

                        opacity:
                          hoveredState && !isHovered
                            ? 0.65
                            : 1,

                        transform:
                          isHovered
                            ? "scale(1.015)"
                            : "scale(1)",

                        transformOrigin: "center",
                      }}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      onClick={handleClick}
                    />
                  );
                })}
              </svg>

              {/* LEGEND */}

              <div className="mt-5 rounded-xl bg-white/80 px-4 py-3">

                <div className="mb-2 flex items-center justify-between">

                  <span className="text-xs font-semibold text-[#10147F]">
                    Projects
                  </span>

                  <span className="text-xs text-gray-500">
                    Higher project count
                  </span>

                </div>

                <div className="flex h-3 overflow-hidden rounded-full">

<div className="flex-1 bg-[#C4B5FD]" />
<div className="flex-1 bg-[#8B5CF6]" />
<div className="flex-1 bg-[#6366F1]" />
<div className="flex-1 bg-[#4338CA]" />
<div className="flex-1 bg-[#10147F]" />

                </div>

                <div className="mt-1 flex justify-between text-[10px] text-gray-500">

                  <span>{minProjects}</span>
                  <span>{Math.round((minProjects + maxProjects) / 2)}</span>
                  <span>{maxProjects}+</span>

                </div>

              </div>

            </div>
          </div>

        </div>

        {/* Bottom note */}

        <div className="mt-8 text-center text-sm text-gray-600">
          Hover over a state to view live project statistics
        </div>

      </div>
    </section>
  );
};

export default StateProjects;

