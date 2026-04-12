import { PredictionDashboard } from "@/widgets/sessions/prediction-dashboard";

export default async function PredictionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <PredictionDashboard id={id} />
  );
}
