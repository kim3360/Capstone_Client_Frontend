import React, { useEffect, useRef, useState, use } from "react";
import type { ReactNode } from "react";
//import  "../../styles/Admin_Sidebar.css";

interface SidebarProps {
    width?: number;
    selectedMenu?: string;
    onSelectMenu?: (menu: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ width = 280, onSelectMenu, selectedMenu}) => {

    return (
      <div className="bg-[#E3ECF1] h-full z-[99]">
      <div className="fixed top-0 bottom-0 left-0 transition-all ease-in-out duration-300 text-[#202020] z-[99] bg-[#E3ECF1] border-r-[4px] border-[#202020]" 
        style={{ 
          width: `${width}px`, height: '100%'
        }}>   
        <div className="relative w-full pt-10 px-5">
          <ul className="list-none mt-10">
            {["회원관리", "대기열관리", "광고관리"].map((menu) => (
              <li
                key={menu}
                className={ `px-5 py-3 mb-2 rounded-md text-base font-medium cursor-pointer transition-colors duration-300 
                  ${ selectedMenu === menu ? "bg-[#202020] text-white font-bold" : "text-[#202020] hover:bg-[#d1e0e7]" }` }
                onClick={() => onSelectMenu?.(menu)}
              >
                {menu}
              </li>
            ))}
          </ul>
        </div> 
      </div>
    </div>
    );
};

export default Sidebar;