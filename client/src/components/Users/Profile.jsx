import React, { useEffect, useRef, useState } from "react";
import {
  GetProfileDetails,
  ProfileUpdateRequest,
} from "../../APIRequest/UsersAPIRequest";
import { getUserData, setUserData } from "../../helper/SessionHelper";
import { useSelector } from "react-redux";
import {
  ErrorToast,
  ToBase64,
  IsEmail,
  IsEmpty,
  IsMobile,
} from "../../helper/FormHelper";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const emailRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const mobileRef = useRef();
  const passwordRef = useRef();
  const userImgRef = useRef();
  const userImgView = useRef();
  const [photoPreview, setPhotoPreview] = useState(
    getUserData()?.photo || ""
  );

  useEffect(() => {
    (async () => {
      await GetProfileDetails();
    })();
  }, []);

  const ProfileData = useSelector((state) => state.profile.value);

  useEffect(() => {
    if (ProfileData?.photo) {
      setPhotoPreview(ProfileData.photo);
    }
  }, [ProfileData]);

  let navigate = useNavigate();

  const PreviewImage = () => {
    let ImgFile = userImgRef.current.files[0];
  
    ToBase64(ImgFile).then((base64Img) => {
      setPhotoPreview(base64Img);
    });
  };

  const UpdateMyProfile = async () => {
    let email = emailRef.current.value;
    let fastName = firstNameRef.current.value;
    let lastName = lastNameRef.current.value;
    let mobile = mobileRef.current.value;
    let password = passwordRef.current.value;
    let photo = photoPreview;

    if (IsEmail(email)) {
      ErrorToast("Valid Email Address Required !");
    } else if (IsEmpty(fastName)) {
      ErrorToast("First Name Required !");
    } else if (IsEmpty(lastName)) {
      ErrorToast("Last Name Required !");
    } else if (!IsMobile(mobile)) {
      ErrorToast("Valid Mobile  Required !");
    } else if (IsEmpty(password)) {
      ErrorToast("Password Required !");
    } else {
      let result = await ProfileUpdateRequest(
        email,
        fastName,
        lastName,
        mobile,
        password,
        photo
      );
      if (result === true) {
        let user = getUserData();
      
        user.email = email;
        user.firstName = fastName;
        user.lastName = lastName;
        user.mobile = mobile;
        user.photo = photo;
      
        setUserData(user);
      
        navigate("/");
        window.location.reload();
      }
    }
  };

  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <div className="container-fluid">
                <img
                  ref={userImgView}
                  className="icon-nav-img-lg"
                  src={photoPreview || ProfileData?.photo || getUserData()?.photo || ""}
                  alt=""
                />
                <hr />
                <div className="row">
                  <div className="col-4 p-2">
                    <label>Profile Picture</label>
                    <input
                      onChange={PreviewImage}
                      ref={userImgRef}
                      placeholder="User Email"
                      className="form-control animated fadeInUp"
                      type="file"
                    />
                  </div>
                  <div className="col-4 p-2">
                    <label>Email Address</label>
                    <input
                      defaultValue={ProfileData?.email || ""}
                      readOnly={true}
                      ref={emailRef}
                      placeholder="User Email"
                      className="form-control animated fadeInUp"
                      type="email"
                    />
                  </div>
                  <div className="col-4 p-2">
                    <label>First Name</label>
                    <input
                      defaultValue={ProfileData?.firstName || ""}
                      ref={firstNameRef}
                      placeholder="First Name"
                      className="form-control animated fadeInUp"
                      type="text"
                    />
                  </div>
                  <div className="col-4 p-2">
                    <label>Last Name</label>
                    <input
                      defaultValue={ProfileData?.lastName || ""}
                      ref={lastNameRef}
                      placeholder="Last Name"
                      className="form-control animated fadeInUp"
                      type="text"
                    />
                  </div>
                  <div className="col-4 p-2">
                    <label>Mobile</label>
                    <input
                      defaultValue={ProfileData?.mobile || ""}
                      ref={mobileRef}
                      placeholder="Mobile"
                      className="form-control animated fadeInUp"
                      type="mobile"
                    />
                  </div>
                  <div className="col-4 p-2">
                    <label>Password</label>
                    <input
                      defaultValue={ProfileData?.password || ""}
                      ref={passwordRef}
                      placeholder="User Password"
                      className="form-control animated fadeInUp"
                      type="password"
                    />
                  </div>
                  <div className="col-4 p-2">
                    <button
                      onClick={UpdateMyProfile}
                      className="w-100  btn btn-success">
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
