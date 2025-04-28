import { Vaccine } from '@/shared/types'
import { Button } from '@/shared/components/ui/button'

export const createVaccineColums = (handleEditItem: (item: Vaccine) => void, handleDelete: (id: number) => void, t: any, locale: "uz" | "ru") => [
    { title: t("management.vaccineType"), key: 'type', sorting: 'byTypeId', render(item: Vaccine) {
        return item?.type?.name
    }  },
    { title: t("form.animal"), key: 'animal', sorting: 'byAnimalId', render(item: Vaccine) {
        return item?.animal?.nameOrCode
    } },
    { title: t("form.date"), key: 'date', sorting: 'byDate', render(item: Vaccine) {
        return new Date(item.date).toLocaleDateString()
    } },
    { title: t("table.actions"), key: 'actions', render(item: Vaccine) {
        return (<div className="flex gap-2 items-center">
            <Button onClick={() => handleEditItem(item)} size='sm'>
                {t("table.edit")}
            </Button>
            <Button onClick={() => handleDelete(item.id)} size='sm'>
                {t("table.delete")}
            </Button>
        </div>)
    } },
]