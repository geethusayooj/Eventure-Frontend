import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { CircularProgress, Box, Button } from "@mui/material";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import "./BookedInfoPage.css";

const BookedInfoPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    setLoading(true);
    if (token) {
      axios
        .get("/api/api/bookings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setBookings(response.data);
        })
        .catch((error) => {
          console.error("Error fetching bookings:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      console.log("No token available, user might not be logged in.");
      setLoading(false);
    }
  }, [token]);
  // Delete booking function
  const deleteBooking = (bookingId) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      axios
        .delete(`/api/api/bookings/${bookingId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          setBookings(bookings.filter((booking) => booking._id !== bookingId));
          alert("Booking deleted successfully!");
        })
        .catch((error) => {
          console.error("Error deleting booking:", error);
          alert("Failed to delete booking.");
        });
    }
  };
  return (
    <Box sx={{ padding: 2 }}>
      <h3>Event Reservations..</h3>
      {loading ? (
        <CircularProgress />
      ) : bookings.length > 0 ? (
        <ul>
          {bookings.map((booking, index) => (
            <li key={index}>
              <div className="booking-details">
                <strong>User:</strong>{" "}
                {booking.userId ? booking.userId.name : "N/A"}
              </div>
              <div className="booking-details">
                <strong>Email:</strong>{" "}
                {booking.userId ? booking.userId.email : "N/A"}
              </div>
              <div className="booking-details">
                <strong>Event:</strong>{" "}
                {booking.eventId ? booking.eventId.title : "Event Not Found"}
              </div>
              <div className="booking-details">
                <strong>Location:</strong>{" "}
                {booking.eventId ? booking.eventId.location : "N/A"}
              </div>
              <div className="booking-details">
                <strong>Quantity:</strong> {booking.quantity}
              </div>
              <div className="total-price">
                <strong>Total Price:</strong> ${booking.totalPrice}
              </div>
              <div className="date">
                <strong>Booking Date:</strong>{" "}
                {new Date(booking.bookingDate).toLocaleString()}
              </div>

              <Button
                variant="outlined"
                color="error"
                onClick={() => deleteBooking(booking._id)}
                sx={{ marginTop: 2 }}
              >
                Cancel Booking
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings found.</p>
      )}

      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}>
        <Link to="/home">
          <Button variant="outlined" color="primary">
            Back
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default BookedInfoPage;
