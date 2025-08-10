'use client'

import { useMemo } from 'react'
import { Plus } from 'lucide-react'
import type { UrineColor } from "@/shared/types"
import { useI18n } from "@/shared/hooks/use-i18n"
import { useCrud } from '@/shared/hooks/use-crud'
import { Button } from '@/shared/components/ui/button'
import { DataTable } from '@/shared/components/data-table'
import { Drawer } from '@/shared/components/elements/drawer'
import { createUrineColorColums } from '@/entities/urine-colors'
import { UrineColorForm, UrineColorSchema } from '@/features/urine-colors'
import { urineColorsControllerCreate, urineColorsControllerFindAll, urineColorsControllerRemove, urineColorsControllerUpdate } from '@/shared/api'

export default function UrineColors() {
    const { t } = useI18n()

    const { dialog, itemId, items, loading, totalItems, handleClose, handleDelete, handleEditItem, handleGetItems, onSubmit, setDialog } = useCrud<UrineColor, UrineColorSchema, UrineColorSchema>({
        findAll: urineColorsControllerFindAll,
        create: urineColorsControllerCreate,
        update: urineColorsControllerUpdate,
        remove: urineColorsControllerRemove,
    })

    const columns = useMemo(() => createUrineColorColums(handleEditItem, handleDelete, t), [handleEditItem, handleDelete])
    
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
                    {t('management.urineColorCreate')}
                </Button>}
            />

            <Drawer
                open={dialog}
                onClose={handleClose}
                title={t(itemId? "management.editColor" : 'management.createColor')}>
                <UrineColorForm onSubmit={onSubmit} defaultValues={itemId?items.find(i => i.id === itemId):undefined as any} />
            </Drawer>
        </div>
    )
}