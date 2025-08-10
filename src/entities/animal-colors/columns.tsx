import { Color } from '@/shared/types'
import { Button } from '@/shared/components/ui/button'
import { Edit, Trash } from 'lucide-react'

export const createAnimalColorColums = (handleEditItem: (item: Color) => void, handleDelete: (id: number) => void, t: any) =>  [
    { title: t('management.colorName'), key: 'name'},
    { title: t('management.colorPick'), key: 'hex' },
    { title: t('table.actions'), key: 'actions', render(item: Color) {
        return (<div className="flex gap-2 items-center flex-wrap md:flex-nowrap justify-end md:justify-start">
            <Button onClick={() => handleEditItem(item)} size='sm' className='text-xs!'>
                <Edit />
                {t('table.edit')}
            </Button>
            <Button onClick={() => handleDelete(item.id)} size='sm' className='text-xs!' variant={'destructive'}>
                <Trash />
                {t('table.delete')}
            </Button>
        </div>)
    } },
]