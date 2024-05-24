<<<<<<< HEAD
import { useEffect, useState } from "react";
import { getResource } from "../../services/services";


function Profile(props) {
    const [activeTab, setActiveTab] = useState("nav-home");
    const [userData, setUserData] = useState(null);
    const [result, setResult]= useState("");

    useEffect(() => {
        const fetchData = async () => {
            const result = await getResource("users");
            const localStorageToken = localStorage.getItem("tokens");
            const data = result.data.find(user => user.tokens.some(tokenObj => tokenObj.token === localStorageToken))
            setUserData(data);
            
            setResult(result);
        }
        fetchData();
    }, []);
    const getData = () => {  
        const localStorageToken = localStorage.getItem("tokens");
        const data = result.data.find(user => user.tokens.some(tokenObj => tokenObj.token === localStorageToken))
        setUserData(data);
        console.log(userData);
    }
    console.log(userData);
    return (
        <>
            <div className="profile">
                <div className="card">
                    <div className="card-header">
                        <ul className="nav nav-tabs col-md-12" id="nav-tab" role="tablist">
                            <li class="nav-item col-md-4 boder-right">
                                <button
                                    className={`nav-link ${activeTab === "nav-home" ? "active" : ""
                                        }`}
                                    id="nav-home-tab"
                                    data-toggle="tab"
                                    data-target="#nav-home"
                                    type="button"
                                    role="tab"
                                    aria-controls="nav-home"
                                    aria-selected={activeTab === "nav-home"}
                                    onClick={() => setActiveTab("nav-home")}
                                >
                                    More Information
                                </button>
                            </li>
                            <li class="nav-item col-md-4 boder-right">
                                <button
                                    className={`nav-link ${activeTab === "nav-profile" ? "active" : ""
                                        }`}
                                    id="nav-profile-tab"
                                    data-toggle="tab"
                                    data-target="#nav-profile"
                                    type="button"
                                    role="tab"
                                    aria-controls="nav-profile"
                                    aria-selected={activeTab === "nav-profile"}
                                    onClick={() => setActiveTab("nav-profile")}
                                >
                                    Change Information
                                </button>
                            </li>
                            <li class="nav-item col-md-4 ">
                                <button
                                    className={`nav-link ${activeTab === "nav-contact" ? "active" : ""
                                        }`}
                                    id="nav-contact-tab"
                                    data-toggle="tab"
                                    data-target="#nav-contact"
                                    type="button"
                                    role="tab"
                                    aria-controls="nav-contact"
                                    aria-selected={activeTab === "nav-contact"}
                                    onClick={() => setActiveTab("nav-contact")}
                                >
                                    Change Password
                                </button>
                            </li>
                        </ul>
                    </div>
                    {/* Chuyển hướng */}
                    <div className="card-body">
                        <div className="tab-content" id="myTabContent">
                            {/* More Information */}
                            <div
                                className={`tab-pane fade ${activeTab === "nav-home" ? "show active" : ""
                                    }`}
                                id="more-info"
                                role="tabpanel"
                                aria-labelledby="more-info-tab"
                            >
                                <div className="row">
                                    <div className="col-md-8 col-xs-12">
                                        <div className="item row">
                                            <div className="item-title col-3 d-flex justify-content-end">
                                                User Name:
                                            </div>
                                            <div className="col-8">tadinhtai</div>
                                        </div>
                                        <div className="item row">
                                            <div className="item-title col-3 d-flex justify-content-end">
                                                Phone:
                                            </div>
                                            <div className="col-8">103156654654</div>
                                        </div>
                                        <div className="item row">
                                            <div className="item-title col-3 d-flex justify-content-end">
                                                Email:
                                            </div>
                                            <div className="col-8">
                                                <div>tadinhtai6868@gmail.com</div>
                                                <a href="#" className="badge bg-label-success">
                                                    Active
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 col-xs-12">
                                        <img
                                            className="tw-rounded"
                                            src="https://dailyotp.com/assets/img/avatars/default.jpg"
                                            alt="Avatar"
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* Change Information */}
                            <div
                                className={`tab-pane fade ${activeTab === "nav-profile" ? "show active" : ""
                                    }`}
                                id="nav-profile"
                                role="tabpanel"
                                aria-labelledby="nav-profile-tab"
                            >
                                <div className="change-infor row">
                                    <div className="col-md-6">
                                        <div className="d-flex align-items-center item">
                                            <div className="col-md-3 item-title d-flex justify-content-end">
                                                User Name:
                                            </div>
                                            <div>
                                                <input
                                                    type="text"
                                                    name="user_name"
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center item">
                                            <div className="col-md-3 item-title d-flex justify-content-end">
                                                Phone:
                                            </div>
                                            <div>
                                                <input
                                                    min="10"
                                                    max="12"
                                                    type="text"
                                                    name="phone"
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-center item">
                                            <div className="col-md-3 item-title d-flex justify-content-end">
                                                Email:
                                            </div>
                                            <div>
                                                <input
                                                    type="text"
                                                    name="email"
                                                    className="form-control"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-xs-12">
                                        <div className="tw-pb-2 choose-img">
                                            <input
                                                accept="image/png, image/gif, image/jpeg"
                                                type="file"
                                                name="avatar"
                                                className="form-control"
                                                id=""
                                            />
                                        </div>
                                        <img
                                            className="tw-rounded"
                                            src="https://dailyotp.com/assets/img/avatars/default.jpg"
                                            alt="Avatar"
                                        />
                                    </div>
                                </div>
                                <div class="d-flex justify-content-center button">
                                    <button type="submit" class="btn btn-save btn-success">
                                        Save changes
                                    </button>
                                    <button type="reset" class="btn btn-danger">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Change Password */}
                        <div
                            className={`tab-pane fade ${activeTab === "nav-contact" ? "show active" : ""
                                }`}
                            id="nav-contact"
                            role="tabpanel"
                            aria-labelledby="nav-contact-tab"
                        >
                            <div className="row">
                                <div className="mb-3 col-md-6 form-password-toggle">
                                    <label className="form-label " htmlFor="currentPassword">
                                        Current Password
                                    </label>
                                    <div className="input-group input-group-merge">
                                        <input
                                            className="form-control"
                                            type="password"
                                            name="password"
                                            id="currentPassword"
                                            placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                                        />
                                        <div className="input-group-text bg-100">
                                            <a href="#" className="toggle_hide_password">
                                                <i
                                                    className="fa-solid fa-eye text-dark"
                                                    style={{ width: "30px!important" }}
                                                ></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="mb-3 col-md-6 form-password-toggle">
                                    <label className="form-label " htmlFor="newPassword">
                                        New Password
                                    </label>
                                    <div className="input-group input-group-merge">
                                        <input
                                            className="form-control"
                                            type="password"
                                            id="new_password"
                                            name="new_password"
                                            placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                                        />
                                        <div className="input-group-text bg-100">
                                            <a href="#" className="toggle_hide_password">
                                                <i
                                                    className="fa-solid fa-eye text-dark"
                                                    style={{ width: "30px!important" }}
                                                ></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3 col-md-6 form-password-toggle">
                                    <label className="form-label " htmlFor="confirmPassword">
                                        Confirm New Password
                                    </label>
                                    <div className="input-group input-group-merge">
                                        <input
                                            className="form-control"
                                            type="password"
                                            name="confirm_password"
                                            id="confirm_password"
                                            placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                                        />
                                        <div className="input-group-text bg-100">
                                            <a href="#" className="toggle_hide_password">
                                                <i
                                                    className="fa-solid fa-eye text-dark"
                                                    style={{ width: "30px!important" }}
                                                ></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 mb-4 tw-border-t tw-border-primary">
                                    <p className="fw-medium mt-2">Password Requirements:</p>
                                    <ul className="ps-3 mb-0">
                                        <li className="mb-1">
                                            Minimum 8 characters long - the more, the better
                                        </li>
                                        <li className="mb-1">At least one lowercase character</li>
                                        <li className="mb-1">At least one uppercase character</li>
                                        <li>
                                            At least one number, symbol, or whitespace character
                                        </li>
                                    </ul>
                                </div>
                                <div className="d-flex">
                                    <button type="submit" className="btn btn-sm btn-success">
                                        Save changes
                                    </button>
                                    <button type="reset" className="btn btn-sm btn-danger">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
