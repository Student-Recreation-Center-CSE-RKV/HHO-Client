import { Link } from 'react-router-dom';

function EventDetail() {
  const events = ['chaitra2k24', 'pramidha2k24', 'anotherEvent'];

  return (
    <div>
      <h1>Events</h1>
      <ul>
        {events.map(event => (
          <li key={event}>
            <Link to={`/events/${event}`}>{event}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventDetail;
