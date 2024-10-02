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

let prior_list = ["No priority", "Low", "Medium", "High", "Urgent"];
const Card2 = ({ id, title, tag, stat, priority }) => {
  return (
    <div className="cardContainer " style={{ gap: "5px" }}>
      <div className="cardHeading flex-sb">
        <span
          style={{ textTransform: "uppercase", fontSize: "13px" }}
          className="color-grey"
        >
          {id}
        </span>
        {/* <div className="imageContainer relative" style={{ width : "30px", height : "30px"}}>
                <img style={{width : "100%", height : "100%",  borderRadius : "50%" }}  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80" alt="UserImage" />
                {status?<div className="avaiStatus"></div>:<div className="noStatus"></div>}
                
            </div> */}
      </div>
      <div className="cardTitle" style={{ fontWeight: 200, display: "flex" }}>
        <div style={{ paddingTop: "2px" }}>{renderIcon(stat)}</div>
        <p
          className="para"
          style={{
            fontSize: "13px",
            fontWeight: "bold",
            position: "relative",
            top: "2px",
            paddingLeft: "4px",
          }}
        >
          {title}
        </p>
      </div>
      <div className="cardTags" style={{ paddingTop: "10px" }}>
        <div className="tags color-grey">
          <div style={{ position: "relative", top: "2px" }}>
            {renderIcon(prior_list[priority])}
          </div>
        </div>
        {tag?.map((elem, index) => {
          return (
            <div
              key={index}
              className="tags color-grey"
              style={{
                fontSize: "11px",
                paddingTop: "5px",
                paddingBottom: "5px",
              }}
            >
              {" "}
              <GoDotFill
                color="grey"
                style={{ fontSize: "12px", position: "relative", top: "2px" }}
              />{" "}
              {elem}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Card2;
