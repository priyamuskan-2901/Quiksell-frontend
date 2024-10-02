import React from "react";
import { useSelector } from "react-redux";
import { AiOutlinePlus } from "react-icons/ai";
import "./KanbanBoard.css";
import Card2 from "../Cards/UserCard";
import Card1 from "../Cards/PriorityCard";
import Card3 from "../Cards/StatusCard";

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

const KanbanView = () => {
  const { selectedData } = useSelector((state) => state.SelectDataReducer);
  const isLaptopScreen = window.innerWidth >= 1024;

  return (
    selectedData && (
      <div className="dashContainer" style={{ justifyContent: "space-evenly" }}>
        {selectedData.map((elem, index) => {
          // console.log(elem[index]?.available);
          const len = selectedData.length;
          var gap = "30";
          if (len === 3) {
            gap = "200";
          } else if (len === 4) {
            gap = "40";
          } else {
            gap = "30";
          }
          var Width = "";
          if (isLaptopScreen) {
            Width = `calc((100% - ${gap * (len - 1)}px) / ${len})`;
          }
          return (
            <>
              <div
                key={index}
                className="dashCardContainer"
                style={{
                  width: Width,
                }}
              >
                <div className="dashCardHeading flex-sb">
                  <div className="leftView">
                    {elem[index]?.available !== undefined ? (
                      <div
                        className="imageContainer relative"
                        style={{ width: "30px", height: "30px" }}
                      >
                        <ProfileImage name={elem[index]?.title} />
                        {elem[index]?.available ? (
                          <div className="avaiStatus"></div>
                        ) : (
                          <div className="noStatus"></div>
                        )}
                      </div>
                    ) : (
                      <div style={{ paddingTop: "2px" }}>
                        {renderIcon(elem[index]?.title)}
                      </div>
                    )}

                    <div className="title">{elem[index]?.title}</div>
                    <div className="len">{elem[index]?.value?.length}</div>
                    {/* {elem[index]?.title} {"("+elem[index]?.value?.length+")"} */}
                  </div>
                  <div className="rightView">
                    <AiOutlinePlus color="gray" fontWeight="bold" />{" "}
                    <span
                      style={{
                        letterSpacing: "2px",
                        color: "gray",
                        fontWeight: "bold",
                      }}
                    >
                      ...
                    </span>
                  </div>
                </div>
                {/* {console.log(elem)} */}
                {elem[index].category === "status" ? (
                  <div className="dashList flex-gap-10">
                    {elem[index]?.value?.map((elem, ind) => {
                      // console.log(allUsers);
                      return (
                        <Card3
                          id={elem.id}
                          title={elem.title}
                          tag={elem.tag}
                          name={elem.user.name}
                          status={elem.user.available}
                          priority={elem.priority}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <div className="dashList flex-gap-10">
                    {elem[index]?.value?.map((elem, ind) => {
                      // console.log(allUsers);
                      return elem.user ? (
                        <Card1
                          id={elem.id}
                          title={elem.title}
                          tag={elem.tag}
                          stat={elem.status}
                          name={elem.user.name}
                          status={elem.user.available}
                        />
                      ) : (
                        <Card2
                          id={elem.id}
                          title={elem.title}
                          tag={elem.tag}
                          stat={elem.status}
                          priority={elem.priority}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            </>
          );
        })}
        {/* // })} */}
      </div>
    )
  );
};

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


export default KanbanView;
