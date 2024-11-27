import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import "./EventListPage.css";
import axios from "axios";
import { API_URL } from "../../config/api";
import { Link } from "react-router-dom";

function EventListPage({ searchQuery = "" }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}/api/events`)
      .then((response) => {
        const eventArray = Array.isArray(response.data)
          ? response.data
          : Object.values(response.data);
        setEvents(eventArray);
        setLoading(false);
      })
      .catch((e) => {
        console.log("Error getting events from the API...", e);
        setLoading(false);
      });
  }, []);
  return (
    <>
      <div className="EventListPage card-list">
        {!loading && events && events.length > 0 && (
          events
            .filter(
              (event) =>
                event.title &&
                event.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((eventDetails) => {
              return (
                <Link className="link" to={`/events/${eventDetails._id}`}>
                  <Card
                    key={eventDetails._id}
                    sx={{ maxWidth: 300, minWidth: 300, borderRadius: 5 }}
                  >
                    <CardMedia
                      sx={{ height: 250, backgroundSize: "contain" }}
                      image={eventDetails.image}
                      title={eventDetails.title}
                    />
                    <CardContent>
                      <Typography
                        className="cardsize"
                        gutterBottom
                        variant="h5"
                        component="div"
                      >
                        {eventDetails.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        {eventDetails.location}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              );
            })
        )}
        { !loading && events && events.length === 0 &&
           <p>No events found.</p>
        }
      </div>
    </>
  );
}

export default EventListPage;
