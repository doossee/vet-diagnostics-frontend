'use client'

import { useMemo } from 'react'
import type { Inspection } from "@/shared/types"
import { useI18n } from "@/shared/hooks/use-i18n"
import { useCrud } from "@/shared/hooks/use-crud"
import { useAnimals } from "@/shared/hooks/queries"
import { Button } from '@/shared/components/ui/button'
import { DataTable } from '@/shared/components/data-table'
import { createInspectionColums } from "@/entities/inspections"
import { InspectionForm, InspectionSchema } from '@/features/inspections'
import { Dialog, DialogTitle, DialogContent, DialogHeader } from "@/shared/components/ui/dialog"
import { inspectionsControllerFindAll, inspectionsControllerCreate, inspectionsControllerRemove, inspectionsControllerUpdate } from '@/shared/api'

export default function Inspections() {
    const { t, locale } = useI18n()
    const { animals } = useAnimals()

    const { dialog, itemId, items, loading, totalItems, handleClose, handleDelete, handleEditItem, handleGetItems, onSubmit, setDialog } = useCrud<Inspection, InspectionSchema, InspectionSchema>({
        findAll: inspectionsControllerFindAll,
        create: inspectionsControllerCreate as any,
        update: inspectionsControllerUpdate,
        remove: inspectionsControllerRemove,
    })

    const columns = useMemo(() => createInspectionColums(handleEditItem, handleDelete, t, locale), [handleEditItem, handleDelete])   

    return (
        <div>
            <DataTable
                loading={loading}
                columns={columns}
                items={items as any}
                totalItems={totalItems}
                callback={handleGetItems}
                topSlot={<Button onClick={() => setDialog(true)} size={'default'} className="mt-0! w-full sm:w-fit">{t("inspections.createInspection")}</Button>} />

            <Dialog open={dialog} onOpenChange={handleClose}>
                <DialogContent className="overflow-auto max-h-screen md:max-h-[95vh] max-w-[500px]" aria-describedby={undefined}>
                    <DialogHeader>
                        <DialogTitle>{t(itemId?"inspections.editInspection":"inspections.createInspection")}</DialogTitle>
                    </DialogHeader>
                    
                    <InspectionForm
                        type="MORNING"
                        animals={animals}
                        onSubmit={onSubmit}
                        defaultValues={itemId?items.find(i => i.id === itemId):undefined as any} />
                </DialogContent>
            </Dialog>
        </div>
    )
}