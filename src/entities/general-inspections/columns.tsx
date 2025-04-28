import { GeneralInspection } from '@/shared/types'
import { Button } from '@/shared/components/ui/button'
import { OBESITY_TYPES, POSITIONS, BODY_TYPES, CUSTOMER_TYPES, BODY_STRUCTURES } from '@/shared/constants'

export const createGeneralInspectionColums = (handleEditItem: (item: GeneralInspection) => void, handleDelete: (id: number) => void, t: any, locale: "uz" | "ru") => [
    { title: t("inspections.obesity"), key: 'obesity', render(item: GeneralInspection) {
        return OBESITY_TYPES[item.obesity][locale]
    } },
    { title: t("inspections.bodyType"), key: 'bodyType', render(item: GeneralInspection) {
        return BODY_TYPES[item.bodyType][locale]
    } },
    { title: t("inspections.bodyStructure"), key: 'bodyStructure', render(item: GeneralInspection) {
        return BODY_STRUCTURES[item.bodyStructure][locale]
    } },
    { title: t("inspections.bodyPosition"), key: 'bodyPosition', render(item: GeneralInspection) {
        return POSITIONS[item.bodyPosition][locale]
    } },
    { title: t("inspections.customerType"), key: 'customerType', render(item: GeneralInspection) {
        return CUSTOMER_TYPES[item.character][locale]
    } },
    { title: t("form.color"), key: 'color', render(item: GeneralInspection) {
        return item.color?.name
    } },
    { title: t("form.animal"), key: 'animal', render(item: GeneralInspection) {
        return item.animal.nameOrCode
    } },
    {  title: t("table.actions"), key: 'actions', render(item: GeneralInspection) {
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