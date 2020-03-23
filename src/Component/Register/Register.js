import React from 'react';

class Register extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      signInEmail: '',
      signInPassword: ''
    };
  }

  onNameChange = (event) => {
    this.setState({name: event.target.value})
  }

  onEmailChange = (event)=>{
    this.setState({signInEmail: event.target.value})
  }

  onPasswordChange = (event)=>{
    this.setState({signInPassword: event.target.value})
  }

  onSubmitRegistered = (event)=>{
    let user = {
      name: this.state.name,
      email: this.state.signInEmail,
      password: this.state.signInPassword
    };
    let sentItem = {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user)
    };

    fetch('http://localhost:3001/register', sentItem)
      .then(response=>response.json())
      .then(user=>{
        if(user.id) {
          // console.log(user);
          // console.log('successfully sign in!');
          this.props.onUserStateChange(user);
          this.props.onRouteChange('home');
        }
      });
  }

  render() {
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 white-80 ">
          <form className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                <input className="pa2 input-reset ba bg-transparent white hover-bg-white hover-black w-100" type="text" name="name"  id="name" onChange = {this.onNameChange}/>
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input className="pa2 input-reset ba bg-transparent white hover-bg-white hover-black w-100" type="email" name="email-address"  id="email-address" onChange={this.onEmailChange}/>
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input className="b pa2 input-reset ba bg-transparent white hover-bg-white hover-black w-100" type="password" name="password"  id="password" onChange={this.onPasswordChange}/>
              </div>
            </fieldset>
            <div className="">
              <input
              onClick={this.onSubmitRegistered}
              className="b ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6 dib white " type="button" value="Register"
              />
            </div>
          </form>
        </main>
      </article>
    );
  }
}

export default Register;
