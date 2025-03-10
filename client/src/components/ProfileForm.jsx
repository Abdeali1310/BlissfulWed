import React from 'react';
import { TextField, Button, Box } from '@mui/material';

const ProfileForm = ({ user, setUser, handleSubmit, handleCancel }) => {
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField fullWidth label="Name" name="name" value={user.name} onChange={handleChange} required />
            <TextField fullWidth label="Bio" name="bio" value={user.bio} onChange={handleChange} multiline rows={2} />
            <TextField fullWidth label="Gender" name="gender" value={user.gender} onChange={handleChange} />
            <Box display="flex" justifyContent="space-between">
                <Button variant="contained" color="primary" type="submit">Save</Button>
                <Button variant="outlined" onClick={handleCancel}>Cancel</Button>
            </Box>
        </Box>
    );
};

export default ProfileForm;