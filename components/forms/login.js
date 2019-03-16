import React, { Component } from 'react'
import { connect } from 'react-redux'
import initialize from '../../lib/initialize';
import { bindActionCreators } from 'redux';
import actions from '../../redux/actions/actions';

class login extends Component {
	static getInitialProps(ctx) {
		initialize(ctx)
	}

	state = {
		email: null,
		password: null,
		error: null
	}

	onFormSubmit = async e => {
		e.preventDefault()
		const { email, password } = this.state
		console.log(this.props)
		this.props.authenticate({ email, password })
	}

	render() {
		return [
			<form onSubmit={this.onFormSubmit} key="form">
				<div>
					<span className="error">{this.state.error}</span>
					<label> Email Address </label>
					<input
						type="email"
						onInput={e => this.setState({ email: e.target.value })}
						placeholder="john@doe.com"
					/>
				</div>
				<div>
					<label> Password </label>
					<input
						type="password"
						onInput={e => this.setState({ password: e.target.value })}
						placeholder="******"
					/>
				</div>
				<div>
					<button type="submit"> Log In </button>
				</div>
				<style jsx>
					{`
						* {
							box-sizing: border-box;
							margin: 0;
						}

						h1 {
							margin: 2rem 0;
						}

						label {
							display: block;
						}

						form > div {
							margin-top: 1rem;
						}

						input,
						button {
							padding: 0.5rem;
						}

						button {
							width: 12rem;
							border: none;
							cursor: pointer;
						}

						.error {
							color: red;
							display: block;
							margin: 1rem 0;
						}
					`}
				</style>
			</form>,
			<a key="btn" href="/auth/github">
				{' '}
				Auth With GitHub{' '}
			</a>
		]
	}
}

export default connect(state => state, actions)(login)
