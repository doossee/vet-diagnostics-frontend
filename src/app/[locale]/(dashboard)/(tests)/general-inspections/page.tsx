'use client'

import { useMemo } from 'react'
import { useI18n } from "@/shared/hooks/use-i18n"
import { useCrud } from '@/shared/hooks/use-crud'
import { GeneralInspection } from '@/shared/types'
import { Button } from '@/shared/components/ui/button'
import { DataTable } from '@/shared/components/data-table'
import { createGeneralInspectionColums } from '@/entities/general-inspections'
import { GeneralInspectionForm, GeneralInspectionSchema } from '@/features/general-inspections'
import { Dialog, DialogTitle, DialogContent, DialogHeader } from "@/shared/components/ui/dialog"
import { useAnimalColors, useAnimals, useEyelids, useLeatherCovers } from '@/shared/hooks/queries'
import { generalInspectionControllerCreate, generalInspectionControllerFindAll, generalInspectionControllerRemove, generalInspectionControllerUpdate } from '@/shared/api'

export default function GeneralInspections() {
    const { t, locale } = useI18n()

    const { eyeLids } = useEyelids()
    const { animalColors } = useAnimalColors()
    const { leatherCovers } = useLeatherCovers()

    const { dialog, itemId, items, loading, totalItems, handleClose, handleDelete, handleEditItem, handleGetItems, onSubmit, setDialog } = useCrud<GeneralInspection, GeneralInspectionSchema, GeneralInspectionSchema>({
        findAll: generalInspectionControllerFindAll,
        create: generalInspectionControllerCreate,
        update: generalInspectionControllerUpdate,
        remove: generalInspectionControllerRemove,
    })

    const columns = useMemo(() => createGeneralInspectionColums(handleEditItem, handleDelete, t, locale), [handleEditItem, handleDelete])

    return (
        <div>
            <DataTable
                loading={loading}
                columns={columns}
                items={items as any}
                totalItems={totalItems}
                callback={handleGetItems}
                topSlot={<Button onClick={() => setDialog(true)} size={'default'} className="mt-0! w-full sm:w-fit">{t("inspections.createGeneralInspections")}</Button>} />

            <Dialog open={dialog} onOpenChange={handleClose}>
                <DialogContent className="overflow-auto max-h-screen md:max-h-[95vh] max-w-[600px]" aria-describedby={undefined}>
                    <DialogHeader>
                        <DialogTitle>{t(itemId?"inspections.editGeneralInspections":"inspections.createGeneralInspections")}</DialogTitle>
                    </DialogHeader>
                    
                    <GeneralInspectionForm
                        eyeLids={eyeLids}
                        onSubmit={onSubmit}
                        animalColors={animalColors}
                        leatherCovers={leatherCovers}
                        defaultValues={itemId?items.find(i => i.id === itemId):undefined as any} />
                </DialogContent>
            </Dialog>
        </div>
    )
}