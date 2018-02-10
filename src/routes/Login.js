import React from 'react';
import { Message, Button, Input, Container, Header } from 'semantic-ui-react'
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

/**/

class Login extends React.Component {
    constructor(props) {
        super(props)
        /*extendObservable replaces this.state. Pass in 'this' and 'set the state'*/
        extendObservable(this, {
            email: '',
            password: '',
        })
    }

    onSubmit = async () => {
        /*Setting the state onSubmit*/
        const { email, password } = this;
        const response = await this.props.mutate({
            variables: { email, password }
        })
        console.log(response)
        /*Accessing token and refreshToken from the response*/
        const { ok, token, refreshToken } = response.data.login
        /*Storing the token and refreshToken in the user's local storage*/
        localStorage.setItem = ('token', token)
        localStorage.setItem = ('refreshToken', refreshToken)
    }

    onChange = e => {
        /*taking the user's values from the inputs*/
        const { name, value } = e.target;
        this[name] = value;
    }

    render() {
        /*using 'this' rather than 'this.state'*/
        const { email, password } = this;

        return (

            <Container text>
                <Header as='h2'>Login</Header>
                <Input
                    name='email'
                    onChange={this.onChange}
                    value={email}
                    placeholder='Email'
                    fluid
                />
                <Input
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

const loginMutation = gql`
mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      token
      refreshToken
      errors {
        path
        message
      }
    }
  }
  `

export default graphql(loginMutation)(observer(Login))