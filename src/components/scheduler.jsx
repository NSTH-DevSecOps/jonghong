import { Scheduler } from "@aldabil/react-scheduler";

import { Typography } from "@mui/material";

/**
 * Reconstruct event object as date object stores as text in database
 * @param {JSON} event Event object created from '@aldabil/react-scheduler'
 * @returns event
 */
function eventReconstruct(event) {
  event.start = new Date(event.start);
  event.end = new Date(event.end);
  return event;
}

/**
 * Wrapper for '@aldabil/react-scheduler' to re-use customization
 * @param {Integer} admin_id Number of room ID
 * @returns JSX.Element
 */
export default function CScheduler(admin_id) {
  const proto = "http";
  const BaseURL = "127.0.0.1:8080";
  const API = `${proto}://${BaseURL}`;

  const fetchRemote = async () => {
    var events = await fetch(`${API}/api/rooms/${admin_id.admin_id}/events`).then(response =>
      response.json()
    );
    await events.forEach(event => (event = eventReconstruct(event)));
    return events;
  };

  const handleConfirm = async (event, action) => {
    event.admin_id = admin_id.admin_id;
    if (action === "create") {
      return await fetch(`${API}/api/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      })
        .then(response => response.json())
        .then(data => eventReconstruct(data));
    } else if (action === "edit") {
      return await fetch(`${API}/api/events`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      })
        .then(response => response.json())
        .then(data => eventReconstruct(data));
    }
  };

  const handleDelete = async event_id => {
    return await fetch(`${API}/api/events/${event_id}`, {
      method: "DELETE",
    })
      .then(response => response.json())
      .then(data => data.event_id);
  };

  return (
    <Scheduler
      view='month'
      timeZone='Asia/Bangkok'
      month={{
        weekDays: [2, 3, 4, 5, 6],
        startHour: 9,
        endHour: 18,
      }}
      week={{
        weekDays: [2, 3, 4, 5, 6],
        startHour: 9,
        endHour: 18,
      }}
      day={{
        startHour: 9,
        endHour: 18,
      }}
      fields={[
        {
          name: "admin_id",
          type: "select",
          default: admin_id.admin_id,
          options: [{ id: admin_id.admin_id, text: String(admin_id.admin_id), value: admin_id.admin_id }],
          config: { label: "Room", required: true },
        },
      ]}
      getRemoteEvents={fetchRemote}
      onConfirm={handleConfirm}
      onDelete={handleDelete}
    />
  );
}
