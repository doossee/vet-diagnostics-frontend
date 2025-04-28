'use client'

import { useMemo } from 'react'
import type { DiseaseType } from "@/shared/types"
import { useCrud } from '@/shared/hooks/use-crud'
import { useI18n } from "@/shared/hooks/use-i18n"
import { Button } from '@/shared/components/ui/button'
import { DataTable } from '@/shared/components/data-table'
import { createDiseaseTypeColums } from '@/entities/disease-types'
import { DiseaseTypeForm, DiseaseTypeSchema } from '@/features/disease-types'
import { Dialog, DialogTitle, DialogContent, DialogHeader } from "@/shared/components/ui/dialog"
import { diseaseTypesControllerCreate, diseaseTypesControllerFindAll, diseaseTypesControllerRemove, diseaseTypesControllerUpdate } from '@/shared/api'

export default function DiseaseTypes() {
    const { t } = useI18n()
    
    const { dialog, itemId, items, loading, totalItems, handleClose, handleDelete, handleEditItem, handleGetItems, onSubmit, setDialog } = useCrud<DiseaseType, DiseaseTypeSchema, DiseaseTypeSchema>({
        findAll: diseaseTypesControllerFindAll,
        create: diseaseTypesControllerCreate,
        update: diseaseTypesControllerUpdate,
        remove: diseaseTypesControllerRemove,
    })

    const columns = useMemo(() => createDiseaseTypeColums(handleEditItem, handleDelete, t), [handleEditItem, handleDelete])

    return (
        <div>
            <DataTable
                loading={loading}
                columns={columns}
                items={items as any}
                totalItems={totalItems}
                callback={handleGetItems}
                topSlot={<Button onClick={() => setDialog(true)} size={'default'} className="mt-0! w-full sm:w-fit">{t("management.diseaseTypeCreate")}</Button>}
            />

            <Dialog open={dialog} onOpenChange={handleClose}>
                <DialogContent className="overflow-auto max-h-screen md:max-h-[95vh] max-w-[500px]" aria-describedby={undefined}>
                    <DialogHeader>
                        <DialogTitle>{t(itemId?"management.editType":"management.createType")}</DialogTitle>
                    </DialogHeader>
                    
                    <DiseaseTypeForm onSubmit={onSubmit} defaultValues={itemId?items.find(i => i.id === itemId):undefined as any} />
                </DialogContent>
            </Dialog>
        </div>
    )
}