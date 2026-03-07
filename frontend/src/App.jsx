import Bubbles from './components/Bubbles';
import Navbar from './components/Navbar';
import Welcome from './pages/Welcome';

const App = () => {
  return (
    <div className="relative min-h-screen w-full flex flex-col font-display overflow-hidden">
      <Bubbles />
      <Navbar />
      <main className="flex-1 w-full h-screen">
        <Welcome />
      </main>
    </div>
  );
};

export default App;
