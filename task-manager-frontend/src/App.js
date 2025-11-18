import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import "./App.css";
import CustomNavbar from "./components/navbar/CustomNavbar";
import Home from "./components/home/Home";
import Profile from "./components/profile/Profile";
import Registration from "./components/registration/Registration";
import Analytics from "./components/analytics/Analytics";
import GetTeams from "./components/teams/GetTeams";
import CreateTeam from "./components/teams/CreateTeam";
import UpdateTasks from "./components/teams/UpdateTasks";
import TeamRanking from "./components/teams/TeamRanking";


function App() {
  return (
    <div className="App">
        <Router>
            <CustomNavbar />
            <Routes>
                <Route exact path="/" element={<Registration />} />
                <Route exact path="/home" element={<Home />} />
                <Route exact path="/profile" element={<Profile />}/>
                <Route exact path="/teams" element={<GetTeams />}/>
                <Route exact path="/register" element={<Registration />}/>
                <Route exact path="/analytics" element={<Analytics />}/>
                <Route exact path="/teams/create" element={<CreateTeam />} />
                <Route exact path="/teams/task" element={<UpdateTasks />} />
                <Route exact path="/teams/:id/ranking" element={<TeamRanking/>} />
            </Routes>
        </Router>

    </div>
  );
}

export default App;