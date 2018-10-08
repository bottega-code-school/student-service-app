import React, { Component } from "react";
import axios from "axios";

import loggedIn from "../helpers/logged-in";
import DashboardNavigation from "../partials/navigation";
import ListItem from "../partials/list-item";

import "../../style/lists.scss";
import "../../style/project-detail.scss";

export default class ProjectDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      title: "",
      currentClient: {},
      project: {},
      endpointList: []
    };

    this.getProjectDetails = this.getProjectDetails.bind(this);
  }

  componentDidMount() {
    loggedIn()
      .then(res => {
        if (res.logged_in) {
          this.setState({ currentClient: res.current_client });
          this.getProjectDetails();
        } else {
          this.props.history.push("/");
        }
        this.setState({ isLoading: false });
      })
      .catch(error => {
        console.log("nope", error);
      });
  }

  getProjectDetails() {
    axios
      .get(
        `https://api.devcamp.space/projects/${this.props.match.params.slug}`,
        {
          withCredentials: true
        }
      )
      .then(response => {
        console.log(response.data);
        this.setState({
          project: response.data.project,
          endpointList: response.data.project.endpoints
        });

        console.log("client project", response);
      })
      .catch(error => {
        console.log("Errors");
      });
  }

  render() {
    if (this.state.isLoading) {
      return <div>Loading...</div>;
    }

    const { title, language, white_logo, slug } = this.state.project;
    const { subdomain } = this.state.currentClient;

    const endpointList = this.state.endpointList.map(endpoint => {
      return <ListItem key={endpoint.id} {...endpoint} />;
    });

    return (
      <div>
        <DashboardNavigation />

        <div className="project-detail-header">
          <img src={white_logo} alt={slug} />
          <h1>{title}</h1>
        </div>

        <div className="card">
          <h2>API Endpoints</h2>

          <div className="list-container">{endpointList}</div>
        </div>
      </div>
    );
  }
}
