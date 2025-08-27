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
import { useGetVaccines } from '@/entities/vaccines/services/queries'
import { VaccineFilters, createVaccineColums, vaccineFilters } from '@/entities/vaccines'
import { useCreateVaccine, useDeleteVaccine, useUpdateVaccine } from '@/entities/vaccines/services/mutations'
// TODO: fix
export default function Vaccines() {
    const [filters, setFilters] = useState(vaccineFilters)

    const { t, locale } = useI18n()
    const { animals } = useAnimals()
    const { vaccineTypes } = useVaccineTypes()

    const { dialog, editedItem, createButton, handleClose, handleDelete, handleEditItem, onSubmit } = useCrud<Vaccine, VaccineSchema, VaccineSchema>({
        createMutation: useCreateVaccine,
        removeMutation: useDeleteVaccine,
        updateMutation: useUpdateVaccine,
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
                columns={columns}
                queryFunction={useGetVaccines}
                topSlot={createButton(t("inspections.createVaccine"))}
            />

            <Drawer
                open={dialog}
                onClose={handleClose}
                title={t(editedItem?"inspections.editVaccine":"inspections.createVaccine")}>
                <VaccineForm
                    onSubmit={onSubmit}
                    vaccineTypes={vaccineTypes}
                    defaultValues={editedItem?editedItem:undefined}/>
            </Drawer>
        </div>
    )
}