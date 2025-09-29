import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import GridLayout from "react-grid-layout";
import Navbar from "../components/layout/Navbar";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardMenu from "../components/dashboard/DashboardMenu";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import Footer from "../components/layout/Footer";
import { useNavigate } from "react-router-dom";

const initialLayout = [
  { i: "input1", x: 0, y: 0, w: 4, h: 2 },
  { i: "input2", x: 4, y: 0, w: 4, h: 2 },
  { i: "image", x: 0, y: 2, w: 4, h: 4 },
  { i: "bg", x: 4, y: 2, w: 4, h: 4 }
];

export default function CustomProfileBuilder() {
  const navigate = useNavigate();
  const [layout, setLayout] = React.useState(initialLayout);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="mt-4">
        <DashboardHeader userType="startup" isLoggedIn={true} />
      </div>
      <div className="flex justify-start px-8 mt-4">
          <button
            className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-3 py-2 rounded-md shadow transition flex items-center gap-2"
            style={{ marginLeft: "20px" }}
            onClick={() => navigate("/create-project")}
          >
            <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" />
            <span className="text-sm">Quay lại tạo dự án</span>
          </button>
      </div>
      <Footer />
    </div>
  );
}
