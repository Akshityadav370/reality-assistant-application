import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
} from "../../firebase";
import "./OrderTrackingPage.css";

const OrderTrackingPage = () => {
  const [tableNo, setTableNumber] = useState("");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (tableNo) => {
    setLoading(true);
    setError("");
    try {
      const q = query(
        collection(db, "orders"),
        where("tableNo", "==", tableNo),
        orderBy("timestamp", "desc")
        // limit(1)
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        setError("No orders found for this table number.");
        setOrder(null);
      } else {
        const orders = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrder(orders);
        console.log("Orders", order);
      }
    } catch (err) {
      console.error("Error fetching order data:", err);
      console.log(err);
      setError("Error fetching order data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 1:
        return "Placed";
      case 2:
        return "Accepted";
      case 3:
        return "Preparing";
      case 4:
        return "Delivered";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="track-order-container">
      <h1 className="track-order-heading">Track Order</h1>
      <div className="search-container">
        <input
          value={tableNo}
          onChange={(e) => setTableNumber(e.target.value)}
          placeholder="Enter table number"
          className="input"
        />
        <button
          onClick={() => handleSearch(tableNo)}
          disabled={loading}
          className="button"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>
      {error && <p className="error">{error}</p>}
      {order && (
        <div className="order-details">
          {order.map((singleOrder, index) => (
            <div key={index} className="single-order">
              <div className="orderHeading">
                <div className="orderHeading-Left">
                  <div className="inline">
                    <span className="status">Table {singleOrder.tableNo}</span>
                  </div>
                  <div className="inline">
                    <span className="orderId">{singleOrder.id}</span>
                  </div>
                </div>
              </div>

              <h3>Items:</h3>
              <ul className="item-list">
                {singleOrder.items.map((item, idx) => (
                  <li key={idx}>
                    {item.name} - x {item.qty}
                  </li>
                ))}
              </ul>
              {singleOrder.specialInstructions && (
                <div className="special-instructions">
                  <p>" {singleOrder.specialInstructions} "</p>
                </div>
              )}
              <div className="dateContainer">
                <p className="statusText">
                  {getStatusText(singleOrder.status)}
                </p>
                <p className="date">
                  {singleOrder.name}
                  <br />
                  {singleOrder.phoneNumber}
                  <br />
                  {singleOrder.timestamp.toDate().toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderTrackingPage;
