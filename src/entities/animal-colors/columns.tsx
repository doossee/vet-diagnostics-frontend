import { Color } from '@/shared/types'
import { Button } from '@/shared/components/ui/button'

export const createAnimalColorColums = (handleEditItem: (item: Color) => void, handleDelete: (id: number) => void, t: any) =>  [
    { title: t('management.colorName'), key: 'name'},
    { title: t('management.colorPick'), key: 'hex' },
    { title: t('table.actions'), key: 'actions', render(item: Color) {
        return (<div className="flex gap-2 items-center">
            <Button onClick={() => handleEditItem(item)} size='sm'>
                {t('table.edit')}
            </Button>
            <Button onClick={() => handleDelete(item.id)} size='sm'>
                {t('table.delete')}
            </Button>
        </div>)
    } },
]