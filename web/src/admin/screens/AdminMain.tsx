import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { selectClasses } from "@mui/material";
import MemberListScreen from "./MemberList";
import QueueList from "./QueueList";
import AdManager from "./AdManager";
//import AdManager from "./AdManager";

const AdminMain = () => {
    const [selectedMenu, setSelectedMenu] = useState("회원관리");
    const sidebarWidth = 280;
  
    const handleMenuSelect = (menu: string) => { 
      setSelectedMenu(menu);
      };
      const renderContent = () => {
          switch (selectedMenu) {
          case "회원관리":
            return <MemberListScreen />;
          case "대기열관리":
            return <QueueList />;
          case "광고관리":
            return <AdManager />;
          default:
            return null;
        }
      };
  
    return (
        <div className="min-h-screen flex">
        <Sidebar
            selectedMenu={selectedMenu}
            onSelectMenu={handleMenuSelect} // 메뉴 선택 시 상태 변경
            width={sidebarWidth}
        />
        <div
          className="contentArea"
          style={{
            marginLeft: `${sidebarWidth + 50}px`,
            transition: "margin 0.4s ease",
            padding: "20px"
          }}
        >
            {renderContent()}
        </div>
        </div>
    );
};
  
export default AdminMain;