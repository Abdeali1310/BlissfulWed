/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import {
  FaBars,
  FaHome,
  FaClipboardList,
  FaFileInvoice,
  FaConciergeBell,
  FaBox,
  FaUsers,
  FaImage,
  FaMoneyBill,
  FaStar,
  FaChartBar,
  FaCog,
  FaEnvelope,
  FaUser,
  FaMoneyBillAlt,
  FaDollarSign,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import { Drawer, IconButton } from "@mui/material";
import Navbar from "./components/Navbar";
import Settings from "./components/Settings";
import UserProfile from "./pages/UserProfile";
import UserList from "./pages/UserList";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../../../redux/slices/userSlice";
import { fetchPayments } from "../../../redux/slices/paymentSlice";
import { fetchBookings } from "../../../redux/slices/bookingSlice";
import { fetchReviews } from "../../../redux/slices/reviewSlice";
import { fetchServices } from "../../../redux/slices/serviceSlice";
import DashboardHome from "./components/DashboardHome";
import Bookings from "./pages/Bookings";
import Service from "./components/Service";
import Payment from "./pages/Payment";

const AdminDashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchPayments());
    dispatch(fetchBookings());
    dispatch(fetchReviews());
    dispatch(fetchServices());
  }, [dispatch]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);
  const toggleDarkMode = () => setDarkMode(!darkMode);
  const tabs = [
    { id: "dashboard", label: "Dashboard (Home)", icon: <FaHome size={20} /> },
    { id: "bookings", label: "Bookings Management", icon: <FaClipboardList size={20} /> },
    { id: "services", label: "Services", icon: <FaConciergeBell size={20} /> },
    { id: "users", label: "Users Management", icon: <FaUsers size={20} /> },
    {
      id: "payment",
      label: "Payment Management",
      icon: <FaDollarSign size={20} />,
    },
    { id: "reviews", label: "Reviews & Feedback", icon: <FaStar size={20} /> },
    {
      id: "reports",
      label: "Reports & Analytics",
      icon: <FaChartBar size={20} />,
    },
    {
      id: "support",
      label: "Customer Support",
      icon: <FaEnvelope size={20} />,
    },
    { id: "settings", label: "Settings", icon: <FaCog size={20} /> },
    { id: "account", label: "Account", icon: <FaUser size={20} /> },
  ];

  return (
    <div className="flex h-screen dark:bg-gray-900 text-black dark:text-white">
      {/* Hamburger Icon for Mobile */}
      <div className="lg:hidden absolute top-4 left-4">
        <IconButton onClick={() => setIsDrawerOpen(true)}>
          <FaBars size={24} />
        </IconButton>
      </div>

      {/* Sidebar for Large Screens */}
      <div className="hidden lg:flex w-[35vh] bg-pink-500 text-white p-5 flex-col">
        <h2 className="text-2xl font-bold mb-6">BlissfulWed</h2>
        <nav className="space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setIsDrawerOpen(false);
              }}
              className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg transition-all duration-200 ${
                activeTab === tab.id
                  ? darkMode
                    ? "bg-gray-700"
                    : "bg-pink-700"
                  : darkMode
                  ? "hover:bg-gray-600"
                  : "hover:bg-pink-800"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* MUI Drawer for Mobile */}
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <div className="w-[35vh] bg-pink-500 h-screen text-white p-5">
          <h2 className="text-2xl font-bold mb-6">BlissfulWed</h2>
          <nav className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsDrawerOpen(false);
                }}
                className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg transition-all duration-200 ${
                  activeTab === tab.id ? "bg-pink-700" : "hover:bg-pink-800"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </Drawer>
      <div className="flex flex-col">
        <Navbar />
        {/* Main Content */}
        <div className="flex-1 lg:p-6 bg-gray-100 p-6 w-screen overflow-auto">
          {activeTab === "dashboard" && <DashboardTab />}
          {activeTab === "bookings" && <BookingsTab />}
          {activeTab === "invoice" && <InvoiceMgmtTab />}
          {activeTab === "services" && <ServicesTab />}
          {activeTab === "packages" && <PackagesTab />}
          {activeTab === "users" && <UsersMgmtTab />}
          {activeTab === "gallery" && <GalleryMgmtTab />}
          {activeTab === "payment" && <PaymentMgmtTab />}
          {activeTab === "reviews" && <ReviewsFeedbackTab />}
          {activeTab === "reports" && <ReportsAnalyticsTab />}
          {activeTab === "settings" && <SettingsTab />}
          {activeTab === "support" && <CustomerQueriesSupportTab />}
          {activeTab === "account" && <AccountTab />}
        </div>
      </div>
    </div>
  );
};

const DashboardTab = () => (
  <div>
    <h1 className="text-2xl font-bold">Dashboard</h1>
    <DashboardHome />
  </div>
);

const UsersTab = () => (
  <div>
    <h1 className="text-2xl font-bold">Users Management</h1>
    <p className="mt-2">Manage user accounts and permissions.</p>
  </div>
);

const BookingsTab = () => (
  <div>
    <h1 className="text-2xl font-bold text-pink-500">Bookings Management</h1>
    <Bookings />
  </div>
);

const InvoiceMgmtTab = () => (
  <div>
    <h1 className="text-2xl font-bold">Invoice Management</h1>
    <p className="mt-2">Generate and manage invoices for transactions.</p>
  </div>
);

const ServicesTab = () => (
  <div>
    <h1 className="text-2xl font-bold">Services</h1>
    <Service />
  </div>
);

const PackagesTab = () => (
  <div>
    <h1 className="text-2xl font-bold">Packages</h1>
    <p className="mt-2">Manage different event packages and pricing.</p>
  </div>
);

const UsersMgmtTab = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div>
      <h1 className="text-2xl font-bold">Users Management</h1>
      <p className="mt-2">Manage user accounts and permissions.</p>

      {selectedUser ? (
        <UserProfile
          userId={selectedUser}
          goBack={() => setSelectedUser(null)}
        />
      ) : (
        <UserList onUserSelect={(id) => setSelectedUser(id)} />
      )}
    </div>
  );
};

const GalleryMgmtTab = () => (
  <div>
    <h1 className="text-2xl font-bold">Gallery Management</h1>
    <p className="mt-2">Manage and organize event images.</p>
  </div>
);

const PaymentMgmtTab = () => (
  <div>
    <h1 className="text-2xl font-bold">Payment Management</h1>
    <Payment />
  </div>
);

const ReviewsFeedbackTab = () => (
  <div>
    <h1 className="text-2xl font-bold">Reviews & Feedback</h1>
    <p className="mt-2">Manage customer reviews and feedback.</p>
  </div>
);

const ReportsAnalyticsTab = () => (
  <div>
    <h1 className="text-2xl font-bold">Reports & Analytics</h1>
    <p className="mt-2">View system reports and performance analytics.</p>
  </div>
);

const SettingsTab = () => (
  <div>
    <Settings />
  </div>
);

const CustomerQueriesSupportTab = () => (
  <div>
    <h1 className="text-2xl font-bold">Customer Queries & Support</h1>
    <p className="mt-2">Manage customer inquiries and support requests.</p>
  </div>
);

const AccountTab = () => (
  <div>
    <h1 className="text-2xl font-bold">Account</h1>
    <p className="mt-2">Manage personal account settings and details.</p>
  </div>
);

export default AdminDashboard;
