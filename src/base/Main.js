import React, { Component } from 'react';
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

// Component
import ViewportRestrict from 'helper/component/viewport';
import Loader from 'helper/component/loader';
import NotFound from 'helper/component/404';
import Navbar from 'helper/component/navbar';

// Pages
import Home from 'pages/Home';
import ErrorBoundary from 'ErrorBoundary';

// REDUX
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as mainActions from 'redux/actions/main';
import Search from 'pages/Search';



class Main extends Component {
    render() {
        return (
            <Router basename={process.env.PUBLIC_URL}>
				<div id="Main" className="main-panel">
					<ErrorBoundary>
						<ViewportRestrict display={false} type="landscape"/>
						<Loader loader={false} />
						<Navbar />
						<div className="content-container">
							<Switch>
								<Route exact path="/" component={Home} />
								<Route exact path="/search" component={Search} />
								<Route component={NotFound} />
							</Switch>
						</div>
					</ErrorBoundary>
				</div>
			</Router>
        );
    }
}

function mapStateToProps(state) {
	return { main: state.main }
}

function mapDispatchToProps(dispatch) {
	return {
		actionsMain: bindActionCreators(mainActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);