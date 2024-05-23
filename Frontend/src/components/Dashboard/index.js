import React from 'react';
import { FaMoneyBill } from 'react-icons/fa';
function Dashboard() {
  return (
    <>
      <div className="Dasboard">
        <div className="contaner">
          <div className="header">
            <h1>Hi, Administrator! Welcome to your Dashboard</h1>
          </div>
          <div className="contaner_content">
            <div className="hearder_title">
              <h1>Today's Data</h1>
            </div>
            <div className="box_content_0">
              <div className="box_content">
                <div className="box_content_1">
                  <h2>Sell's</h2>
                </div>
                <div className="box_content_2">
                  <h3>View</h3>
                </div>
                <div className="icon1">
                  <FaMoneyBill size={45} color="green" />
                </div>
              </div>
              <div className="box_content">
                <div className="box_content_1">
                  <h2>Total Products</h2>
                </div>
                <div className="box_content_2">
                  <h3>View</h3>
                </div>
                <div className="icon1">
                  <FaMoneyBill size={45} color="green" />
                </div>
              </div>
              <div className="box_content">
                <div className="box_content_1">
                  <h2>Sell's</h2>
                </div>
                <div className="box_content_2">
                  <h3>View</h3>
                </div>
                <div className="icon1">
                  <FaMoneyBill size={45} color="green" />
                </div>
              </div>
              <div className="box_content">
                <div className="box_content_1">
                  <h2>Sell's</h2>
                </div>
                <div className="box_content_2">
                  <h3>View</h3>
                </div>
                <div className="icon1">
                  <FaMoneyBill size={45} color="green" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </>
  );
}

export default Dashboard;