import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Button, CircularProgress, Avatar } from "@mui/material";

const UserPfp = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchUserProfile = async () => {
        try {
          const token = localStorage.getItem("token");
          if (!token) throw new Error("No token found");
      
          const res = await axios.get("http://localhost:3000/api/v1/user", {
            headers: {
              Authorization: `Bearer ${token}`, // Send token in header
            },
            withCredentials: true, // Ensure cookies are included
          });
      
          console.log("User profile:", res.data);
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      };
      
    

    if (loading) return <div className="flex justify-center items-center h-screen"><CircularProgress /></div>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="flex flex-col items-center min-h-screen p-6 bg-gray-100">
            <Card className="w-full max-w-lg shadow-lg rounded-xl">
                <CardContent className="p-6">
                    {/* Profile Header */}
                    <div className="flex flex-col items-center">
                        <Avatar 
                            src={user?.profilePicUrl} 
                            alt="Profile Picture"
                            className="w-24 h-24 border-2 border-gray-300"
                        />
                        <Typography variant="h5" className="mt-2 font-semibold text-gray-800">
                            {user?.username}
                        </Typography>
                        <Typography variant="body2" className="text-gray-500">
                            {user?.email}
                        </Typography>
                    </div>

                    {/* Profile Details */}
                    <div className="mt-4 space-y-3">
                        <Typography variant="body1"><strong>Contact:</strong> {user?.contact}</Typography>
                        <Typography variant="body1"><strong>City:</strong> {user?.city}</Typography>
                        <Typography variant="body1"><strong>Bio:</strong> {user?.bio}</Typography>
                        <Typography variant="body1"><strong>Gender:</strong> {user?.gender}</Typography>
                    </div>

                    {/* Wedding Details */}
                    <div className="mt-4 bg-gray-200 p-3 rounded-lg">
                        <Typography variant="h6" className="font-semibold">Wedding Details</Typography>
                        <Typography variant="body1"><strong>Date of Event:</strong> {user?.weddingDetails?.dateOfEvent || "Not Set"}</Typography>
                    </div>

                    {/* Payment History */}
                    <div className="mt-4 bg-gray-200 p-3 rounded-lg">
                        <Typography variant="h6" className="font-semibold">Payment History</Typography>
                        {user?.paymentHistory?.length > 0 ? (
                            user.paymentHistory.map((payment, index) => (
                                <div key={index} className="mt-2 p-2 bg-white rounded-md shadow-sm">
                                    <Typography variant="body2"><strong>Amount:</strong> ${payment.amount}</Typography>
                                    <Typography variant="body2"><strong>Date:</strong> {new Date(payment.date).toLocaleDateString()}</Typography>
                                    <Typography variant="body2"><strong>Status:</strong> {payment.status}</Typography>
                                </div>
                            ))
                        ) : (
                            <Typography variant="body2" className="text-gray-500">No payment history found.</Typography>
                        )}
                    </div>

                    {/* Profile Actions */}
                    <div className="mt-6 flex justify-between">
                        <Button 
                            variant="contained" 
                            color="primary" 
                            className="w-1/2 mr-2"
                            onClick={() => navigate("/profile/edit")}
                        >
                            Edit Profile
                        </Button>
                        <Button 
                            variant="contained" 
                            color="error" 
                            className="w-1/2 ml-2"
                            onClick={() => navigate("/profile/delete")}
                        >
                            Delete Profile
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default UserPfp;
