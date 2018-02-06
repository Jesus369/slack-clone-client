import { Button, Input, Container, Header } from 'semantic-ui-react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import React from 'react';

class Register extends React.Component {

  state = {
    username: '',
    usernameError: '',
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
  };

  onChange = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  onSubmit = async () => {
    /**/
    this.setState({
      usernameError: '',
      emailError: '',
      passwordError: ''
    })
    /*Setting the state*/
    const { username, email, password } = this.state
    /*Creating a user with the given variables*/
    const response = await this.props.mutate({
      variables: { username, email, password }
    })
    /*passing in a boolean and all errors*/
    const { ok, errors } = response.data.register /*find by console.logging the response*/
    if (ok) {
      /* if ok(true) redirect to homepage*/
      this.props.history.push('/')
    } else {
      const err = {};
      /*looping through each path and message in errors*/
      errors.forEach(({ path, message }) => {
        /*err[passwordError] = message*/
        err[`${path}Error`] = message
      })
      console.log('err', err)
      this.setState(err)
    }
    console.log(response)
  }

  render() {
    const { username, email, password, usernameError, emailError, passwordError } = this.state;

    return (
      <Container text>
        <Header as='h2'>Register</Header>
        <Input
          /*Double "!" => boolean. error requires Boolean*/
          error={!!usernameError}
          name='username'
          onChange={this.onChange}
          value={username}
          placeholder='Username'
          fluid
        />
        <Input
          error={!!emailError}
          name='email'
          onChange={this.onChange}
          value={email}
          placeholder='Email'
          fluid
        />
        <Input
          error={!!passwordError}
          name='password'
          onChange={this.onChange}
          value={password}
          type='password'
          placeholder='Password'
          fluid
        />
        <Button onClick={this.onSubmit}>Submit</Button>
      </Container>
    )
  }
}

const registerMutation = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      ok
      errors {
          path 
          message
        }
      }
    }
`

export default graphql(registerMutation)(Register);
