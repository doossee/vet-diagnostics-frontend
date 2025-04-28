'use client'

import { useMemo, useState } from 'react'
import type { Vaccine } from "@/shared/types"
import { useI18n } from "@/shared/hooks/use-i18n"
import { useCrud } from "@/shared/hooks/use-crud"
import { Button } from '@/shared/components/ui/button'
import { DataTable } from '@/shared/components/data-table'
import { VaccineForm, VaccineSchema } from '@/features/vaccines'
import { useAnimals, useVaccineTypes } from '@/shared/hooks/queries'
import { VaccineFilters, createVaccineColums, vaccineFilters } from '@/entities/vaccines'
import { Dialog, DialogTitle, DialogContent, DialogHeader } from "@/shared/components/ui/dialog"
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
                topSlot={<Button onClick={() => setDialog(true)} size={'default'} className="mt-0! w-full sm:w-fit">{t("inspections.createVaccine")}</Button>}
            />

            <Dialog open={dialog} onOpenChange={handleClose}>
                <DialogContent className="overflow-auto max-h-screen md:max-h-[95vh] max-w-[500px]" aria-describedby={undefined}>
                    <DialogHeader>
                        <DialogTitle>{t(itemId?"inspections.editVaccine":"inspections.createVaccine")}</DialogTitle>
                    </DialogHeader>
                    
                    <VaccineForm
                        onSubmit={onSubmit}
                        vaccineTypes={vaccineTypes}
                        defaultValues={itemId?items.find(i => i.id === itemId):undefined}/>
                </DialogContent>
            </Dialog>
        </div>
    )
}