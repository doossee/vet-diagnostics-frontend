import { AnimalType } from '@/shared/types'
import { Button } from '@/shared/components/ui/button'

export const createAnimalTypeColums = (handleEditItem: (item: AnimalType) => void, handleDelete: (id: number) => void, t: any) => [
    { title: t('animalTypes.name'), key: 'name' },
    { title: t('table.actions'), key: 'actions', render(item: AnimalType) {
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