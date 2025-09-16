import WhatsNewSection from '../components/WhatsNewSection';

const Dashboard = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-asu-maroon">Dashboard</h1>
        <p className="text-gray-600">Welcome to CreateAI Builder</p>
      </div>
      
     
      
      
      
      {/* What's New Section */}
      <WhatsNewSection />
    </div>
  );
};

export default Dashboard;
