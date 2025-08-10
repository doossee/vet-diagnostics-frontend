import { DungTest } from '@/shared/types'
import { SMELL_TYPES, CLARITY_TYPES, DUNG_FORMS } from '@/shared/constants'
import { Button } from '@/shared/components/ui/button'
import { Edit, Trash } from 'lucide-react'

export const createDungTestColums = (handleEditItem: (item: DungTest) => void, handleDelete: (id: number) => void, t: any, locale: "uz" | "ru") => [
    { title: t("inspections.consistency"), key: 'consistency' },
    { title: t("inspections.worms"), key: 'worms' },
    { title: t("inspections.smell"), key: 'smell', render(item: DungTest) {
        return SMELL_TYPES[item.smell][locale]
    } },
    { title: t("inspections.clarity"), key: 'clarity', render(item: DungTest) {
        return CLARITY_TYPES[item.clarity][locale]
    } },
    { title: t("form.color"), key: 'color', render(item: DungTest) {
        return item.color?.name
    } },
    { title: t("inspections.form"), key: 'form', render(item: DungTest) {
        return DUNG_FORMS[item.form]?.[locale]
    } },
    { title: t("form.animal"), key: 'animal', render(item: DungTest) {
        return item.animal?.nameOrCode
    } },
    { title: t("form.disease"), key: 'disease', render(item: DungTest) {
        return `${new Date(item.disease?.startTime!).toLocaleDateString()}-${new Date(item.disease?.endTime!).toLocaleDateString()}`
    } },
    { title: t("table.actions"), key: 'actions', render(item: DungTest) {
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