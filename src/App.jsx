import { Routes, Route } from "react-router-dom";
import TrangChu from "./pages/TrangChu";
import Register from "./pages/Register";
import DangNhap from "./pages/DangNhap";
import Dashboard from "./pages/Dashboard";
import ProfileManagement from "./pages/ProfileManagement";
import CreateProjectDashboard from "./pages/CreateProjectDashboard";
import CustomProfileBuilder from "./pages/CustomProfileBuilder";
import Connections from "./pages/Connections";
import CustomProjectBuilder from "./pages/CustomProjectBuilder";
import FeatureComingSoon from "./pages/FeatureComingSoon";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<TrangChu />} />
      <Route path="/dangnhap" element={<DangNhap />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile-management" element={<ProfileManagement />} />
      <Route path="/create-project" element={<CreateProjectDashboard />} />
      <Route path="/custom-profile-builder" element={<CustomProfileBuilder />} />
      <Route path="/connections" element={<Connections />} />
      <Route path="/custom-project-builder" element={<CustomProjectBuilder />} />
      <Route path="/coming-soon" element={<FeatureComingSoon />} />
    </Routes>
  );
}
