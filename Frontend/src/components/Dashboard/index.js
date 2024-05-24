import React, { useEffect, useState } from 'react';
import { FaMoneyBill } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { FaShoppingCart } from 'react-icons/fa';
import axios from 'axios';
function Dashboard() {
  const [totalCustomer, setTotalCustomer] = useState(null);
  const [totalProduct, setTotalProduct] = useState(null);
  const [totalOrder, setTotalOrder] = useState(null);
  useEffect(() => {
    const fetchTotalCustomer = async () => {
      try {
        const token = localStorage.getItem('tokens');
        if (!token) {
          throw new Error("No token found");
        }
        const response = await axios.get('http://localhost:4060/api/chart/totalInfo', {
          headers: {
            'x-access-token': token
          }
        });
        setTotalCustomer(response.data.countCustomer);
        setTotalProduct(response.data.countProduct);
        setTotalOrder(response.data.countOrder)
        console.log("Tổng số khách hàng:", response.data.count);
      } catch (error) {
        console.error('Error fetching total customer count:', error);
      }
    };

    fetchTotalCustomer();
  }, []);
  return (
    <>
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
                <h2>Total Customers</h2>
              </div>
              <div className="box_content_2">
                <h3>{totalCustomer !== null ? totalCustomer : 'Loading...'}</h3>
              </div>
              <div className="icon1">
                <FaUser size={65} color="green" />
              </div>
            </div>
            <div className="box_content">
              <div className="box_content_1">
                <h2>Total Products</h2>
              </div>
              <div className="box_content_2">
                <h3>{totalProduct !== null ? totalProduct : 'Loading...'}</h3>
              </div>
              <div className="icon1">
                <FaShoppingCart size={65} color="green" />
              </div>
            </div>
            <div className="box_content">
              <div className="box_content_1">
                <h2>Total Revenue</h2>
              </div>
              <div className="box_content_2">
                <h3>{totalOrder !== null ? totalOrder : 'Loading...'}</h3>
              </div>
              <div className="icon1">
                <FaMoneyBill size={65} color="green" />
              </div>
            </div>
          </div>
        </div>



      </div>

    </>
  );
}

export default Dashboard;