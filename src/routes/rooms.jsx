import { Scheduler } from "@aldabil/react-scheduler";

import CScheduler from "../components/scheduler";

export function SM1() {
  return (
    <>
      <CScheduler admin_id={1} />
    </>
  )
}

export function SM2() {
  return (
    <>
      <CScheduler admin_id={2} />
    </>
  );
}

export function BM1() {
  return (
    <>
      <CScheduler admin_id={3} />
    </>
  );
}

export function BM2() {
  return (
    <>
      <CScheduler admin_id={4} />
    </>
  );
}

export function TR1() {
  return (
    <>
      <CScheduler admin_id={5} />
    </>
  );
}
