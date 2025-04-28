import { AnimalDashboard } from "@/widgets"

export default async function Animals({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
        
    return (
        <AnimalDashboard id={+id}/>
    )
}