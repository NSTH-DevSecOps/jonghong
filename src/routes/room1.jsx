import { Scheduler } from "@aldabil/react-scheduler";

export default function Room1() {
    
    return (
        <Scheduler
        view="month"
        timeZone="Asia/Bangkok"
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
