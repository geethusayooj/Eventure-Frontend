import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../../config/api";
import axios from "axios";
import "./EventDetailPage.css";
import { Link } from "react-router-dom";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { AuthContext } from "../../context/AuthContext";
function EventDetailPage() {
  const { eventId } = useParams();
  const [event, setEvent] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const { token, user } = useContext(AuthContext)

  const getEvent = () => {
    axios
      .get(`${API_URL}/api/api/events/${eventId}`)
      .then((response) => {
        console.log(response.data);
        setEvent(response.data);
      })
      .catch((error) => {
        console.log("Error getting event details from the API...", error);
        setEvent({});
      });
  };
  // delete a event
  const deleteEvent = () => {
    axios
      .delete(`${API_URL}/api/api/events/${eventId}`)
      .then((response) => {
        console.log("Event deleted successfully:", response.data);
        navigate("/home");
      })
      .catch((error) => console.log("Error deleting event...", error));
  };

  // book tickets

  const bookTickets = () => {
    if (quantity <= 0 || quantity > event.availableTickets) {
      alert(
        "Please enter a valid quantity. Tickets available: " +
          event.availableTickets
      );
      return;
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    axios
      .post(
        `${API_URL}/api/api/bookings`,
        {
          userId: user._id,
          eventId: event._id,
          quantity,
        },
        { headers }
      )
      .then((response) => {
        alert("Booking successful!");
        setQuantity(1);
        setTotalPrice(event.price);
      // Reduce available tickets locally
      getEvent();
    })
    .catch((error) => {
      console.error("Error booking tickets:", error);
      alert(error.response?.data?.error || "Booking failed.");
    });
};
  // Update totalPrice whenever quantity changes
  const handleQuantityChange = (e) => {
    const newQuantity = Number(e.target.value);
    setQuantity(newQuantity);
    setTotalPrice(newQuantity * event.price);
  };
  useEffect(() => {
    getEvent();
  }, [eventId]);
  return (
    <div className="eventDetailPage">
      {event && Object.keys(event).length > 0 ? (
        <>
          <img className="imageofevent" src={event.image} alt={event.title} />
          <div className="eventdetails">
            <h1>{event.title}</h1>
            <p>{event.description}</p>
            <p>
              <strong>Category:</strong> {event.category}
            </p>
            <p>
              <strong>Date:</strong> {new Date(event.date).toLocaleString()}
            </p>
            <p>
              <strong>Location:</strong> {event.location}
            </p>
            <p>
              <strong>Price:</strong> ${event.price}
            </p>
            <p>
              <strong>Available Tickets:</strong> {event.availableTickets}
            </p>

            <div className="bookingBox">
  <h2>Don’t Miss Out! Book Now</h2>
  <div className="bookNowFields">
    <TextField
      type="number"
      label="Quantity"
      value={quantity}
      onChange={handleQuantityChange}
      inputProps={{
        min: 1,
        max: event.availableTickets,
        style: { textAlign: "center" },
      }}
      style={{
        marginRight: "1rem",
        width: "70px",
        height: "40px",
      }}
    />
    <div className="totalPrice">
      <strong>Total Price: </strong> ${totalPrice.toFixed(2)}
    </div>
    <Button
      variant="contained"
      color="primary"
      onClick={bookTickets}
      disabled={
        event.availableTickets === 0 ||
        quantity <= 0 ||
        quantity > event.availableTickets
      }
    >
      Book Now
    </Button>
  </div>
</div>


            <div className="buttonDetailpage">
              <ButtonGroup variant="outlined" aria-label="Basic button group">
                <Link to="/home">
                  <Button className="detailpageButton">Back </Button>
                </Link>
                <Link to={`/events/${eventId}/edit`}>
                  <Button className="detailpageButton">Edit</Button>
                </Link>

                <Button className="detailpageButton" onClick={deleteEvent}>
                  Delete
                </Button>
              </ButtonGroup>
            </div>
          </div>
        </>
      ) : (
        <p>Loading event details...</p>
      )}
    </div>
  );
}
export default EventDetailPage;
