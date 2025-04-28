import { BLOOD_SERUM_TESTS } from '@/shared/constants'
import { Button } from '@/shared/components/ui/button'
import { BloodSerumTest, BLOOD_SERUM } from '@/shared/types'

export const createBloodSerumTestColums = (handleEditItem: (item: BloodSerumTest) => void, handleDelete: (id: number) => void, t: any, locale: 'uz' | 'ru') => [
    ...Object.keys(BLOOD_SERUM_TESTS).map(key => ({
        key,
        title: BLOOD_SERUM_TESTS[key as BLOOD_SERUM][locale],
        render: (item: BloodSerumTest) => {
            return item[key as BLOOD_SERUM] + " " + BLOOD_SERUM_TESTS[key as BLOOD_SERUM][`unit_${locale}`]
        }
    })),
    { title: t('form.animal'), key: 'animal', render(item: BloodSerumTest) {
        return item.animal?.nameOrCode
    } },
    { title: t("table.actions"), key: 'actions', render(item: BloodSerumTest) {
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