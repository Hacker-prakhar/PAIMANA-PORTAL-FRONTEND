const Navbar = () => {
  return (
    <header className="w-full">

      {/* Top blue bar */}
      <div className="h-8 bg-primary">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-end px-4">
          {/* top icons */}
        </div>
      </div>

      {/* Logo + buttons */}
      <div className="h-24 bg-white">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-4">

          {/* Left: Government Logo + Ministry Name */}
          <div className="flex items-center gap-3">
            <img
              src="/india-government-emblem.png"
              alt="Government of India"
              className="h-16 w-auto object-contain"
            />

            <div>
              <h1 className="text-xl font-bold text-text">
                Ministry of Statistics and
              </h1>
              <p className="text-muted">
                Government of India
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">
            <button
              className="
                bg-orange
                text-white
                px-8 py-3
                rounded-full
                font-semibold
                shadow-md
              "
            >
              ADD PROJECT / UPDATE
            </button>

            <button
              className="
                bg-navy
                text-white
                px-10 py-3
                rounded-full
                font-semibold
                shadow-md
              "
            >
              REPORTS
            </button>
          </div>

        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-secondary">
        <div
          className="
            max-w-4xl
            mx-auto
            h-12
            flex
            items-center
            justify-center
            gap-14
          "
        >
          <a className="text-white font-semibold text-lg">
            Home
          </a>

          <a className="text-white font-semibold text-lg">
            Publications
          </a>

          <a className="text-white font-semibold text-lg">
            Dashboard
          </a>
        </div>
      </nav>

    </header>
  );
};

export default Navbar;
