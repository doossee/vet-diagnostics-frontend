'use client'

import { useMemo } from 'react'
import { Plus } from 'lucide-react'
import type { Inspection } from "@/shared/types"
import { useI18n } from "@/shared/hooks/use-i18n"
import { useCrud } from "@/shared/hooks/use-crud"
import { Button } from '@/shared/components/ui/button'
import { DataTable } from '@/shared/components/data-table'
import { Drawer } from '@/shared/components/elements/drawer'
import { createInspectionColums } from "@/entities/inspections"
import { InspectionForm, InspectionSchema } from '@/features/inspections'
import { inspectionsControllerFindAll, inspectionsControllerCreate, inspectionsControllerRemove, inspectionsControllerUpdate } from '@/shared/api'

export default function Inspections() {
    const { t, locale } = useI18n()

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
                topSlot={<Button onClick={() => setDialog(true)} size={'default'} className="mt-0! w-full sm:w-fit">
                    <Plus />
                    {t("inspections.createInspection")}
                </Button>} />

            <Drawer
                open={dialog}
                onClose={handleClose}
                title={t(itemId?"inspections.editInspection":"inspections.createInspection")}>
                <InspectionForm
                    type="MORNING"
                    onSubmit={onSubmit}
                    defaultValues={itemId?items.find(i => i.id === itemId):undefined as any} />
            </Drawer>
        </div>
    )
}