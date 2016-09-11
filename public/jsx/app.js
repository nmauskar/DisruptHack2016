var React = require('react');
var ReactDOM = require('react-dom');

var Main = React.createClass({
	render: function() {
		return (
			<div>
				<div className="col-xs-8 col-xs-offset-2 welcomeBox">
					<center><h1>Welcome to Fridge Tech</h1></center><br/>
					<div className="row">
						<div className="col-xs-4 col-xs-offset-2">
							<center><p>Please Register</p><br/><a href="/register"><button className="btn btn-info">Register</button></a></center>
						</div>
						<div className="col-xs-4">
							<center><p>Or Login Here</p><br/><a href="/login"><button className="btn btn-info">Login</button></a></center>
						</div>
					</div>
				</div>
			</div>
		)
	}
})

ReactDOM.render(
	<Main/>,
	document.getElementById('app')
);
