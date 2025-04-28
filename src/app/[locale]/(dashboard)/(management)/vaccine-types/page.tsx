'use client'

import { useMemo } from 'react'
import type { VaccineType } from "@/shared/types"
import { useI18n } from "@/shared/hooks/use-i18n"
import { useCrud } from '@/shared/hooks/use-crud'
import { Button } from '@/shared/components/ui/button'
import { DataTable } from '@/shared/components/data-table'
import { createVaccineTypeColums } from '@/entities/vaccine-types'
import { VaccineTypeForm, VaccineTypeSchema } from "@/features/vaccine-types"
import { Dialog, DialogTitle, DialogContent, DialogHeader } from "@/shared/components/ui/dialog"
import { vaccineTypesControllerCreate, vaccineTypesControllerFindAll, vaccineTypesControllerRemove, vaccineTypesControllerUpdate } from '@/shared/api'

export default function VaccineTypes() {
    const { t } = useI18n()
    
    const { dialog, itemId, items, loading, totalItems, handleClose, handleDelete, handleEditItem, handleGetItems, onSubmit, setDialog } = useCrud<VaccineType, VaccineTypeSchema, VaccineTypeSchema>({
        findAll: vaccineTypesControllerFindAll,
        create: vaccineTypesControllerCreate,
        update: vaccineTypesControllerUpdate,
        remove: vaccineTypesControllerRemove,
    })

    const columns = useMemo(() => createVaccineTypeColums(handleEditItem, handleDelete, t), [handleEditItem, handleDelete])

    return (
        <div>
            <DataTable
                loading={loading}
                columns={columns}
                items={items as any}
                totalItems={totalItems}
                callback={handleGetItems}
                topSlot={<Button onClick={() => setDialog(true)} size={'default'} className="mt-0! w-full sm:w-fit">{t("management.vaccineTypeCreate")}</Button>}
            />

            <Dialog open={dialog} onOpenChange={handleClose}>
                <DialogContent className="overflow-auto max-h-screen md:max-h-[95vh] max-w-[500px]" aria-describedby={undefined}>
                    <DialogHeader>
                    <DialogTitle>{t(itemId?"management.editType":"management.createType")}</DialogTitle>
                    </DialogHeader>
                    
                    <VaccineTypeForm onSubmit={onSubmit} defaultValues={itemId?items.find(i => i.id === itemId):undefined as any} />
                </DialogContent>
            </Dialog>
        </div>
    )
}