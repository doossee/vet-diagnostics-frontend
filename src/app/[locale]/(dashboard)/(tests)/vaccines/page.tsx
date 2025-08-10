'use client'

import { Plus } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { Vaccine } from "@/shared/types"
import { useI18n } from "@/shared/hooks/use-i18n"
import { useCrud } from "@/shared/hooks/use-crud"
import { Button } from '@/shared/components/ui/button'
import { DataTable } from '@/shared/components/data-table'
import { Drawer } from '@/shared/components/elements/drawer'
import { VaccineForm, VaccineSchema } from '@/features/vaccines'
import { useAnimals, useVaccineTypes } from '@/shared/hooks/queries'
import { VaccineFilters, createVaccineColums, vaccineFilters } from '@/entities/vaccines'
import { vaccinesControllerCreate, vaccinesControllerFindAll, vaccinesControllerRemove, vaccinesControllerUpdate } from '@/shared/api'

export default function Vaccines() {
    const [filters, setFilters] = useState(vaccineFilters)

    const { t, locale } = useI18n()
    const { animals } = useAnimals()
    const { vaccineTypes } = useVaccineTypes()

    const { dialog, itemId, items, loading, totalItems, handleClose, handleDelete, handleEditItem, handleGetItems, onSubmit, setDialog } = useCrud<Vaccine, VaccineSchema, VaccineSchema>({
        findAll: vaccinesControllerFindAll,
        create: vaccinesControllerCreate as any,
        remove: vaccinesControllerRemove,
        update: vaccinesControllerUpdate,
    })

    const columns = useMemo(() => createVaccineColums(handleEditItem, handleDelete, t, locale), [handleEditItem, handleDelete])

    return (
        <div>
            <VaccineFilters
                filters={filters}
                animals={animals}
                setFilters={setFilters}
                vaccineTypes={vaccineTypes}
            />
    
            <DataTable
                hideSearch
                items={items}
                filters={filters}
                loading={loading}
                columns={columns}
                totalItems={totalItems}
                callback={handleGetItems}
                topSlot={<Button onClick={() => setDialog(true)} size={'default'} className="mt-0! w-full sm:w-fit">
                    <Plus />
                    {t("inspections.createVaccine")}
                </Button>}
            />

            <Drawer
                open={dialog}
                onClose={handleClose}
                title={t(itemId?"inspections.editVaccine":"inspections.createVaccine")}>
                <VaccineForm
                    onSubmit={onSubmit}
                    vaccineTypes={vaccineTypes}
                    defaultValues={itemId?items.find(i => i.id === itemId):undefined}/>
            </Drawer>
        </div>
    )
}