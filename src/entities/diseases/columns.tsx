import { Disease } from '@/shared/types'
import { Button } from '@/shared/components/ui/button'

export const createDiseaseColums = (handleEditItem: (item: Disease) => void, handleDelete: (id: number) => void, handleSetDisease: (id: number, animalId: number) => void, t: any) => [
    { title: t("form.startDate"), key: 'startTime', render(item: Disease) {
        return new Date(item.startTime).toLocaleDateString()
    } },
    { title: t("form.endDate"), key: 'endTime', render(item: Disease) {
        return new Date(item.endTime).toLocaleDateString()
    } },
    { title: t("inspections.conclusion"), key: 'conclusion' },
    { title: t("form.animal"), key: 'animal', render(item: Disease) {
        return item.animal?.nameOrCode
    } },
    { title: t("form.diseaseType"), key: 'type', render(item: Disease) {
        return item.type?.name
    } },
    { title: t("table.actions"), key: 'actions', render(item: Disease) {
        return (<div className="flex gap-2 items-center">
            <Button onClick={() => handleSetDisease(item.id, item.animalId)} size='sm'>
                {t("inspections.createInspection")}
            </Button>
            <Button onClick={() => handleEditItem(item)} size='sm'>
                {t("table.edit")}
            </Button>
            <Button onClick={() => handleDelete(item.id)} size='sm'>
                {t("table.delete")}
            </Button>
        </div>)
    } },
]