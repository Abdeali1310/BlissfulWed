import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Button, Avatar, CircularProgress, Card, CardContent, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)({
    maxWidth: 500,
    margin: "auto",
    padding: 20,
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
});

const UserPfp = () => {
    const [user, setUser] = useState({
        _id: "",
        username: "",
        email: "",
        bio: "",
        contact: "",
        city: "",
        hasSpun: false,
        prize: null,
        profilePicUrl: "",
    });

    const [loading, setLoading] = useState(true);
    const [image, setImage] = useState(null);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            const res = await axios.get("http://localhost:3000/api/v1/user/user/profile", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });            

            console.log("User profile response:", res.data);

            if (!res.data._id) {
                console.error("User ID is missing from response:", res.data);
                return;
            }

            setUser(res.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    };

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user._id) {
            console.error("Error: User ID is missing. Cannot update profile.");
            alert("Error: User ID is missing.");
            return;
        }

        setUpdating(true);
        const formData = new FormData();
        formData.append("username", user.username);
        formData.append("email", user.email);
        formData.append("bio", user.bio);
        formData.append("contact", user.contact);
        formData.append("city", user.city);
        formData.append("hasSpun", user.hasSpun);
        formData.append("prize", JSON.stringify(user.prize));

        if (image) {
            formData.append("profilePic", image);
        }

        try {
            const res = await axios.put(`http://localhost:3000/api/v1/user/user/profile/edit/${user._id}`, formData , {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("Profile updated successfully!", res.data);
            alert("Profile updated successfully!");
            fetchUserProfile();
        } catch (error) {
            console.error("Error fetching profile:", error);
            setLoading(false);
        }
         finally {
            setUpdating(false);
        }
    };

    if (loading) return <CircularProgress className="flex mx-auto mt-10" />;

    return (
        <StyledCard className="mt-10 bg-white shadow-lg">
            <CardContent>
                <Typography variant="h5" className="text-center font-bold mb-4">User Profile</Typography>
                <div className="flex justify-center mb-4">
                    <Avatar src={user.profilePicUrl} alt="Profile" sx={{ width: 100, height: 100 }} />
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <TextField fullWidth label="Username" name="username" value={user.username} onChange={handleChange} required />
                    <TextField fullWidth label="Email" name="email" value={user.email} onChange={handleChange} required />
                    <TextField fullWidth label="Bio" name="bio" value={user.bio} onChange={handleChange} multiline rows={3} />
                    <TextField fullWidth label="Contact" name="contact" value={user.contact} onChange={handleChange} required />
                    <TextField fullWidth label="City" name="city" value={user.city} onChange={handleChange} required />
                    <input type="file" onChange={handleFileChange} className="mt-2" />
                    <Button type="submit" variant="contained" color="primary" fullWidth disabled={updating}>
                        {updating ? "Updating..." : "Update Profile"}
                    </Button>
                </form>
            </CardContent>
        </StyledCard>
    );
};

export default UserPfp;