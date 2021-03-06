import React, { Component } from "react";
import axios from "axios";

import DashboardNavigation from "../partials/navigation";
import SingleRecordListItem from "../partials/single-record-list-item";
import ApiKey from "../partials/api-key";

export default class WhiteListedLinks extends Component {
  constructor() {
    super();

    this.state = {
      clientDomains: [],
      linkUrl: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.createNewWhiteListLink = this.createNewWhiteListLink.bind(this);
    this.handleWhiteListLinkDelete = this.handleWhiteListLinkDelete.bind(this);
  }

  componentDidMount() {
    this.getWhiteListLinks();
  }

  getWhiteListLinks() {
    axios
      .get(`https://api.devcamp.space/client_domains`, {
        withCredentials: true
      })
      .then(response => {
        this.setState({
          clientDomains: [...response.data.client_domains]
        });
      })
      .catch(error => {
        console.log("Errors");
      });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleWhiteListLinkDelete(event, linkId) {
    axios
      .delete(`https://api.devcamp.space/client_domains/${linkId}`, {
        withCredentials: true
      })
      .then(response => {
        this.setState({
          clientDomains: this.state.clientDomains.filter(clientDomain => {
            return clientDomain.id !== linkId;
          })
        });
        return response.data;
      })
      .catch(error => {
        console.log(error);
      });
    event.preventDefault();
  }

  createNewWhiteListLink(event) {
    axios
      .post(
        "https://api.devcamp.space/client_domains",
        {
          client_domain: {
            url: this.state.linkUrl
          }
        },
        {
          withCredentials: true
        }
      )
      .then(response => {
        this.setState({
          linkUrl: "",
          clientDomains: [
            ...this.state.clientDomains,
            response.data.client_domain
          ]
        });
        return response.data;
      })
      .catch(error => {
        console.log(error);
      });
    event.preventDefault();
  }

  render() {
    const clientDomainList = this.state.clientDomains.map(clientDomain => {
      return (
        <SingleRecordListItem
          key={clientDomain.id}
          item={clientDomain.url}
          handleWhiteListLinkDelete={e =>
            this.handleWhiteListLinkDelete(e, clientDomain.id)}
        />
      );
    });

    return (
      <div>
        <DashboardNavigation />

        <ApiKey />

        <div className="card">
          <h2>White List Links</h2>
          <div className="list-container">{clientDomainList}</div>
        </div>

        <div className="card">
          <h2>Add URL</h2>

          <form onSubmit={this.createNewWhiteListLink} className="form-wrapper">
            <div className="input-elements three-icon-grid">
              <i className="fas fa-link" />
              <div className="form-element-group">
                <input
                  type="text"
                  name="linkUrl"
                  placeholder="https://www.yoursite.com"
                  value={this.state.linkUrl}
                  onChange={this.handleChange}
                  className="full-width-element"
                />
              </div>

              <button type="submit">
                <i className="far fa-plus-square" />
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
