import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditEventPage.css";
import { API_URL } from "../../config/api";
import { AuthContext } from "../../context/AuthContext";

function EditEventPage() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [date, setDate] = useState("");
  const [availableTickets, setAvailableTickets] = useState("");
  const { token } = useContext(AuthContext);
  const { eventId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setError("You need to be logged in to edit this event.");
      setTimeout(() => navigate("/"), 3000);
      return;
    }

    axios
      .get(`${API_URL}/api/api/events/${eventId}`)
      .then((response) => {
        setTitle(response.data.title);
        setPrice(response.data.price);
        setDescription(response.data.description);
        setCategory(response.data.category);
        setImage(response.data.image);
        setLocation(response.data.location);
        setDate(response.data.date);
        setAvailableTickets(response.data.availableTickets);
      })
      .catch((error) =>
        console.log("Error getting edit details from the API...", error)
      );
  }, [eventId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!token) {
      setError("You need to be logged in to edit this event.");
      return;
    }
    const newDetails = {
      title: title,
      price: price,
      description: description,
      category: category,
      image: image,
      location: location,
      date: date,
      availableTickets: availableTickets,
    };

    axios
      .put(`${API_URL}/api/api/events/${eventId}`, newDetails, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      .then((response) => {
        navigate(-1);
      })
      .catch((e) => console.log("Error editing events...", e));
  };

  return (
    <div className="EditEventPage">
      <h3>Edit Event Details here..</h3>

      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label>Title Event:</label>
          <input
            type="text"
            name="title"
            placeholder="Enter the title of event"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            name="price"
            placeholder="Enter the price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            placeholder="Enter the description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Category:</label>
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select a category</option>
            <option value="Music">Music</option>
            <option value="Job">Job</option>
            <option value="Sports">Sports</option>
            <option value="Food">Food</option>
          </select>
        </div>

        <div className="form-group">
          <label>Image URL:</label>
          <input
            type="url"
            name="image"
            placeholder="https://i.imgur.com/eTmWoAN.png"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>

        <div class="form-group">
          <label>Location:</label>
          <input
            type="string"
            name="location"
            placeholder="Enter the location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div class="form-group">
          <label>Available Tickets:</label>
          <input
            type="number"
            name="availableTickets"
            placeholder="Enter available tickets"
            value={availableTickets}
            onChange={(e) => setAvailableTickets(e.target.value)}
          />
        </div>

        <button className="editbutton" type="submit">
          Edit
        </button>
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
}

export default EditEventPage;
