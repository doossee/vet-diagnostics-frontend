import { Eyelid } from '@/shared/types'
import { Edit, Trash } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'

export const createEyeLidColums = (handleEditItem: (item: Eyelid) => void, handleDelete: (id: number) => void, t: any) =>  [
    { title: t("management.eyeLidName"), key: 'name' },
    { title: t("table.actions"), key: 'actions', render(item: Eyelid) {
        return (<div className="flex gap-2 items-center flex-wrap md:flex-nowrap justify-end md:justify-start">
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