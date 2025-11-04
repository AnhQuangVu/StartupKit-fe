import { Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/common/ErrorBoundary";
import TrangChu from "./pages/TrangChu";
import ProjectProfilePreview from "./components/project/ProjectProfilePreview";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import DangNhap from "./pages/DangNhap";
import Dashboard from "./pages/Dashboard";
import ProfileManagement from "./pages/ProfileManagement";
import CreateProjectDashboard from "./pages/CreateProjectDashboard";
import CustomProfileBuilder from "./pages/CustomProfileBuilder";
import Connections from "./pages/Connections";
import CustomProjectBuilder from "./pages/CustomProjectBuilder";
import FeatureComingSoon from "./pages/FeatureComingSoon";
import LoginForm from "./components/auth/LoginForm";
import KhamPha from "./pages/KhamPha";
import Platform from "./pages/Platform";
import UploadProfile from "./pages/profile/UploadProfile";
import DienDan from "./pages/DienDan";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import PublicProfile from "./pages/PublicProfile";

export default function App() {
  return (
    <ErrorBoundary>
    <Routes>
      <Route path="/" element={<TrangChu />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile-management" element={<ProfileManagement />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/create-project" element={<CreateProjectDashboard />} />
      <Route
        path="/custom-profile-builder"
        element={<CustomProfileBuilder />}
      />
      <Route path="/connections" element={<Connections />} />
      <Route
        path="/custom-project-builder"
        element={<CustomProjectBuilder />}
      />
      <Route path="/coming-soon" element={<FeatureComingSoon />} />
      <Route path="/dang-nhap" element={<DangNhap />} />
      <Route path="/project-profile-preview" element={<ProjectProfilePreview />} />
      <Route path="/projectProfilePreview" element={<ProjectProfilePreview />} />
      <Route path="/dien-dan" element={<DienDan />} />
      <Route path="/kham-pha" element={<KhamPha />} />
      <Route path="/platform" element={<Platform />} />
      <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
  <Route path="/profile/upload" element={<UploadProfile />} />
  <Route path="/public-profile" element={<PublicProfile />} />
  <Route path="/public-profile/:id" element={<PublicProfile />} />
    </Routes>
    </ErrorBoundary>
  );
}
