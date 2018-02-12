import React from 'react';
import { Form, Message, Button, Input, Container, Header } from 'semantic-ui-react'
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class Login extends React.Component {
    constructor(props) {
        super(props)
        /*extendObservable replaces this.state. Pass in 'this' and 'set the state'*/
        extendObservable(this, {
            email: '',
            password: '',
            errors: {}
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
        const { ok, token, refreshToken, errors } = response.data.login

        /*Store the token and refreshToken in the user's local storage*/
        if (ok) {
            localStorage.setItem('token', token)
            localStorage.setItem('refreshToken', refreshToken)

            /* if ok(true) redirect to homepage*/
            this.props.history.push('/')
        }
        else {
            const err = {};
            /*looping through each path and message in errors*/
            errors.forEach(({ path, message }) => {
                /*err[passwordError] = message*/
                err[`${path}Error`] = message
            })
            console.log('err', err)
            this.errors = err
        }
        console.log(response)
    }

    onChange = (e) => {
        /*taking the user's values from the inputs*/
        const { name, value } = e.target;
        this[name] = value;
    }

    render() {
        /*Getting the constructor*/
        const { email, password, errors: { emailError, passwordError } } = this;
        /*Hold errors*/
        const errorList = []
        /*If error onSubmit, push errors*/
        if (emailError) {
            errorList.push(emailError)
        }
        if (passwordError) {
            errorList.push(passwordError)
        }

        return (

            <Container text>
                <Form>
                    <Header as='h2'>Login</Header>
                    <Form.Field error={!!emailError}>
                        <Input
                            name='email'
                            onChange={this.onChange}
                            value={email}
                            placeholder='Email'
                            fluid
                        />
                    </Form.Field>
                    <Form.Field error={!!passwordError}>
                        <Input
                            name='password'
                            onChange={this.onChange}
                            value={password}
                            type='password'
                            placeholder='Password'
                            fluid
                        />
                    </Form.Field>
                    <Button onClick={this.onSubmit}>Submit</Button>
                </Form>
                {/* Show Message only if errors */}
                {errorList.length ? (
                    <Message
                        error
                        header="There was an error with your submission"
                        list={errorList}
                    />
                ) : null}
            </Container >
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
