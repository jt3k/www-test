import React, { Component } from "react";
import ReactDOM from "react-dom";
import Raven from 'raven-js';
Raven
    .config('https://92cf4604555343c38d11d8a3148a67fe@sentry.io/1463455')
    .install();

class ExampleBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = { error: null, eventId: null };
	}

	componentDidCatch(error, errorInfo) {
		this.setState({ error });
		Raven.captureException(error, errorInfo);
	}

	render() {
		if (this.state.error) {
			//render error
			return (
				<pre>{JSON.stringify(this.state.error, null, ' ')}</pre>
			);
		} else {
			//when there's not an error, render children untouched
			return this.props.children;
		}
	}
}

class FlickrError extends Component {
	тхров() {
		throw new Error("ТХРОВ!! НЕВ ЕРРОР");
	}
	render() {
		const currentMethod =
			Math.random() < 0.8 ? "тхров" : "undefined is not a function";
		return (
			<div>
				метод: {currentMethod}
				{this[currentMethod]()}
				<button
					onClick={() => {

						this.forceUpdate();
					}}
				>
					click
				</button>
			</div>
		);
	}
}

ReactDOM.render(
	<ExampleBoundary>
		<FlickrError />
	</ExampleBoundary>,
	document.getElementById("app")
);
console.log("dzfdsgfs");
