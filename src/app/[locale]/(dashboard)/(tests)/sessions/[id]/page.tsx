import { SessionDashboard } from "@/widgets/sessions/session-dashboard";

export default async function Session({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return <SessionDashboard id={id} />;
}
