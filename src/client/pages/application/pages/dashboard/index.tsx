import { Page } from "@/client/components";

export default function ApplicationDashboard() {
  return (
    <Page title="Dashboard">
      {Array.from({ length: 200 }, (v, k) => k).map((item) => (
        <p key={item}>coe</p>
      ))}
    </Page>
  );
}
