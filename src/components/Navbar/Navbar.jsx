import React, { useEffect, useState, useRef } from "react"; 
import { useDispatch, useSelector } from "react-redux";
import { DataGrouping } from "../../UserAction/Actions";
import "./Navbar.css";

// Function to get group value from localStorage or default to "status"
const getGroup = () => {
  return localStorage.getItem("group") || "status";
};

// Function to get order value from localStorage or default to "priority"
const getOrder = () => {
  return localStorage.getItem("order") || "priority";
};

const TopNav = () => {
  const [displayOnClick, setDisplayOnClick] = useState(false);
  const dispatch = useDispatch();
  const { allTickets, allUser } = useSelector((state) => state.DataReducer);
  const [groupValue, setGroupValue] = useState(getGroup());
  const [orderValue, setOrderValue] = useState(getOrder());
  const dropdownRef = useRef(null); 

  // Function to handle group and order selection
  const handleGroupValue = (e, isGroup) => {
    const value = e.target.value;
    if (isGroup) {
      setGroupValue(value);
      localStorage.setItem("group", value);
    } else {
      setOrderValue(value);
      localStorage.setItem("order", value);
    }

    // Close the dropdown when an option is selected
    setDisplayOnClick(false);
  };

  // Dispatch action based on selected group and order
  useEffect(() => {
    if (["user", "status", "priority"].includes(groupValue)) {
      dispatch(
        DataGrouping(
          groupValue,
          { allTickets, allUser },
          orderValue
        )
      );
    }
  }, [allTickets, dispatch, groupValue, allUser, orderValue]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDisplayOnClick(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="top-header">
      <div className="displayButton" ref={dropdownRef}>
        <button
          className="p-10 f-16 btn"
          style={{ fontSize: "15px" }}
          onClick={() => setDisplayOnClick(!displayOnClick)}
        >
          {/* Display Icon */}
          <img
            src="/assets/Display.svg"
            alt="Display Icon"
            style={{
              transform: "rotate(90deg)",
              position: "relative",
              top: "3px",
              width: "20px",
              marginRight: "5px",
            }}
          />
          Display
          <img
            src="/assets/down.svg"
            alt="Arrow Down"
            style={{
              position: "relative",
              top: "3px",
              width: "15px",
              marginLeft: "5px",
            }}
          />
        </button>
        {displayOnClick && (
          <div className="dropOnClick flex-gap-10 p-10">
            <div className="selectGroup flex-sb">
              <span
                style={{
                  fontWeight: "bold",
                  color: "#a0a1a2",
                  fontSize: "14px",
                }}
              >
                Grouping
              </span>
              <select
                value={groupValue}
                onChange={(e) => handleGroupValue(e, true)}
                className="selectStyle"
                name="group"
                id="group"
              >
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="selectGroup flex-sb">
              <span
                style={{
                  fontWeight: "bold",
                  color: "#a0a1a2",
                  fontSize: "14px",
                }}
              >
                Ordering
              </span>
              <select
                value={orderValue}
                onChange={(e) => handleGroupValue(e, false)}
                className="selectStyle"
                name="order"
                id="order"
              >
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopNav;
