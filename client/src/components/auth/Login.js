import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserLock } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import "./styles.css";

 class Login extends Component {
    constructor() {
        super();
        this.state = {
          email: "",
          password: "",
          errors: {}
        };
      }
      componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
          this.props.history.push("/dashboard");
        }
      }

      componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
          this.props.history.push("/dashboard"); // push user to dashboard when they login
        }
    if (nextProps.errors) {
          this.setState({
            errors: nextProps.errors
          });
        }
      }


    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
      };
    onSubmit = e => {
        e.preventDefault();
    const userData = {
          email: this.state.email,
          password: this.state.password
        };
    console.log(userData);
    this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
      };

      
    render() {
        const { errors } = this.state;
        return (
          <div className="container a-w a-i">
            <form noValidate onSubmit={this.onSubmit}>
                <div className="icon"><FontAwesomeIcon icon={faUserLock} size="3x"/>  </div>
                <h3 style={{marginTop:'20px'}}>Unite Us</h3>

                <div className="form-group">
                    <label>Email address:</label>
                    <span className="red-text">
                  {errors.email}
                  {errors.emailnotfound}
                </span>
                    <input 
                       type="email" 
                       className="form-control" 
                       placeholder="Enter email" 
                       onChange={this.onChange}
                       value={this.state.email}
                        error={errors.email}
                        id="email"
                        />
                </div>

                <div className="form-group">
                    <label>Password:</label>
                    <span className="red-text">
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
                    <input 
                       type="password" 
                       className="form-control" 
                       placeholder="Enter password" 
                       onChange={this.onChange}
                       value={this.state.password}
                        error={errors.password}
                        id="password"
                        />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Login</button>
                <p className="forgot-password text-right">
                Don'have an account?<Link to={"/signup"} >Sign up</Link>
                </p>
            </form>
            </div>
        );
    }
}
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { loginUser }
)(Login);