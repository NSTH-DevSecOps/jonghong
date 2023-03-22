import { Scheduler } from '@aldabil/react-scheduler';

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

export function SM1() {
  const fetchRemote = async () => {
    var events = await fetch(
      'http://localhost:8080/api/events'
    ).then((response) => response.json());
    await events.forEach((event) => (event = eventReconstruct(event)));
    return events;
  };

  const handleConfirm = async (event, action) => {
    if (action === 'create') {
      return await fetch('http://localhost:8080/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      }).then(response => response.json()).then(data => eventReconstruct(data));
    } else if (action === 'edit') {
      return await fetch('http://localhost:8080/api/events', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      }).then(response => response.json()).then(data => eventReconstruct(data));
    }
  };

  return (
    <Scheduler
      view='month'
      timeZone='Asia/Bangkok'
      month={{
        startHour: 9,
        endHour: 18,
      }}
      week={{
        startHour: 9,
        endHour: 18,
      }}
      day={{
        startHour: 9,
        endHour: 18,
      }}
      getRemoteEvents={fetchRemote}
      onConfirm={handleConfirm}
    />
  );
}

export function SM2() {
  return (
    <>
      <Scheduler
        view='month'
        timeZone='Asia/Bangkok'
        month={{
          startHour: 9,
          endHour: 18,
        }}
        week={{
          startHour: 9,
          endHour: 18,
        }}
        day={{
          startHour: 9,
          endHour: 18,
        }}
        fields={[
          {
            name: 'user_id',
            type: 'select',
            // Should provide options with type:"select"
            options: [
              { id: 1, text: 'John', value: 1 },
              { id: 2, text: 'Mark', value: 2 },
            ],
            config: {
              label: 'User',
              required: true,
              errMsg: 'Plz Select User',
            },
          },
          {
            name: 'Description',
            type: 'input',
            default: 'Default Value...',
            config: { label: 'Details', multiline: true, rows: 4 },
          },
        ]}
        events={[
          {
            event_id: 1,
            title: 'Event 1 Room 2',
            start: new Date('2023/3/3 09:00'),
            end: new Date('2023/3/4 17:00'),
          },
        ]}
      />
    </>
  );
}

export function BM1() {
  return (
    <>
      <Scheduler
        view='month'
        timeZone='Asia/Bangkok'
        month={{
          startHour: 9,
          endHour: 18,
        }}
        week={{
          startHour: 9,
          endHour: 18,
        }}
        day={{
          startHour: 9,
          endHour: 18,
        }}
        fields={[
          {
            name: 'user_id',
            type: 'select',
            // Should provide options with type:"select"
            options: [
              { id: 1, text: 'John', value: 1 },
              { id: 2, text: 'Mark', value: 2 },
            ],
            config: {
              label: 'User',
              required: true,
              errMsg: 'Plz Select User',
            },
          },
          {
            name: 'Description',
            type: 'input',
            default: 'Default Value...',
            config: { label: 'Details', multiline: true, rows: 4 },
          },
        ]}
        events={[
          {
            event_id: 1,
            title: 'Event 1 BM 1',
            start: new Date('2023/3/5 09:00'),
            end: new Date('2023/3/6 17:00'),
          },
        ]}
      />
    </>
  );
}

export function BM2() {
  return (
    <>
      <Scheduler
        view='month'
        timeZone='Asia/Bangkok'
        month={{
          startHour: 9,
          endHour: 18,
        }}
        week={{
          startHour: 9,
          endHour: 18,
        }}
        day={{
          startHour: 9,
          endHour: 18,
        }}
        fields={[
          {
            name: 'user_id',
            type: 'select',
            // Should provide options with type:"select"
            options: [
              { id: 1, text: 'John', value: 1 },
              { id: 2, text: 'Mark', value: 2 },
            ],
            config: {
              label: 'User',
              required: true,
              errMsg: 'Plz Select User',
            },
          },
          {
            name: 'Description',
            type: 'input',
            default: 'Default Value...',
            config: { label: 'Details', multiline: true, rows: 4 },
          },
        ]}
        events={[
          {
            event_id: 1,
            title: 'Event 1 BM 2',
            start: new Date('2023/3/6 09:00'),
            end: new Date('2023/3/9 17:00'),
          },
        ]}
      />
    </>
  );
}

export function TR1() {
  return (
    <>
      <Scheduler
        view='month'
        timeZone='Asia/Bangkok'
        month={{
          startHour: 9,
          endHour: 18,
        }}
        week={{
          startHour: 9,
          endHour: 18,
        }}
        day={{
          startHour: 9,
          endHour: 18,
        }}
        fields={[
          {
            name: 'user_id',
            type: 'select',
            // Should provide options with type:"select"
            options: [
              { id: 1, text: 'John', value: 1 },
              { id: 2, text: 'Mark', value: 2 },
            ],
            config: {
              label: 'User',
              required: true,
              errMsg: 'Plz Select User',
            },
          },
          {
            name: 'Description',
            type: 'input',
            default: 'Default Value...',
            config: { label: 'Details', multiline: true, rows: 4 },
          },
        ]}
        events={[
          {
            event_id: 1,
            title: 'Event 1 Training',
            start: new Date('2023/3/10 09:00'),
            end: new Date('2023/3/13 17:00'),
          },
        ]}
      />
    </>
  );
}
