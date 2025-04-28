'use client'

import { useMemo } from 'react'
import type { UrineColor } from "@/shared/types"
import { useI18n } from "@/shared/hooks/use-i18n"
import { useCrud } from '@/shared/hooks/use-crud'
import { Button } from '@/shared/components/ui/button'
import { DataTable } from '@/shared/components/data-table'
import { createUrineColorColums } from '@/entities/urine-colors'
import { UrineColorForm, UrineColorSchema } from '@/features/urine-colors'
import { Dialog, DialogTitle, DialogContent, DialogHeader } from "@/shared/components/ui/dialog"
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
                topSlot={<Button onClick={() => setDialog(true)} size={'default'} className="mt-0! w-full sm:w-fit">{t('management.urineColorCreate')}</Button>}
            />

            <Dialog open={dialog} onOpenChange={handleClose}>
                <DialogContent className="overflow-auto max-h-screen md:max-h-[95vh] max-w-[500px]" aria-describedby={undefined}>
                    <DialogHeader>
                        <DialogTitle>{t(itemId? "management.editColor" : 'management.createColor')}</DialogTitle>
                    </DialogHeader>

                    <UrineColorForm onSubmit={onSubmit} defaultValues={itemId?items.find(i => i.id === itemId):undefined as any} />
                </DialogContent>
            </Dialog>
        </div>
    )
}