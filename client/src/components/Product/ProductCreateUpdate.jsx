import React, { useEffect, useState } from "react";
import store from "../../redux/store/store";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { OnChangeProductInput } from "../../redux/state-slice/product-slice";
import { ErrorToast, IsEmpty } from "../../helper/FormHelper";
import {
  GetProductDetailRequest,
  ProductBrandDropDownRequest,
  ProductCategoryDropDownRequest,
  ProductSaveRequest,
} from "../../APIRequest/ProductAPIRequest";

const ProductCreateUpdate = () => {
  const FormValue = useSelector((state) => state.product.FormValue);
  const navigate = useNavigate();
  const [ObjectID, SetObjectID] = useState(0);

  useEffect(() => {
    (async () => {
      await ProductBrandDropDownRequest();
      await ProductCategoryDropDownRequest();
    })();

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (id !== null) {
      (async () => {
        SetObjectID(id);
        await GetProductDetailRequest(id);
      })();
    }
  }, []);

  const ProductBrandDropDown = useSelector(
    (state) => state.product.ProductBrandDropDown
  );
  const ProductCategoryDropDown = useSelector(
    (state) => state.product.ProductCategoryDropDown
  );

  const SaveChange = async () => {
    if (IsEmpty(FormValue.Name)) {
      ErrorToast("Product Name Required !");
    } else if (IsEmpty(FormValue.BrandID)) {
      ErrorToast("Product Brand Required !");
    } else if (IsEmpty(FormValue.CategoryID)) {
      ErrorToast("Product Category Required !");
    } else if (IsEmpty(FormValue.Unit)) {
      ErrorToast("Product Unit Required !");
    } else {
      if (await ProductSaveRequest(FormValue, ObjectID)) {
        navigate("/ProductListPage");
      }
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <h5>Save Product Type</h5>
                <hr className="bg-light" />

                <div className="col-4 p-2">
                  <label className="form-label">Product Name</label>
                  <input
                    onChange={(e) => {
                      store.dispatch(
                        OnChangeProductInput({
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
                  <label className="form-label">Product Brand</label>
                  <select
                    onChange={(e) => {
                      store.dispatch(
                        OnChangeProductInput({
                          Name: "BrandID",
                          Value: e.target.value,
                        })
                      );
                    }}
                    value={FormValue.BrandID}
                    className="form-select form-select-sm">
                    <option value="">Select Type</option>
                    {ProductBrandDropDown.map((item, i) => {
                      return (
                        <option key={i.toLocaleString()} value={item._id}>
                          {item.Name}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="col-4 p-2">
                  <label className="form-label">Product Category</label>
                  <select
                    onChange={(e) => {
                      store.dispatch(
                        OnChangeProductInput({
                          Name: "CategoryID",
                          Value: e.target.value,
                        })
                      );
                    }}
                    value={FormValue.CategoryID}
                    className="form-select form-select-sm">
                    <option value="">Select Type</option>
                    {ProductCategoryDropDown.map((item, i) => {
                      return (
                        <option key={i.toLocaleString()} value={item._id}>
                          {item.Name}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="col-4 p-2">
                  <label className="form-label">Unit</label>
                  <input
                    onChange={(e) => {
                      store.dispatch(
                        OnChangeProductInput({
                          Name: "Unit",
                          Value: e.target.value,
                        })
                      );
                    }}
                    value={FormValue.Unit}
                    className="form-control form-control-sm"
                    type="text"
                  />
                </div>

                <div className="col-4 p-2">
                  <label className="form-label">Details</label>
                  <input
                    onChange={(e) => {
                      store.dispatch(
                        OnChangeProductInput({
                          Name: "Details",
                          Value: e.target.value,
                        })
                      );
                    }}
                    value={FormValue.Details}
                    className="form-control form-control-sm"
                    type="text"
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
  );
};

export default ProductCreateUpdate;
