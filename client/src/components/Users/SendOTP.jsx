import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ErrorToast } from "../../helper/FormHelper";
import { RecoverResetPassRequest } from "../../APIRequest/UsersAPIRequest";

const SendOTP = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const SubmitReset = async () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (email.length === 0) {
      ErrorToast("Email is required");
      return;
    }

    if (password.length === 0) {
      ErrorToast("New password is required");
      return;
    }

    if (password.length < 6) {
      ErrorToast("Password must be at least 6 characters");
      return;
    }

    const result = await RecoverResetPassRequest(email, password);

    if (result === true) {
      navigate("/Login");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-7 col-lg-6 center-screen">
          <div className="card animated fadeIn w-90 p-4">
            <div className="card-body">
              <h4>Reset Password</h4>
              <p>Enter your email and new password.</p>

              <input
                ref={emailRef}
                placeholder="User Email"
                className="form-control animated fadeInUp"
                type="email"
              />

              <br />

              <input
                ref={passwordRef}
                placeholder="New Password"
                className="form-control animated fadeInUp"
                type="password"
              />

              <br />

              <button
                onClick={SubmitReset}
                className="btn w-100 animated fadeInUp float-end btn-primary"
              >
                Reset Password
              </button>

              <div className="float-end mt-3">
                <span>
                  <Link className="text-center ms-3 h6" to="/Login">
                    Sign In
                  </Link>
                  <span className="ms-1">|</span>
                  <Link className="text-center ms-3 h6" to="/Registration">
                    Sign Up
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendOTP;