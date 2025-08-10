'use client'

import { useMemo } from 'react'
import { Plus } from 'lucide-react'
import { Region } from '@/shared/types'
import { useI18n } from '@/shared/hooks/use-i18n'
import { useCrud } from '@/shared/hooks/use-crud'
import { Button } from '@/shared/components/ui/button'
import { createRegionColums } from '@/entities/regions'
import { DataTable } from '@/shared/components/data-table'
import { Drawer } from '@/shared/components/elements/drawer'
import { RegionForm, RegionSchema } from '@/features/regions'
import { regionsControllerFindAll, regionsControllerCreate, regionsControllerRemove } from '@/shared/api'

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
                topSlot={<Button onClick={() => setDialog(true)} size={'sm'} className="mt-0! w-full sm:w-fit">
                    <Plus />
                    {t('regions.createRegion')}
                </Button>} />

            <Drawer
                open={dialog}
                onClose={handleClose}
                title={t(itemId?"regions.editRegion":"regions.createRegion")}>
                <RegionForm
                    onSubmit={onSubmit}
                    defaultValues={itemId?items.find(i => i.id === itemId):undefined} />
            </Drawer>
        </div>
    )
}