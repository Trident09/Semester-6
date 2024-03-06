import React from 'react';
import './App.css';

//Header component
function Header() {
  return (
    <div className="header">
      <h1>Welcome to NFSU Student Form</h1>
    </div>
  )
}

//Footer component
function Footer() {
  return (
    <div className="footer">
      <h5>Thank you for Visiting @NFSU!</h5>
    </div>
  )
}

//Form component
class StudentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      age: '',
      course: '',
      enrollmentNumber: '',
      address: '',
      phoneNumber: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    alert('A form was submitted: ' + this.state);
    event.preventDefault();
  }

  render() {
    return (
      <div className="student-form">
        <fieldset className="form-fieldset">
          <form onSubmit={this.handleSubmit}>
            <label>
              Name:
              <input type="text" name="name" onChange={this.handleInputChange} />
            </label>
            <br />
            <label>
              Age:
              <input type="text" name="age" onChange={this.handleInputChange} />
            </label>
            <br />
            <label>
              Course:
              <input type="text" name="course" onChange={this.handleInputChange} />
            </label>
            <br />
            <label>
              Enrollment Number:
              <input type="text" name="enrollmentNumber" onChange={this.handleInputChange} />
            </label>
            <br />
            <label>
              Address:
              <input type="text" name="address" onChange={this.handleInputChange} />
            </label>
            <br />
            <label>
              Phone Number:
              <input type="text" name="phoneNumber" onChange={this.handleInputChange} />
            </label>
            <br />
            <input type="submit" value="Submit" className="submit-button" />
          </form>
        </fieldset>
      </div>
    );
  }
}

//App component
class App extends React.Component {
  render() {
    return(
      <div>
        <Header />
        <StudentForm />
        <Footer />
      </div>
    )
  }
}

export default App;