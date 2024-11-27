import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import EventDetailPage from "../EventDetailPage/EventDetailPage";
import { API_URL } from "../../config/api";
import "./CreateEventPage.css";
import { AuthContext } from "../../context/AuthContext";

function CreateEventPage(props) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [availableTickets, setAvailableTickets] = useState("");

  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const handleSubmit = (e) => {
    e.preventDefault();

    const newEvent = {
      title: title,
      price: price,
      description: description,
      category: category,
      image: image,
      date: date,
      location: location,
      availableTickets: availableTickets,
    };

    axios
      .post(`${API_URL}/api/api/events`, newEvent, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      .then((response) => {
        props.callbackToCreate(EventDetailPage);

        navigate("/home");

        setTitle("");
        setPrice("");
        setDescription("");
        setCategory("");
        setImage("");
        setDate("");
        setLocation("");
        setAvailableTickets("");
      })
      .catch((e) => console.log("Error creating a new Event...", e));
  };
  return (
    <div className="container">
      <h3>Add Event here..</h3> <br></br>
      <form className="event-form" onSubmit={handleSubmit}>
        <div class="form-group">
          <label>Title of Event:</label>
          <input
            type="text"
            name="title"
            placeholder="Enter the title of event"
            required
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div class="form-group">
          <label>Price:</label>
          <input
            type="number"
            name="price"
            placeholder="Enter the price "
            required
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        </div>
        <div class="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            placeholder="Enter the description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <div class="form-group">
          <label>Category:</label>
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            <option value={"Music"}>Music</option>
            <option value={"Job"}>Job</option>
            <option value={"Food"}>Food</option>
            <option value={"Sports"}>Sports</option>
          </select>
        </div>
        <div class="form-group">
          <label>Image URL:</label>
          <input
            type="url"
            name="image"
            placeholder="https://i.imgurls.com/eTmWoAN.png"
            value={image}
            onChange={(e) => {
              setImage(e.target.value);
            }}
          />
        </div>
        <div class="form-group">
          <label>Date:</label>
          <input
            type="date"
            name="date"
            placeholder="Enter the date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
            required
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

        <button className="createbutton" type="submit">
          Create
        </button>
      </form>
    </div>
  );
}

export default CreateEventPage;
