import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom"; // Use useParams to get event ID from URL
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import image1 from "@/assets/Chairs.jpg"; // Default image

const EventDetailPage = () => {
  const { eventId } = useParams(); // Get eventId from URL params
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const history = useHistory(); // For navigation

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`/api/v1/events/get-event/${eventId}`);
        // setEvent(response.data.getEvents);
        setLoading(false);
      } catch (err) {
        setError("Failed to load event details.");
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  if (loading) {
    return <p>Loading event details...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Button onClick={() => history.push("/")}>Back to Events</Button>
      <Card className="mt-8">
        <CardHeader>
          <div className="w-full h-48 bg-gray-200 rounded-lg overflow-hidden">
            <img
              src={event.eventPic || image1}
              alt={event.name}
              className="w-full h-full object-cover"
            />
          </div>
          <CardTitle className="mt-4 text-3xl">{event.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted">{event.date} | {event.time}</p>
          <p className="text-sm mt-1">Venue: {event.venue}</p>
          <p className="text-sm mt-4">{event.description}</p>
          <Button size="sm" className="bg-primary text-primary-foreground mt-4 rounded-full">
            Join Now
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventDetailPage;
