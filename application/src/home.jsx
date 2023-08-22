import "./styles/App.css";
import NavbarComponent from "./components/Navbar";
import TaskSection from "./components/Tasks";
import ScoreSection from "./components/Results";

function Home() {

  return (
    <div className="home">
      <TaskSection />
      <ScoreSection />
    </div>
  );
  
}

export default Home;
