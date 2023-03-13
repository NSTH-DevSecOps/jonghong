import { Scheduler } from "@aldabil/react-scheduler";

export default function Room1() {
    
    return (
        <Scheduler
        view="month"
        timeZone="Asia/Bangkok"
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
          name: "user_id",
          type: "select",
          // Should provide options with type:"select"
          options: [
            { id: 1, text: "John", value: 1 },
            { id: 2, text: "Mark", value: 2 }
          ],
          config: { label: "User", required: true, errMsg: "Plz Select User" }
        },
        {
          name: "Description",
          type: "input",
          default: "Default Value...",
          config: { label: "Details", multiline: true, rows: 4 }
        }
      ]}
        events={[
          {
            event_id: 1,
            title: "Event 1",
            start: new Date("2023/3/1 09:00"),
            end: new Date("2023/3/2 17:00"),
          },
        ]}
      />
    );
  }
