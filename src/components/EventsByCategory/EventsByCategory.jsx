import { useEffect, useState } from "react";
import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "./EventsByCategory.css";
import axios from "axios";
import { API_URL } from "../../config/api";
import { Link } from "react-router-dom";
function EventsByCategory({ category }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/api/events/${category}`)
      .then((response) => {
       console.log("API response:", response.data);
        
        const filteredData = response.data.filter((event) => event.category === category);
        console.log(filteredData);
        setEvents(filteredData.toReversed());
      })
      .catch((e) => console.log("Error getting events from the API...", e));
    return () => {
        setEvents([]);
    };
  }, [category]);
  return (
   
    <div className="EventsByCategory card-list">
     
     {events && events.length > 0 ? (
        events.map((eventDetails) => {
          return (

            <Link className="link" to={`/event/${eventDetails.id}`} key={eventDetails.id}>
            <Card
              key={eventDetails.id}
              // sx={{ maxWidth: 300, minWidth: 300, borderRadius: 5 }}
            >
              <CardMedia
                sx={{ height: 250, backgroundSize: "contain" }}
                image={eventDetails.image}
                title={eventDetails.title}
              />
              <CardContent>
                <Typography className="cardsize" gutterBottom variant="h5" component="div">
                  {eventDetails.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {eventDetails.price}
                </Typography>
              </CardContent>
            </Card>
            </Link>
          );
        })
      ) : (
        <Typography>No events found for this category</Typography>
      )}
    </div>
  );
}

export default EventsByCategory;