import { useDispatch, useSelector } from "react-redux";
import { OnChangeCustomerInput } from "../../redux/state-slice/customer-slice";
import {
  CustomerSaveRequest,
  GetCustomerRequest,
} from "../../APIRequest/CustomerAPIRequest";
import {
  ErrorToast,
  IsEmail,
  IsEmpty,
  IsMobile,
} from "../../helper/FormHelper";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function CustomerCreateUpdate() {
  const [ObjectID, SetObjectID] = useState(0);
  const Dispatch = useDispatch();
  const FormValue = useSelector((state) => state.customer.FormValue);
  const navigate = useNavigate();
  const SaveAndUpdate = async () => {
    if (IsEmpty(FormValue.CustomerName)) {
      ErrorToast("Customer Name Required");
      return;
    } else if (!IsMobile(FormValue.Phone)) {
      ErrorToast("Mobile No Required");
      return;
    } else if (IsEmail(FormValue.Email)) {
      ErrorToast("Invalid Email Address");
      return;
    } else if (IsEmpty(FormValue.Address)) {
      ErrorToast("Address Required");
      return;
    } else {
      const Result = await CustomerSaveRequest(FormValue, ObjectID);
      if (Result) {
        navigate("/CustomerListPage");
      } else {
        ErrorToast("Request Fail Try Again");
      }
    }
  };

  useEffect(() => {
    (async () => {
      const params = new URLSearchParams(window.location.search);
      const id = params.get("id");
      if (id) {
        SetObjectID(id);
        await GetCustomerRequest(id);
      }
    })();
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <h5>Save Customer</h5>
                  <hr className="bg-light" />

                  <div className="col-4 p-2">
                    <label className="form-label">Customer Name</label>
                    <input
                      className="form-control form-control-sm"
                      type="text"
                      value={FormValue.CustomerName}
                      onChange={(e) =>
                        Dispatch(
                          OnChangeCustomerInput({
                            name: "CustomerName",
                            value: e.target.value,
                          })
                        )
                      }
                    />
                  </div>
                  <div className="col-4 p-2">
                    <label className="form-label">Mobile No</label>
                    <input
                      className="form-control form-control-sm"
                      type="text"
                      value={FormValue.Phone}
                      onChange={(e) =>
                        Dispatch(
                          OnChangeCustomerInput({
                            name: "Phone",
                            value: e.target.value,
                          })
                        )
                      }
                    />
                  </div>
                  <div className="col-4 p-2">
                    <label className="form-label">Email </label>
                    <input
                      className="form-control form-control-sm"
                      type="text"
                      value={FormValue.Email}
                      onChange={(e) =>
                        Dispatch(
                          OnChangeCustomerInput({
                            name: "Email",
                            value: e.target.value,
                          })
                        )
                      }
                    />
                  </div>
                  <div className="col-12 p-2">
                    <label className="form-label">Address</label>
                    <textarea
                      className="form-control form-control-sm"
                      rows={4}
                      value={FormValue.Address}
                      onChange={(e) =>
                        Dispatch(
                          OnChangeCustomerInput({
                            name: "Address",
                            value: e.target.value,
                          })
                        )
                      }
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-4 p-2">
                    <button
                      onClick={SaveAndUpdate}
                      className="btn btn-sm my-3 btn-success">
                      Save Change
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomerCreateUpdate;
