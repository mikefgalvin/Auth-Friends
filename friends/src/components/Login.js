import React from 'react';
import axios from 'axios';

class Login extends React.Component {
  state = {
    credentials: {
      username: '',
      password: ''
    }
  };

  handleChange = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
  };

  login = e => {
    e.preventDefault();
    //login authentication process
    // 1. use axios to do a post request.
    // 2. if request is successful, console.log token.
    // 3. if request is unsuccessful, show error.
    axios
    .post("http://localhost:5000/api/login", this.state.credentials)
      .then( res => {
        localStorage.setItem('token', res.data.payload);
        console.log(res.data.payload)
        //some redirect
        this.props.history.push('/friends')
        console.log('props', this.props)
      })
      .catch( err => {
        console.log('error: ', err.data)
      })
  };

  render() {
    return (
      <div>
        <form onSubmit={this.login}>
          <input
            type="text"
            name="username"
            value={this.state.credentials.username}
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            value={this.state.credentials.password}
            onChange={this.handleChange}
          />
          <button>Log in</button>
        </form>
      </div>
    );
  }
}

export default Login;