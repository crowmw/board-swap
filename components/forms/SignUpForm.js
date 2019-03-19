import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../redux/actions/actions'
import selectors from '../../redux/selectors/selectors';

class SignUpForm extends Component {
	state = {
		email: null,
		username: null,
		password: null
	}

	onFormSubmit = e => {
		e.preventDefault()
		const { email, password, username } = this.state
		this.props.signup({ email, password, username })
	}

	render() {
		const { props: { error, inProgress }, state: { username } } = this
		return (
			<form onSubmit={this.onFormSubmit}>
				<div>
					<span className="error">{error}</span>
					<label> Email Address </label>
					<input
						type="email"
						onChange={e => this.setState({ email: e.target.value, username: e.target.value.slice(0, e.target.value.indexOf('@')) })}
						placeholder="john@doe.com"
					/>
				</div>
				<div>
					<label> Username </label>
					<input
						type="text"
						value={username || ''}
						onChange={e => this.setState({ username: e.target.value })}
						placeholder="john_doe"
					/>
				</div>
				<div>
					<label> Password </label>
					<input
						type="password"
						onChange={e => this.setState({ password: e.target.value })}
						placeholder="******"
					/>
				</div>
				<div>
					<button> Sign up </button>
					{inProgress && <span>IN PROGRESS...</span>}
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
	error: selectors.getSignUpError(state),
	inProgress: selectors.getSignUpInProgress(state)
})

export default connect(mapStateToProps, actions)(SignUpForm)
