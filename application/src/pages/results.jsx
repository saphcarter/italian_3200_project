import "../styles/App.css";
import ScoreSection from "../components/Results";
import { useAuth0 } from "@auth0/auth0-react";

function Results() {
  const {user} = useAuth0();
  const user_id = user?.sub;
  console.log(user);

  console.log(user_id)
  
  return (
    <div className="results">
      <ScoreSection name="self" user_id={user_id} />
    </div>
  );
}

export default Results;
