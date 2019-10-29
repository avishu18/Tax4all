import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import ReportPage from './Pages/ReportsPage';
import jsonUsers from './data/users'
import jsonReports from './data/reports'


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      activeUser: null,
    //   activeUser:   {
    //     "id": 1,
    //     "fname": "Nir",
    //     "lname": "Channes",
    //     "email": "nir@nir.com",
    //     "pwd": "123"
    // },
      allUsers: jsonUsers,
      allReports: jsonReports,
      activeUserReports: []
      // hack for starting with my recipes
      // activeUserRecipes: jsonRecipes.filter(recipe => recipe.userId === 1)
    }

    this.handleLogout = this.handleLogout.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.addReport = this.addReport.bind(this);

    console.log(this.state.allReports);
  }

  handleLogout() {
    this.setState({activeUser: null});
  }

  handleLogin(activeUser) {

    const activeUserReports = this.state.allReports.filter(report => report.userId === activeUser.id)

    this.setState({activeUser, activeUserReports});
  }

  addReport(newReport) {
    //const {activeUser, allRecipes, activeUserRecipes} this.state.activeUser
    // 1) add id and user to the recipe
    newReport.userId = this.state.activeUser.id;
    newReport.id = this.state.allReports[this.state.allReports.length - 1].id + 1;

    // 2) update all recipes and active user recipes
    const allReports = this.state.allReports.concat(newReport);
    const activeUserReports = this.state.activeUserReports.concat(newReport);

    this.setState({allReports, activeUserReports});

    return newReport;
  }

  render() {

    const { activeUser, allUsers, activeUserReports } = this.state;
    // const activeUser = this.state.activeUser;

    return (
      <Switch>
        <Route exact path="/">
          <HomePage activeUser={activeUser} handleLogout={this.handleLogout}/>
        </Route>
        <Route path="/login">
          <LoginPage users={allUsers} handleLogin={this.handleLogin}/>
        </Route>
        <Route path="/reports">
          <ReportPage reports={activeUserReports} activeUser={activeUser} handleLogout={this.handleLogout} addReport={this.addReport}/>
        </Route>
      </Switch>
    );
  }
}

export default App;