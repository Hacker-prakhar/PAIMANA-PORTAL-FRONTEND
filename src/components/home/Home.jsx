import HeroBanner from "./HeroBanner";
import MonitoringSection from "./MonitoringSection";
import StateProjects from "./StateProjects";

const Home = () => {
  return (
    <main>

      {/* Hero */}
      <div className="px-4 py-6 sm:px-8 lg:px-14">
        <HeroBanner />
      </div>

      {/* Ministry / Sector Monitoring */}
      <MonitoringSection />

      {/* State-wise Projects */}
      <StateProjects />

    </main>
  );
};

export default Home;