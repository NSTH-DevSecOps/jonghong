import { Scheduler } from '@aldabil/react-scheduler';

export function SM1() {
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
            title: 'Event 1 Room 1',
            start: new Date('2023/3/1 09:00'),
            end: new Date('2023/3/2 17:00'),
          },
        ]}
      />
    </>
  );
};

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
};

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
};

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
};

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
