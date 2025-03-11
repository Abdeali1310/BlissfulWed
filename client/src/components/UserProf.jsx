import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProf = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    profilePicture: '',
    bio: '',
    gender: '',
    bookings: [],
    payments: [],
  });

  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);

  // ✅ Fetch User Data
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/v1/user/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // ✅ Handle File Upload
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // ✅ Handle Form Submit (Update Profile)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', user.name);
    formData.append('bio', user.bio);
    formData.append('gender', user.gender);
    if (selectedFile) {
      formData.append('profilePicture', selectedFile);
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('/api/v1/user/profile', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setUser(response.data);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  // ✅ Handle Account Deletion
  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete('/api/v1/user/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('Account deleted successfully');
        window.location.href = '/login'; // Redirect to login
      } catch (error) {
        console.error('Error deleting account:', error);
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <form onSubmit={handleSubmit}>
        {/* ✅ Profile Picture */}
        <div>
          <label>Profile Picture:</label>
          <input type="file" onChange={handleFileChange} />
          {user.profilePicture && (
            <img
              src={`http://localhost:3000/${user.profilePicture}`}
              alt="Profile"
              style={{ width: '100px', height: '100px', borderRadius: '50%' }}
            />
          )}
        </div>

        {/* ✅ Name */}
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            required
          />
        </div>

        {/* ✅ Email */}
        <div>
          <label>Email:</label>
          <input type="email" value={user.email} disabled />
        </div>

        {/* ✅ Phone Number */}
        <div>
          <label>Phone Number:</label>
          <input type="text" value={user.phoneNumber} disabled />
        </div>

        {/* ✅ Bio */}
        <div>
          <label>Bio:</label>
          <textarea
            value={user.bio}
            onChange={(e) => setUser({ ...user, bio: e.target.value })}
          />
        </div>

        {/* ✅ Gender */}
        <div>
          <label>Gender:</label>
          <select
            value={user.gender}
            onChange={(e) => setUser({ ...user, gender: e.target.value })}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* ✅ Submit Button */}
        <button type="submit">Update Profile</button>
      </form>

      {/* ✅ Booking History */}
      <h3>Wedding Details</h3>
      <ul>
        {user.bookings.map((booking, index) => (
          <li key={index}>
            {booking.serviceName} - {new Date(booking.date).toLocaleDateString()} -{' '}
            <strong>{booking.status}</strong>
          </li>
        ))}
      </ul>

      {/* ✅ Payment History */}
      <h3>Payment History</h3>
      <ul>
        {user.payments.map((payment, index) => (
          <li key={index}>
            ₹{payment.amount} - {new Date(payment.date).toLocaleDateString()} -{' '}
            <strong>{payment.status}</strong>
          </li>
        ))}
      </ul>

      {/* ✅ Delete Account */}
      <button onClick={handleDeleteAccount} className="delete-btn">
        Delete Account
      </button>
    </div>
  );
};

export default UserProf;
