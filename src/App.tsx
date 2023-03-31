import React from "react";
import { Fragment, useRef } from "react";

import { Button } from "@mui/material";

import Scheduler from "@aldabil/react-scheduler";
import {
  EventActions,
  ProcessedEvent,
  ViewEvent,
  SchedulerRef,
} from "@aldabil/react-scheduler/types";

import { ROOMS } from "./rooms";

const proto = "http";
const BaseURL = "127.0.0.1:8080";
const API = `${proto}://${BaseURL}`;

/**
 * Reconstruct event object as date object stores as text in database
 * @param {JSON} event Event object created from '@aldabil/react-scheduler'
 * @returns event
 */
async function eventReconstruct(event) {
  event.start = new Date(event.start);
  event.end = new Date(event.end);
  return await event;
}

export default function App() {
  const calendarRef = useRef<SchedulerRef>(null);

  const fetchRemoteEvents = async () => {
    var events = await fetch(`${API}/api/events`).then((response) =>
      response.json()
    );
    await events.forEach((event) => (event = eventReconstruct(event)));
    return events;
  };

  const handleConfirm = async (event, action) => {
    if (action === "create") {
      return await fetch(`${API}/api/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      })
        .then((response) => response.json())
        .then((data) => eventReconstruct(data));
    } else if (action === "edit") {
      return await fetch(`${API}/api/events`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      })
        .then((response) => response.json())
        .then((data) => eventReconstruct(data));
    }
  };

  const handleDelete = async (event_id) => {
    return await fetch(`${API}/api/events/${event_id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => data.event_id);
  };

  return (
    <Fragment>
      <div>
        <span> Resource View Mode: </span>
        <Button
          size='small'
          onClick={() =>
            calendarRef.current?.scheduler?.handleState(
              "default",
              "resourceViewMode"
            )
          }
        >
          Default
        </Button>
        <Button
          size='small'
          onClick={() =>
            calendarRef.current?.scheduler?.handleState(
              "tabs",
              "resourceViewMode"
            )
          }
        >
          Tabs
        </Button>
      </div>
      <Scheduler
        ref={calendarRef}
        view='month'
        timeZone='Asia/Bangkok'
        month={{
          weekStartOn: 6,
          weekDays: [2, 3, 4, 5, 6],
          startHour: 9,
          endHour: 18,
        }}
        week={{
          weekStartOn: 6,
          step: 60,
          weekDays: [2, 3, 4, 5, 6],
          startHour: 9,
          endHour: 18,
        }}
        day={{
          step: 60,
          startHour: 9,
          endHour: 18,
        }}
        getRemoteEvents={fetchRemoteEvents}
        onConfirm={handleConfirm}
        onDelete={handleDelete}
        resources={ROOMS}
        resourceFields={{
          idField: "admin_id",
          textField: "title",
        }}
        fields={[
          {
            name: "admin_id",
            type: "select",
            default: ROOMS[0].admin_id,
            options: ROOMS.map((res) => {
              return {
                id: res.admin_id,
                text: `${res.title}`,
                value: res.admin_id,
              };
            }),
            config: { label: "Room", required: true },
          },
        ]}
      />
    </Fragment>
  );
}
