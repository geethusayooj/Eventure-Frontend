import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../../config/api";
import axios from "axios";
import "./EventDetailPage.css";
import { Link } from "react-router-dom";
function EventDetailPage() {
  const { eventId } = useParams();
  const [event, setEvent] = useState({});
  const navigate = useNavigate();

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
      .catch((error) => console.log("Error deleting product...", error));
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
        <p><strong>Category:</strong> {event.category}</p>
        <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
        <p><strong>Location:</strong> {event.location}</p>
        <p><strong>Price:</strong> ${event.price}</p>
        <p><strong>Available Tickets:</strong> {event.availableTickets}</p>
        <div className="buttonDetailpage">
          <Link to="/home">
            <button className="detailpageButton">Back </button>
          </Link>
          <Link className="detailpageButton" to={`/events/${eventId}`}>
            <button>Edit</button>
          </Link>

          <button className="detailpageButton" onClick={deleteEvent}>
            Delete
          </button>
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