import { VetStation } from '@/shared/types'
import { Button } from '@/shared/components/ui/button'

export const createVetStationColums = (handleEditItem: (item: VetStation) => void, handleDelete: (id: number) => void, t: any) =>  [
    { title: t('regions.vetStationName'), key: 'name' },
    { title: t('regions.vetStationAddress'), key: 'address' },
    { title: t('form.districtName'), key: 'district', render(item: VetStation) {
        return item?.district?.name
    } },
    { title: t('table.actions'), key: 'actions', render(item: VetStation) {
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