import React, { Component } from 'react'
import { connect } from 'react-redux'
import initialize from '../../lib/initialize';
import actions from '../../redux/actions/actions';
import selectors from '../../redux/selectors/selectors';

class SignInForm extends Component {
	static getInitialProps(ctx) {
		initialize(ctx)
	}

	state = {
		email: null,
		password: null,
	}

	onFormSubmit = async e => {
		e.preventDefault()
		const { email, password } = this.state
		this.props.signin({ email, password })
	}

	render() {
		const { props: { error, inProgress } } = this
		return (
			<form onSubmit={this.onFormSubmit} key="form">
				<div>
					{error && <span className="error">{error}</span>}
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
					<button type="submit">Sign In</button>
					{inProgress && <span>IN PROGRES...</span>}
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
			</form>
		)
	}
}

const mapStateToProps = state => ({
	error: selectors.getSignInError(state),
	inProgress: selectors.getSignInProgress(state)
})

export default connect(mapStateToProps, actions)(SignInForm)
