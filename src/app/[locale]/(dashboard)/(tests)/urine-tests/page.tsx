'use client'

import { useMemo } from 'react'
import { UrineTest } from '@/shared/types'
import { useI18n } from "@/shared/hooks/use-i18n"
import { useCrud } from '@/shared/hooks/use-crud'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/shared/components/ui/button'
import { DataTable } from '@/shared/components/data-table'
import { createUrineTestColums } from '@/entities/urine-tests'
import { useRouter, usePathname } from '@/shared/i18n/routing'
import { useDiseases, useUrineColors } from "@/shared/hooks/queries"
import { UrineTestForm, UrineTestSchema, urineTestValues } from '@/features/urine-tests'
import { Dialog, DialogTitle, DialogContent, DialogHeader } from "@/shared/components/ui/dialog"
import { urineTestsControllerCreate, urineTestsControllerFindAll, urineTestsControllerRemove, urineTestsControllerUpdate } from '@/shared/api'

export default function UrineTests() {
    const router = useRouter()
    const pathname = usePathname()
    const query = useSearchParams()
    const { t, locale } = useI18n()

    const newAnimal = query.get('new')
    const animalId = query.get('animalId') ? Number(query.get('animalId')) : null
    
    const { diseases } = useDiseases()
    const { urineColors } = useUrineColors()

    const { dialog, itemId, items, loading, totalItems, handleClose, handleDelete, handleEditItem, handleGetItems, onSubmit, setDialog } = useCrud<UrineTest, UrineTestSchema, UrineTestSchema>({
        dialogValue: !!newAnimal,
        findAll: urineTestsControllerFindAll,
        create: urineTestsControllerCreate,
        update: urineTestsControllerUpdate,
        remove: urineTestsControllerRemove,
        extraOnClose: () => newAnimal && router.push(pathname + ( animalId ? '?animalId='+animalId : ''))
    })

    const columns = useMemo(() => createUrineTestColums(handleEditItem, handleDelete, t, locale), [handleEditItem, handleDelete])

    return (
        <div>
            <DataTable
                loading={loading}
                columns={columns}
                items={items as any}
                totalItems={totalItems}
                callback={handleGetItems}
                topSlot={<Button onClick={() => setDialog(true)} size={'default'} className="mt-0! w-full sm:w-fit">{t("inspections.createUrineTest")}</Button>} />

            <Dialog open={dialog} onOpenChange={handleClose}>
                <DialogContent className="overflow-auto max-h-screen md:max-h-[95vh] max-w-[500px]" aria-describedby={undefined}>
                    <DialogHeader>
                        <DialogTitle>{t(itemId?"inspections.editUrineTest":"inspections.createUrineTest")}</DialogTitle>
                    </DialogHeader>
                    
                    <UrineTestForm
                        onSubmit={onSubmit}
                        diseases={diseases}
                        urineColors={urineColors}
                        defaultValues={itemId?items.find(i => i.id === itemId):(animalId?{...urineTestValues,animalId}:undefined) as any} />
                </DialogContent>
            </Dialog>
        </div>
    )
}