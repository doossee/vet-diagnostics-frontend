'use client'

import { useMemo } from 'react'
import { Plus } from 'lucide-react'
import type { VaccineType } from "@/shared/types"
import { useI18n } from "@/shared/hooks/use-i18n"
import { useCrud } from '@/shared/hooks/use-crud'
import { Button } from '@/shared/components/ui/button'
import { DataTable } from '@/shared/components/data-table'
import { Drawer } from '@/shared/components/elements/drawer'
import { createVaccineTypeColums } from '@/entities/vaccine-types'
import { VaccineTypeForm, VaccineTypeSchema } from "@/features/vaccine-types"
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
                topSlot={<Button onClick={() => setDialog(true)} size={'sm'} className="mt-0! w-full sm:w-fit">
                    <Plus />
                    {t("management.vaccineTypeCreate")}
                </Button>}
            />

            <Drawer
                open={dialog}
                onClose={handleClose}
                title={t(itemId?"management.editType":"management.createType")}>
                <VaccineTypeForm onSubmit={onSubmit} defaultValues={itemId?items.find(i => i.id === itemId):undefined as any} />
            </Drawer>
        </div>
    )
}