import React from "react";
import "./Card.css";
import { GoDotFill } from "react-icons/go"; 

function renderIcon(item) {
  switch (item) {
    case "In progress":
      return <img src="/assets/in-progress.svg" alt="In Progress" style={{ width: "20px" }} />;
    case "Todo":
      return <img src="/assets/To-do.svg" alt="Todo" style={{ width: "20px" }} />;
    case "Backlog":
      return <img src="/assets/Backlog.svg" alt="Backlog" style={{ width: "20px" }} />;
    case "No priority":
      return <img src="/assets/No-priority.svg" alt="No Priority" style={{ width: "20px" }} />;
    case "Urgent":
      return <img src="/assets/SVG - Urgent Priority colour.svg" alt="Urgent" style={{ width: "20px" }} />;
    case "Medium":
      return <img src="/assets/Img - Medium Priority.svg" alt="Medium" style={{ width: "20px" }} />;
    case "Low":
      return <img src="/assets/Img - Low Priority.svg" alt="Low" style={{ width: "20px" }} />;
    case "High":
      return <img src="/assets/Img - High Priority.svg" alt="High" style={{ width: "20px" }} />;
    case "Done":
      return <img src="/assets/Done.svg" alt="Done" style={{ width: "20px" }} />;
    case "Cancelled":
      return <img src="/assets/Cancelled.svg" alt="Cancel" style={{ width: "20px" }} />;
    default:
      return <span style={{ color: "grey", fontSize: "12px" }}>No Data</span>; // Fallback for missing priority states
  }
}

const getRandomColor = () => {
  const darkColors = ["#007BFF", "#6610F2", "#343A40", "#333333"];
  return darkColors[Math.floor(Math.random() * darkColors.length)];
};

const ProfileImage = ({ name }) => {
  const initials = name
    .split(" ")
    .map((part) => part[0].toUpperCase())
    .join("");

  const backgroundColor = getRandomColor();

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        backgroundColor,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "12px",
        color: "white",
        fontWeight: "bold",
      }}
    >
      {initials}
    </div>
  );
};

let prior_list = ["No priority", "Low", "Medium", "High", "Urgent"];

const Card3 = ({ id, title, tag = [], name, status, priority }) => {
  const validPriority = prior_list[priority] || "No priority"; // Fallback for undefined priorities

  return (
    <div className="cardContainer" style={{ gap: "5px" }}>
      <div className="cardHeading flex-sb">
        <span
          style={{ textTransform: "uppercase", fontSize: "13px" }}
          className="color-grey"
        >
          {id}
        </span>
        <div
          className="imageContainer relative"
          style={{ width: "30px", height: "30px" }}
        >
          <ProfileImage name={name} />
          {status ? (
            <div className="avaiStatus"></div>
          ) : (
            <div className="noStatus"></div>
          )}
        </div>
      </div>
      <div className="cardTitle" style={{ fontWeight: 200, display: "flex" }}>
        <p className="para" style={{ fontSize: "13px", fontWeight: "bold" }}>
          {title}
        </p>
      </div>
      <div className="cardTags" style={{ paddingTop: "10px" }}>
        <div className="tags color-grey">
          <div style={{ position: "relative", top: "2px" }}>
            {renderIcon(validPriority)}
          </div>
        </div>
        {tag.map((elem, index) => (
          <div
            key={index}
            className="tags color-grey"
            style={{
              fontSize: "11px",
              paddingTop: "5px",
              paddingBottom: "5px",
            }}
          >
            <GoDotFill
              color="grey"
              style={{ fontSize: "12px", position: "relative", top: "2px" }}
            />{" "}
            {elem}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card3;
