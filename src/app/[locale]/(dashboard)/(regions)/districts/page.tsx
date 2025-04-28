'use client'

import { useMemo } from 'react'
import type { District } from "@/shared/types"
import { useI18n } from "@/shared/hooks/use-i18n"
import { useCrud } from '@/shared/hooks/use-crud'
import { useRegions } from "@/shared/hooks/queries"
import { Button } from '@/shared/components/ui/button'
import { DataTable } from '@/shared/components/data-table'
import { createDistrictColums } from '@/entities/districts'
import { DistrictForm, DistrictSchema } from '@/features/districts'
import { Dialog, DialogTitle, DialogContent, DialogHeader } from "@/shared/components/ui/dialog"
import { districtsControllerFindAll, districtsControllerCreate, districtsControllerUpdate, districtsControllerRemove } from '@/shared/api'

export default function Districts() {
    const { t } = useI18n()
    const { regions } = useRegions()

    const { dialog, itemId, items, loading, totalItems, handleClose, handleDelete, handleEditItem, handleGetItems, onSubmit, setDialog } = useCrud<District, DistrictSchema, DistrictSchema>({
        findAll: districtsControllerFindAll,
        create: districtsControllerCreate,
        update: districtsControllerUpdate,
        remove: districtsControllerRemove,
    })

    const columns = useMemo(() => createDistrictColums(handleEditItem, handleDelete, t), [handleEditItem, handleDelete])

    return (
        <div>
            <DataTable
                items={items}
                loading={loading}
                columns={columns}
                totalItems={totalItems}
                callback={handleGetItems}
                topSlot={<Button onClick={() => setDialog(true)} size={'default'} className="mt-0! w-full sm:w-fit">{t('regions.createDistrict')}</Button>} 
            />

            <Dialog open={dialog} onOpenChange={handleClose}>
                <DialogContent className="bg-card overflow-auto max-h-screen md:max-h-[95vh] max-w-[500px]" aria-describedby={undefined}>
                    <DialogHeader>
                        <DialogTitle>{t(itemId?"regions.editDistrict":"regions.createDistrict")}</DialogTitle>
                    </DialogHeader>
                    
                    <DistrictForm regions={regions} onSubmit={onSubmit} defaultValues={itemId?items.find(i => i.id === itemId):undefined} />
                </DialogContent>
            </Dialog>
        </div>
    )
}