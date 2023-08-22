import "./styles/App.css";
import NavbarComponent from "./components/Navbar";
import TaskSection from "./components/Tasks";

function Home() {

  return (
    <div className="home">
      <TaskSection />
    </div>
  );
  
}

export default Home;