=======
import { useState } from "react";

function Profile(props) {
  const [activeTab, setActiveTab] = useState("nav-home");

  return (
    <>
      <div className="profile">
        <div className="card">
          <div className="card-header">
            <ul className="nav nav-tabs col-md-12" id="nav-tab" role="tablist">
              <li class="nav-item col-md-4 boder-right">
                <button
                  className={`nav-link ${
                    activeTab === "nav-home" ? "active" : ""
                  }`}
                  id="nav-home-tab"
                  data-toggle="tab"
                  data-target="#nav-home"
                  type="button"
                  role="tab"
                  aria-controls="nav-home"
                  aria-selected={activeTab === "nav-home"}
                  onClick={() => setActiveTab("nav-home")}
                >
                  More Information
                </button>
              </li>
              <li class="nav-item col-md-4 boder-right">
                <button
                  className={`nav-link ${
                    activeTab === "nav-profile" ? "active" : ""
                  }`}
                  id="nav-profile-tab"
                  data-toggle="tab"
                  data-target="#nav-profile"
                  type="button"
                  role="tab"
                  aria-controls="nav-profile"
                  aria-selected={activeTab === "nav-profile"}
                  onClick={() => setActiveTab("nav-profile")}
                >
                  Change Information
                </button>
              </li>
              <li class="nav-item col-md-4 ">
                <button
                  className={`nav-link ${
                    activeTab === "nav-contact" ? "active" : ""
                  }`}
                  id="nav-contact-tab"
                  data-toggle="tab"
                  data-target="#nav-contact"
                  type="button"
                  role="tab"
                  aria-controls="nav-contact"
                  aria-selected={activeTab === "nav-contact"}
                  onClick={() => setActiveTab("nav-contact")}
                >
                  Change Password
                </button>
              </li>
            </ul>
          </div>
          {/* Chuyển hướng */}
          <div className="card-body">
            <div className="tab-content" id="myTabContent">
              {/* More Information */}
              <div
                className={`tab-pane fade ${
                  activeTab === "nav-home" ? "show active" : ""
                }`}
                id="more-info"
                role="tabpanel"
                aria-labelledby="more-info-tab"
              >
                <div className="row">
                  <div className="col-md-8 col-xs-12">
                    <div className="item row">
                      <div className="item-title col-3 d-flex justify-content-end">
                        User Name:
                      </div>
                      <div className="col-8">tadinhtai</div>
                    </div>
                    <div className="item row">
                      <div className="item-title col-3 d-flex justify-content-end">
                        Phone:
                      </div>
                      <div className="col-8">103156654654</div>
                    </div>
                    <div className="item row">
                      <div className="item-title col-3 d-flex justify-content-end">
                        Email:
                      </div>
                      <div className="col-8">
                        <div>tadinhtai6868@gmail.com</div>
                        <a href="#" className="badge bg-label-success">
                          Active
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 col-xs-12">
                    <img
                      className="tw-rounded"
                      src="https://dailyotp.com/assets/img/avatars/default.jpg"
                      alt="Avatar"
                    />
                  </div>
                </div>
              </div>
              {/* Change Information */}
              <div
                className={`tab-pane fade ${
                  activeTab === "nav-profile" ? "show active" : ""
                }`}
                id="nav-profile"
                role="tabpanel"
                aria-labelledby="nav-profile-tab"
              >
                <div className="change-infor row">
                  <div className="col-md-6">
                    <div className="d-flex align-items-center item">
                      <div className="col-md-3 item-title d-flex justify-content-end">
                        User Name:
                      </div>
                      <div>
                        <input
                          type="text"
                          name="user_name"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="d-flex align-items-center item">
                      <div className="col-md-3 item-title d-flex justify-content-end">
                        Phone:
                      </div>
                      <div>
                        <input
                          min="10"
                          max="12"
                          type="text"
                          name="phone"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="d-flex align-items-center item">
                      <div className="col-md-3 item-title d-flex justify-content-end">
                        Email:
                      </div>
                      <div>
                        <input
                          type="text"
                          name="email"
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-xs-12">
                    <div className="tw-pb-2 choose-img">
                      <input
                        accept="image/png, image/gif, image/jpeg"
                        type="file"
                        name="avatar"
                        className="form-control"
                        id=""
                      />
                    </div>
                    <img
                      className="tw-rounded"
                      src="https://dailyotp.com/assets/img/avatars/default.jpg"
                      alt="Avatar"
                    />
                  </div>
                </div>
                <div class="d-flex justify-content-center button">
                  <button type="submit" class="btn btn-save btn-success">
                    Save changes
                  </button>
                  <button type="reset" class="btn btn-danger">
                    Cancel
                  </button>
                </div>
              </div>
>>>>>>> d462810236ff1f856d9601412c6d1b193731b6d6
            </div>
            {/* Change Password */}
            <div
              className={`tab-pane fade ${
                activeTab === "nav-contact" ? "show active" : ""
              }`}
              id="nav-contact"
              role="tabpanel"
              aria-labelledby="nav-contact-tab"
            >
              <div className="row">
                <div className="mb-3 col-md-6 form-password-toggle">
                  <label className="form-label " htmlFor="currentPassword">
                    Current Password
                  </label>
                  <div className="input-group input-group-merge">
                    <input
                      className="form-control"
                      type="password"
                      name="password"
                      id="currentPassword"
                      placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                    />
                    <div className="input-group-text bg-100">
                      <a href="#" className="toggle_hide_password">
                        <i
                          className="fa-solid fa-eye text-dark"
                          style={{ width: "30px!important" }}
                        ></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="mb-3 col-md-6 form-password-toggle">
                  <label className="form-label " htmlFor="newPassword">
                    New Password
                  </label>
                  <div className="input-group input-group-merge">
                    <input
                      className="form-control"
                      type="password"
                      id="new_password"
                      name="new_password"
                      placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                    />
                    <div className="input-group-text bg-100">
                      <a href="#" className="toggle_hide_password">
                        <i
                          className="fa-solid fa-eye text-dark"
                          style={{ width: "30px!important" }}
                        ></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="mb-3 col-md-6 form-password-toggle">
                  <label className="form-label " htmlFor="confirmPassword">
                    Confirm New Password
                  </label>
                  <div className="input-group input-group-merge">
                    <input
                      className="form-control"
                      type="password"
                      name="confirm_password"
                      id="confirm_password"
                      placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                    />
                    <div className="input-group-text bg-100">
                      <a href="#" className="toggle_hide_password">
                        <i
                          className="fa-solid fa-eye text-dark"
                          style={{ width: "30px!important" }}
                        ></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-12 mb-4 tw-border-t tw-border-primary">
                  <p className="fw-medium mt-2">Password Requirements:</p>
                  <ul className="ps-3 mb-0">
                    <li className="mb-1">
                      Minimum 8 characters long - the more, the better
                    </li>
                    <li className="mb-1">At least one lowercase character</li>
                    <li className="mb-1">At least one uppercase character</li>
                    <li>
                      At least one number, symbol, or whitespace character
                    </li>
                  </ul>
                </div>
                <div className="d-flex">
                  <button type="submit" className="btn btn-sm btn-success">
                    Save changes
                  </button>
                  <button type="reset" className="btn btn-sm btn-danger">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
