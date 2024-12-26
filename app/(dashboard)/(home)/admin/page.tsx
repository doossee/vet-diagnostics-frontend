import { FARMER_DATA_CARDS } from '~/constants'
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export default function AdminPage() {
    return (
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
            Admin Dashboard
            {/* { FARMER_DATA_CARDS.map((data, i) => (
                <Card key={i} className="rounded-md shadow-none p-0">
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium'>
                            {data.title}
                        </CardTitle>
                        <data.icon /> 
                    </CardHeader>
                    <CardContent>
                        <div className='text-2xl font-bold'>$ {data.value}</div>
                        <p className='text-xs text-muted-foreground'>
                            {data.description}
                        </p>
                    </CardContent>
                </Card>
            )) } */}
        </div>
    )
}