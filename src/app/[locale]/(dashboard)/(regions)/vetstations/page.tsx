'use client'

import type { VetStation } from "@/shared/types"
import { useI18n } from "@/shared/hooks/use-i18n"
import { useCrud } from "@/shared/hooks/use-crud"
import { useCallback, useMemo, useState } from 'react'
import { DataTable } from '@/shared/components/data-table'
import { Drawer } from "@/shared/components/elements/drawer"
import { createVetStationColums } from '@/entities/vetstations'
import { useDistricts, useRegions } from "@/shared/hooks/queries"
import { VetStationForm, VetStationSchema } from '@/features/vetstations'
import { useGetVetStations } from "@/entities/vetstations/services/queries"
import { useCreateVetStation, useDeleteVetStation, useUpdateVetStation } from "@/entities/vetstations/services/mutations"

export default function VetStations() {
    const { t } = useI18n()
    const { regions } = useRegions()
    const { districts } = useDistricts()
    const [regionId, setRegionId] = useState<number|null>(null)

    const { dialog, editedItem, createButton, handleClose, handleDelete, handleEditItem, onSubmit } = useCrud<VetStation, VetStationSchema, VetStationSchema>({
        createMutation: useCreateVetStation,
        updateMutation: useUpdateVetStation,
        removeMutation: useDeleteVetStation,
    })

    // TODO: regions select component
    // TODO: Test
    const filteredDistricts = useCallback(() => {
        if(regionId) return districts.filter(d => d.regionId === regionId)
        else return []
    }, [regionId])

    const columns = useMemo(() => createVetStationColums(handleEditItem, handleDelete, t), [handleEditItem, handleDelete])

    return (
        <div>
            <DataTable
                columns={columns}
                queryFunction={useGetVetStations}
                topSlot={createButton(t("regions.createVetStation"))} 
            />

            <Drawer
                open={dialog}
                onClose={handleClose}
                title={t(editedItem?"regions.editVetStation":"regions.createVetStation")}>
                <VetStationForm
                    regions={regions}
                    regionId={regionId}
                    setRegionId={setRegionId}
                    districts={filteredDistricts()}
                    onSubmit={onSubmit}
                    defaultValues={editedItem?editedItem:undefined} />
            </Drawer>
        </div>
    )
}