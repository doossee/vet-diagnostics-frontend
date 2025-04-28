import { Breed } from '@/shared/types'
import { Button } from '@/shared/components/ui/button'

export const createBreedColums = (handleEditItem: (item: Breed) => void, handleDelete: (id: number) => void, t: any) =>  [
    { title: t('management.breedName'), key: 'name'},
    { title: t('table.actions'), key: 'actions', render(item: Breed) {
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