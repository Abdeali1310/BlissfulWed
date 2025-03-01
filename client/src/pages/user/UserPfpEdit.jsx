import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Card, CardContent, Typography } from "@mui/material";

const UserPfpEdit = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        bio: "",
        contact: "",
        city: "",
        dateOfEvent: "",
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("token");
            try {
                const res = await axios.get("http://localhost:5000/api/user/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setFormData(res.data.user);
            } catch (error) {
                setError("Failed to fetch profile.");
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        try {
            await axios.put(`http://localhost:3000/api/user/profile/edit/${formData._id}`, formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert("Profile updated successfully!");
            navigate("/profile");
        } catch (error) {
            setError("Error updating profile.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <Card className="w-full max-w-lg shadow-lg rounded-xl">
                <CardContent className="p-6">
                    <Typography variant="h5" className="text-center font-semibold text-gray-800 mb-4">
                        Edit Profile
                    </Typography>

                    {error && <Typography className="text-red-500 text-center">{error}</Typography>}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <TextField
                            label="Username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            label="Bio"
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            multiline
                            rows={3}
                            fullWidth
                        />
                        <TextField
                            label="Contact"
                            name="contact"
                            value={formData.contact}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            label="City"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            label="Date of Event"
                            name="dateOfEvent"
                            type="date"
                            value={formData.dateOfEvent}
                            onChange={handleChange}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                        />

                        <div className="flex justify-between mt-4">
                            <Button
                                variant="contained"
                                color="primary"
                                className="w-1/2 mr-2"
                                type="submit"
                            >
                                Save Changes
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                className="w-1/2 ml-2"
                                onClick={() => navigate("/profile")}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default UserPfpEdit;
