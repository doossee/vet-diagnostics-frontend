'use client'

import { useMemo, useState } from 'react'
import type { Disease } from "@/shared/types"
import { useI18n } from "@/shared/hooks/use-i18n"
import { useCrud } from "@/shared/hooks/use-crud"
import { Button } from '@/shared/components/ui/button'
import { createDiseaseColums } from '@/entities/diseases'
import { DataTable } from '@/shared/components/data-table'
import { DiseaseForm, DiseaseSchema } from '@/features/diseases'
import { useAnimals, useDiseaseTypes } from "@/shared/hooks/queries"
import { Dialog, DialogContent, DialogTitle, DialogHeader } from "@/shared/components/ui/dialog"
import { InspectionForm, InspectionSchema, inspectionValuesWithDisease } from '@/features/inspections'
import { inspectionsControllerCreate, diseasesControllerCreate, diseasesControllerRemove, diseasesControllerUpdate, diseasesControllerFindAll } from '@/shared/api'

export default function Diseases() {
    const { t } = useI18n()
    const { diseaseTypes } = useDiseaseTypes()
    const [animalId, setAnimalId] = useState<number|null>(null)
    const [diseaseId, setDiseaseId] = useState<number|null>(null)

    const { dialog, itemId, items, loading, totalItems, handleClose, handleDelete, handleEditItem, handleGetItems, onSubmit, setDialog } = useCrud<Disease, DiseaseSchema, DiseaseSchema>({
        findAll: diseasesControllerFindAll,
        create:  diseasesControllerCreate as any,
        remove: diseasesControllerRemove,
        update: diseasesControllerUpdate,
    })

    async function handleCreateInspection(values: InspectionSchema) {
        try {
            await inspectionsControllerCreate(values as any)
            setAnimalId(null)
            setDiseaseId(null)
        } catch (error) {
            console.log(error)            
        }
    }

    const handleSetDisease = (id: number, animalId: number) => {
        setDiseaseId(id)
        setAnimalId(animalId)
    }

    const columns = useMemo(() => createDiseaseColums(handleEditItem, handleDelete, handleSetDisease, t), [handleEditItem, handleDelete, handleSetDisease])

    return (
        <div>
            <DataTable
                loading={loading}
                columns={columns}
                items={items as any}
                totalItems={totalItems}
                callback={handleGetItems}
                topSlot={<Button onClick={() => setDialog(true)} size={'default'} className="mt-0! w-full sm:w-fit">{t("inspections.createDisease")}</Button>} />

            <Dialog open={dialog} onOpenChange={handleClose}>
                <DialogContent className="overflow-auto max-h-screen md:max-h-[95vh] max-w-[500px]" aria-describedby={undefined}>
                    <DialogHeader>
                        <DialogTitle>{t(itemId?"inspections.editDisease":"inspections.createDisease")}</DialogTitle>
                    </DialogHeader>
                    
                    <DiseaseForm diseaseTypes={diseaseTypes} onSubmit={onSubmit} />
                </DialogContent>
            </Dialog>

            <Dialog open={diseaseId !== null} onOpenChange={() => setDiseaseId(null)}>
                <DialogContent className="overflow-auto max-h-screen md:max-h-[95vh] max-w-[500px]" aria-describedby={undefined}>
                    <DialogHeader>
                        <DialogTitle>{t("inspections.createInspection")}</DialogTitle>
                    </DialogHeader>
                    <InspectionForm type="DISEASE" defaultValues={ diseaseId ? { ...inspectionValuesWithDisease, diseaseId, animalId, type: "DISEASE" } : undefined as any } onSubmit={handleCreateInspection} />
                </DialogContent>
            </Dialog>
        </div>
    )
}