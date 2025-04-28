'use client'

import type { VetStation } from "@/shared/types"
import { useI18n } from "@/shared/hooks/use-i18n"
import { useCrud } from "@/shared/hooks/use-crud"
import { useCallback, useMemo, useState } from 'react'
import { Button } from '@/shared/components/ui/button'
import { DataTable } from '@/shared/components/data-table'
import { createVetStationColums } from '@/entities/vetstations'
import { useDistricts, useRegions } from "@/shared/hooks/queries"
import { VetStationForm, VetStationSchema } from '@/features/vetstations'
import { Dialog, DialogTitle, DialogContent, DialogHeader } from "@/shared/components/ui/dialog"
import { vetStationsControllerFindAll, vetStationsControllerCreate, vetStationsControllerUpdate, vetStationsControllerRemove } from '@/shared/api'

export default function VetStations() {
    const { t } = useI18n()
    const { regions } = useRegions()
    const { districts } = useDistricts()
    const [regionId, setRegionId] = useState<number|null>(null)

    const { dialog, itemId, items, loading, totalItems, handleClose, handleDelete, handleEditItem, handleGetItems, onSubmit, setDialog } = useCrud<VetStation, VetStationSchema, VetStationSchema>({
        findAll: vetStationsControllerFindAll,
        create: vetStationsControllerCreate,
        update: vetStationsControllerUpdate,
        remove: vetStationsControllerRemove,
    })

    const filteredDistricts = useCallback(() => {
        if(regionId) return districts.filter(d => d.regionId === regionId)
        else return []
    }, [regionId])

    const columns = useMemo(() => createVetStationColums(handleEditItem, handleDelete, t), [handleEditItem, handleDelete])

    return (
        <div>
            <DataTable
                loading={loading}
                columns={columns}
                items={items as any}
                totalItems={totalItems}
                callback={handleGetItems}
                topSlot={<Button onClick={() => setDialog(true)} size={'default'} className="mt-0! w-full sm:w-fit">{t("regions.createVetStation")}</Button>} 
            />

            <Dialog open={dialog} onOpenChange={handleClose}>
                <DialogContent className="bg-card overflow-auto max-h-screen md:max-h-[95vh] max-w-[500px]" aria-describedby={undefined}>
                    <DialogHeader>
                        <DialogTitle>{t(itemId?"regions.editVetStation":"regions.createVetStation")}</DialogTitle>
                    </DialogHeader>
                    
                    <VetStationForm
                        regions={regions}
                        regionId={regionId}
                        setRegionId={setRegionId}
                        districts={filteredDistricts()}
                        onSubmit={onSubmit}
                        defaultValues={itemId?items.find(i => i.id === itemId):undefined} />
                </DialogContent>
            </Dialog>
        </div>
    )
}