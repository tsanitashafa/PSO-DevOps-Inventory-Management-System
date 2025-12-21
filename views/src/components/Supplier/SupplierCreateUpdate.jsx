import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ErrorToast, IsEmail, IsEmpty } from "../../helper/FormHelper";
import store from "../../redux/store/store";
import { OnChangeSupplierInput } from "../../redux/state-slice/supplier-slice";
import {
  GetSupplierDetailsRequest,
  SupplierSaveRequest,
} from "../../APIRequest/SupplierAPIRequest";

const SupplierCreateUpdate = () => {
  const FormValue = useSelector((state) => state.supplier.FormValue);
  const navigate = useNavigate();
  const [ObjectID, SetObjectID] = useState(0);
  useEffect(() => {
    // URL search parameters are key–value pairs added after ? in a URL to pass data such as filters, search terms, or pagination values.
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (id !== null) {
      (async () => {
        SetObjectID(id);
        await GetSupplierDetailsRequest(id);
      })();
    }
  }, []);

  const SaveChange = async () => {
    if (IsEmpty(FormValue.Name)) {
      ErrorToast("Supplier Name Required !");
    } else if (IsEmpty(FormValue.Phone)) {
      ErrorToast("Supplier Phone  Number Required !");
    } else if (IsEmail(FormValue.Email)) {
      ErrorToast("Valid Email Address Required !");
    } else {
      if (await SupplierSaveRequest(FormValue, ObjectID)) {
        navigate("/SupplierListPage");
      }
    }
  };

  return (
    <Fragment>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <h5>Save Supplier</h5>
                  <hr className="bg-light" />

                  <div className="col-4 p-2">
                    <label className="form-label">Supplier Name</label>
                    <input
                      onChange={(e) => {
                        store.dispatch(
                          OnChangeSupplierInput({
                            Name: "Name",
                            Value: e.target.value,
                          })
                        );
                      }}
                      value={FormValue.Name}
                      className="form-control form-control-sm"
                      type="text"
                    />
                  </div>
                  <div className="col-4 p-2">
                    <label className="form-label">Mobile No</label>
                    <input
                      onChange={(e) => {
                        store.dispatch(
                          OnChangeSupplierInput({
                            Name: "Phone",
                            Value: e.target.value,
                          })
                        );
                      }}
                      value={FormValue.Phone}
                      className="form-control form-control-sm"
                      type="text"
                    />
                  </div>
                  <div className="col-4 p-2">
                    <label className="form-label">Email </label>
                    <input
                      onChange={(e) => {
                        store.dispatch(
                          OnChangeSupplierInput({
                            Name: "Email",
                            Value: e.target.value,
                          })
                        );
                      }}
                      value={FormValue.Email}
                      className="form-control form-control-sm"
                      type="text"
                    />
                  </div>
                  <div className="col-12 p-2">
                    <label className="form-label">Address</label>
                    <textarea
                      onChange={(e) => {
                        store.dispatch(
                          OnChangeSupplierInput({
                            Name: "Address",
                            Value: e.target.value,
                          })
                        );
                      }}
                      value={FormValue.Address}
                      className="form-control form-control-sm"
                      rows={4}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-4 p-2">
                    <button
                      onClick={SaveChange}
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
    </Fragment>
  );
};

export default SupplierCreateUpdate;
