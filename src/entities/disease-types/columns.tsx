import { Edit, Trash } from 'lucide-react'
import { DiseaseType } from '@/shared/types'
import { Button } from '@/shared/components/ui/button'

export const createDiseaseTypeColums = (handleEditItem: (item: DiseaseType) => void, handleDelete: (id: number) => void, t: any) =>  [
    { title: t("management.typeName"), key: 'name', sorting: 'name' },
    { title: t("table.actions"), key: 'actions', render(item: DiseaseType) {
        return (<div className="flex gap-2 items-start! flex-wrap md:flex-nowrap justify-end md:justify-start">
            <Button onClick={() => handleEditItem(item)} size='sm' className='text-xs!'>
                <Edit />
                {t("table.edit")}
            </Button>
            <Button onClick={() => handleDelete(item.id)} size='sm' className='text-xs!' variant={'destructive'}>
                <Trash />
                {t("table.delete")}
            </Button>
        </div>)
    } },
]