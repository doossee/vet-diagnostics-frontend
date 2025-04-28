'use client'

import { useMemo } from 'react'
import { Region } from '@/shared/types'
import { useI18n } from '@/shared/hooks/use-i18n'
import { useCrud } from '@/shared/hooks/use-crud'
import { Button } from '@/shared/components/ui/button'
import { createRegionColums } from '@/entities/regions'
import { DataTable } from '@/shared/components/data-table'
import { RegionForm, RegionSchema } from '@/features/regions'
import { Dialog, DialogTitle, DialogContent, DialogHeader } from "@/shared/components/ui/dialog"
import { regionsControllerFindAll, regionsControllerCreate, regionsControllerRemove, regionsControllerUpdate } from '@/shared/api'

export default function Regions() {
    const { t } = useI18n()
    const { dialog, itemId, items, loading, totalItems, handleClose, handleDelete, handleEditItem, handleGetItems, onSubmit, setDialog } = useCrud<Region, RegionSchema, RegionSchema>({
        findAll: regionsControllerFindAll,
        create: regionsControllerCreate, 
        update: regionsControllerRemove,
        remove: regionsControllerRemove,
    })
    
    const columns = useMemo(() => createRegionColums(handleEditItem, handleDelete, t), [handleEditItem, handleDelete])

    return (
        <div>
            <DataTable
                items={items}
                loading={loading}
                columns={columns}
                totalItems={totalItems}
                callback={handleGetItems}
                topSlot={<Button onClick={() => setDialog(true)} className="mt-0! w-full sm:w-fit">{t('regions.createRegion')}</Button>} />

            <Dialog open={dialog} onOpenChange={handleClose}>
                <DialogContent className="bg-card overflow-auto max-h-screen md:max-h-[95vh]" aria-describedby={undefined}>
                    <DialogHeader>
                        <DialogTitle>{t(itemId?"regions.editRegion":"regions.createRegion")}</DialogTitle>
                    </DialogHeader>
                    
                    <RegionForm
                        onSubmit={onSubmit}
                        defaultValues={itemId?items.find(i => i.id === itemId):undefined} />
                </DialogContent>
            </Dialog>
        </div>
    )
}