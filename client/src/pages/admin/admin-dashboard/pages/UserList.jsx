/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Button,
  TextField,
  Select,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import axios from "axios";

const UserList = ({ onUserSelect }) => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({ gender: "", city: "" });
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/user");
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/user/${selectedUserId}`);
      setUsers(users.filter((user) => user._id !== selectedUserId));
      setOpenDialog(false);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleOpenDialog = (id) => {
    setSelectedUserId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUserId(null);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(search.toLowerCase()) &&
      (filter.gender ? user.gender === filter.gender : true) &&
      (filter.city ? user.city === filter.city : true)
  );

  return (
    <div className="mt-8">
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <TextField
          label="Search by Username"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select
          value={filter.gender}
          onChange={(e) => setFilter({ ...filter, gender: e.target.value })}
          displayEmpty
        >
          <MenuItem value="">All Genders</MenuItem>
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
        </Select>
        <Select
          value={filter.city}
          onChange={(e) => setFilter({ ...filter, city: e.target.value })}
          displayEmpty
        >
          <MenuItem value="">All Cities</MenuItem>
          <MenuItem value="ahmedabad">Ahmedabad</MenuItem>
          <MenuItem value="surat">Surat</MenuItem>
          <MenuItem value="mumbai">Mumbai</MenuItem>
          <MenuItem value="vadodra">Vadodra</MenuItem>
          <MenuItem value="delhi">Delhi</MenuItem>
        </Select>
      </div>

      <TableContainer
        component={Paper}
        sx={{
          maxWidth: { xs: "100%", sm: "100%", md: "75%", lg:"80%" },
          overflowX: "auto",
          whiteSpace: "nowrap",
        }}
      >
        <Table stickyHeader sx={{ maxWidth: "100%" }}>
          <TableHead>
            <TableRow>
              <TableCell>👤</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user._id}>
                <TableCell>
                  <Avatar src={user.profilePicUrl} />
                </TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.contact}</TableCell>
                <TableCell>{user.gender}</TableCell>
                <TableCell>{user.city}</TableCell>
                <TableCell>
                  <Button onClick={() => onUserSelect(user._id)}>View</Button>
                  <Button
                    onClick={() => handleOpenDialog(user._id)}
                    color="error"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserList;
