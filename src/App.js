import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

const ROOT_URL = "http://localhost:8080/api";

class Contacts extends Component {

  render() {
    var rows = this.props.contacts;

    return (
      <div className="pure-u-1-3">
        <div className="box">
          <h2><i className="fa fa-users"></i>Contacts</h2>
          <div></div>
          <table className="pure-table">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Phone</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

class Contact extends Component {

  render() {
    return (
      <tr>
          <td>{this.props.contact.id}</td>
          <td>{this.props.contact.name}</td>
          <td>{this.props.contact.surname}</td>
          <td>{this.props.contact.phone}</td>
          <td>
            <button className="btn btn-info" onClick={this.props.onClick}>Delete</button>
          </td>
      </tr>
    );
  }
}

class App extends Component {

  constructor() {
    super();
    this.state = {
      contacts: []
    };
    this.loadContacts();
  }

  loadContacts() {

    var url = ROOT_URL + '/contacts';
    
    if (this.refs && this.refs.filter) {
      var filter = this.refs.filter.value;
      url += '/' + filter;
    }

    var self = this;
    axios.get(url)      
      .then(function(response) {
        var contacts = [];
        response.data.response.forEach(function(contact) {
        contacts.push(
          <Contact contact={contact} key={contact.id}
            onClick={() => self.handleDeleteContact(contact)} />);
        });
        self.setState({contacts: contacts});
      })
      .catch(function(error) {
        console.log(error);
      })
  }

  handleAddContact() {

    var self = this;
    axios.post(ROOT_URL + '/contact', {
      name: this.refs.name.value,
      surname: this.refs.surname.value,
      phone: this.refs.phone.value
    })
    .then(function (response) {
      self.loadContacts();
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  handleDeleteContact(contact) {
    
    var self = this;
    axios.delete(ROOT_URL + '/contact/' + contact.id)
    .then(function (response) {
      self.loadContacts();
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  renderContactForm() {
    return (
      <div className="pure-u-1-3">
        <div className="box">
          <h2><i className="fa fa-user-plus"></i>New contact</h2>
          <form className="pure-form" onSubmit={this.handleAddContact.bind(this)}>
            <input type="text" ref="name" className="pure-input-1-2" placeholder="First Name"/><br/>
            <input type="text" ref="surname" className="pure-input-1-2" placeholder="Last Name"/><br/>
            <input type="text" ref="phone" className="pure-input-1-2" placeholder="Phone"/><br/>
            <input type="submit" className="pure-button pure-input-1-2 pure-button-primary" value="Add"/>
          </form>
        </div>
      </div>
    );
  }

  renderSearchForm() {
    return (
      <div className="pure-u-sm-1 pure-u-1-3">
        <div className="box">
          <h2><i className="fa fa-search"></i>Search contact</h2>
          <div className="pure-form">
            <input type="text" ref="filter" className="pure-input-1-2"/><br/>
            <input type="button" className="pure-button pure-input-1-2 pure-button-primary" 
              value="Search" onClick={this.loadContacts.bind(this)}/>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="container">
        <div className="pure-g">
          <div className="pure-u-1">
            <div className="header">
              <img className="logo"/>
              <p>v 1.0</p>
            </div>
          </div>
        </div>
        <div className="pure-g">
          { this.renderContactForm() }
          { this.renderSearchForm() }
          <Contacts filter="" contacts={this.state.contacts} />
        </div>
      </div>
    );
  }

}

export default App;
