import { GENERAL_BLOOD } from '@/shared/types'
import { GeneralBloodTest } from '@/shared/types'
import { Button } from '@/shared/components/ui/button'
import { GENERAL_BLOOD_TESTS } from '@/shared/constants'

export const createGeneralBloodTestColums = (handleEditItem: (item: GeneralBloodTest) => void, handleDelete: (id: number) => void, t: any, locale: "uz" | "ru") => [
    { title: t("form.date"), key: 'date', render(item: GeneralBloodTest) {
        return new Date(item.date).toLocaleDateString()
    } },
    ...Object.keys(GENERAL_BLOOD_TESTS).map(key => ({
        key,
        title: GENERAL_BLOOD_TESTS[key as GENERAL_BLOOD][locale],
        render: (item: GeneralBloodTest) => {
            return item[key as GENERAL_BLOOD] + " " + GENERAL_BLOOD_TESTS[key as GENERAL_BLOOD][`unit_${locale}`]
        }
    })),
    { title: t("inspections.conclusion"), key: 'conclusion' },
    { title: t("form.animal"), key: 'animal', render(item: GeneralBloodTest) {
        return item.animal?.nameOrCode
    } },
    { title: t("table.actions"), key: 'actions', render(item: GeneralBloodTest) {
        return (<div className="flex gap-2 items-center">
            <Button onClick={() => handleEditItem(item)} size='sm'>
                {t("table.edit")}
            </Button>
            <Button onClick={() => handleDelete(item.id)} size='sm' variant={'destructive'}>
                {t("table.delete")}
            </Button>
        </div>)
    } },
]