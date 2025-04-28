import { Region } from '@/shared/types'
import { Button } from '@/shared/components/ui/button'

export const createRegionColums = (handleEditItem: (item: Region) => void, handleDelete: (id: number) => void, t: any) =>  [
    { title: t("form.regionName"), key: 'name' },
    { title: t("regions.countOfDistricts"), key: 'districs', render(item: Region) {
        return item.districts?.length || 0
    } },
    { title: t('table.actions'), key: 'actions', hideTitleInMobile: true, render(item: Region) {
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