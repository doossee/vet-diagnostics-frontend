'use client'

import { useMemo } from 'react'
import { Plus } from 'lucide-react'
import type { DiseaseType } from "@/shared/types"
import { useCrud } from '@/shared/hooks/use-crud'
import { useI18n } from "@/shared/hooks/use-i18n"
import { Button } from '@/shared/components/ui/button'
import { DataTable } from '@/shared/components/data-table'
import { Drawer } from '@/shared/components/elements/drawer'
import { createDiseaseTypeColums } from '@/entities/disease-types'
import { DiseaseTypeForm, DiseaseTypeSchema } from '@/features/disease-types'
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
                topSlot={<Button onClick={() => setDialog(true)} size={'sm'} className="mt-0! w-full sm:w-fit">
                    <Plus />
                    {t("management.diseaseTypeCreate")}
                </Button>}
            />

            <Drawer
                open={dialog}
                onClose={handleClose}
                title={t(itemId?"management.editType":"management.createType")}>
                <DiseaseTypeForm onSubmit={onSubmit} defaultValues={itemId?items.find(i => i.id === itemId):undefined as any} />
            </Drawer>
        </div>
    )
}