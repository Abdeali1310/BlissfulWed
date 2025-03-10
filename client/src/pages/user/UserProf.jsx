import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    Container, Typography, Avatar, Button, TextField, 
    Box, Divider, Paper, Snackbar, Alert 
} from '@mui/material';

const UserProf = () => {
    const [user, setUser] = useState({
        username: '',
        email: '',
        contact: '',
        bio: '',
        gender: '',
        city: '',
        profilePicUrl: '',
        events: [],
        payments: []
    });

    const [isEditing, setIsEditing] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [message, setMessage] = useState({ text: '', type: '' });

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            const { data } = await axios.get("/api/user/profile", { withCredentials: true });
            setUser(data.user);
        } catch (error) {
            console.error('Error fetching user profile:', error.response?.data || error.message);
        }
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`/api/user/profile/edit/${user._id}`, user, { withCredentials: true });
            setMessage({ text: "Profile updated successfully!", type: "success" });
            setIsEditing(false);
        } catch (error) {
            setMessage({ text: "Error updating profile!", type: "error" });
            console.error('Error updating profile:', error.response?.data || error.message);
        }
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) return;
        const formData = new FormData();
        formData.append("profilePic", selectedFile);

        try {
            const { data } = await axios.put(`/api/user/profile/upload/${user._id}`, formData, {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" }
            });
            setUser({ ...user, profilePicUrl: data.profilePicUrl });
            setMessage({ text: "Profile picture updated!", type: "success" });
        } catch (error) {
            setMessage({ text: "Failed to upload image!", type: "error" });
        }
    };

    return (
        <Container component={Paper} sx={{ p: 4, mt: 4, maxWidth: 600 }}>
            <Typography variant="h4" gutterBottom>User Profile</Typography>

            <Box display="flex" flexDirection="column" alignItems="center">
                <Avatar src={user.profilePicUrl} sx={{ width: 80, height: 80, mb: 2 }} />
                <input type="file" accept="image/*" onChange={handleFileChange} style={{ marginBottom: 10 }} />
                <Button variant="outlined" size="small" onClick={handleUpload}>Upload Picture</Button>
            </Box>

            <TextField fullWidth margin="normal" label="Username" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} disabled={!isEditing} />
            <TextField fullWidth margin="normal" label="Email" value={user.email} disabled />
            <TextField fullWidth margin="normal" label="Phone" value={user.contact} disabled />
            <TextField fullWidth margin="normal" label="Bio" multiline rows={2} value={user.bio} onChange={(e) => setUser({ ...user, bio: e.target.value })} disabled={!isEditing} />
            <TextField fullWidth margin="normal" label="Gender" value={user.gender} onChange={(e) => setUser({ ...user, gender: e.target.value })} disabled={!isEditing} />
            <TextField fullWidth margin="normal" label="City" value={user.city} onChange={(e) => setUser({ ...user, city: e.target.value })} disabled={!isEditing} />

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6">Event History</Typography>
            {user.events.length > 0 ? user.events.map((event, index) => (
                <Typography key={index}>{event.name} - {event.status}</Typography>
            )) : <Typography>No event history found.</Typography>}

            <Divider sx={{ my: 2 }} />
            <Typography variant="h6">Payment History</Typography>
            {user.payments.length > 0 ? user.payments.map((payment, index) => (
                <Typography key={index}>₹{payment.amount} - {payment.status}</Typography>
            )) : <Typography>No payment history found.</Typography>}

            <Divider sx={{ my: 2 }} />
            {isEditing ? (
                <Button variant="contained" color="primary" onClick={handleUpdate}>Save</Button>
            ) : (
                <Button variant="outlined" onClick={() => setIsEditing(true)}>Edit Profile</Button>
            )}

            <Snackbar open={!!message.text} autoHideDuration={4000} onClose={() => setMessage({ text: '', type: '' })}>
                <Alert severity={message.type}>{message.text}</Alert>
            </Snackbar>
        </Container>
    );
};

export default UserProf;