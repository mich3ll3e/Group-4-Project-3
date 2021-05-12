import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserLock } from "@fortawesome/free-solid-svg-icons";
import { Link , withRouter}  from 'react-router-dom'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import "./styles.css";
//import register from "../../registerServiceWorker";
class Register extends Component {
 

    constructor() {
        super();
        this.state = {
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          password2: "",
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
    const newUser = {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          password: this.state.password,
          password2: this.state.password2
        };
    this.props.registerUser(newUser, this.props.history); 
    console.log(newUser);
      };

    render() {
        const { errors } = this.state;
        return (
          <div className="container a-w a-i">
            <form noValidate onSubmit={this.onSubmit}>
                <div className="icon"><FontAwesomeIcon icon={faUserLock} size="3x"/>  </div>
                <h3 style={{marginTop:'20px'}}>Unite Us</h3>
                <h4 style={{marginTop:'20px'}}>Sign up</h4>
                  <br/>
                <div className="form-group">
                    <label>First name:</label>
                    <span className="red-text">{errors.firstName}</span>
                    <input 
                        type="text" 
                         className="form-control" 
                        placeholder="First name"
                        onChange={this.onChange}
                        value={this.state.firstName}
                        error={errors.firstName}
                        id="firstName" 
                        />
                </div>

                <div className="form-group">
                    <label>Last name:</label>
                    <span className="red-text">{errors.LastName}</span>
                    <input 
                      type="text" 
                     className="form-control" 
                     placeholder="Last name"
                     onChange={this.onChange}
                     value={this.state.lastName}
                     error={errors.lastName}
                     id="lastName"
                    />
                </div>

                <div className="form-group">
                    <label>Email address:</label>
                    <span className="red-text">{errors.email}</span>
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
                    <span className="red-text">{errors.password}</span>
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
                <div className="form-group">
                    <label>Confirm password:</label>
                    <span className="red-text">{errors.password2}</span>
                    <input 
                      type="password" 
                      className="form-control" 
                      placeholder="Confirm  password" 
                      onChange={this.onChange}
                     value={this.state.password2}
                     error={errors.password2}
                     id="password2"
                     />
                </div>

                <button type="submit" className="btn btn-primary btn-block">Sign Up!</button>
                <p className="forgot-password text-right">
                    Already registered  <Link to={"/"}>sign in?</Link>
                </p>
            </form>
            </div>
        );
    }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));