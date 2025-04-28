'use client'

import { useMemo } from 'react'
import type { Color } from "@/shared/types"
import { useI18n } from '@/shared/hooks/use-i18n'
import { useCrud } from '@/shared/hooks/use-crud'
import { Button } from '@/shared/components/ui/button'
import { DataTable } from '@/shared/components/data-table'
import { createAnimalColorColums } from '@/entities/animal-colors'
import { AnimalColorForm, AnimalColorSchema } from '@/features/animal-colors'
import { Dialog, DialogTitle, DialogContent, DialogHeader } from "@/shared/components/ui/dialog"
import { colorsControllerFindAll, colorsControllerCreate, colorsControllerRemove, colorsControllerUpdate } from '@/shared/api'

export default function AnimalColors() {
    const { t } = useI18n()
    
    const { dialog, itemId, items, loading, totalItems, handleClose, handleDelete, handleEditItem, handleGetItems, onSubmit, setDialog } = useCrud<Color, AnimalColorSchema, AnimalColorSchema>({
        findAll: colorsControllerFindAll,
        create: colorsControllerCreate as any,
        update: colorsControllerUpdate,
        remove: colorsControllerRemove,
    })

    const columns = useMemo(() => createAnimalColorColums(handleEditItem, handleDelete, t), [handleEditItem, handleDelete])

    return (
        <div>
            <DataTable
                loading={loading}
                columns={columns}
                items={items as any}
                totalItems={totalItems}
                callback={handleGetItems}
                topSlot={<Button onClick={() => setDialog(true)} size={'default'} className="mt-0! w-full sm:w-fit">{t('management.createColor')}</Button>}
            />

            <Dialog open={dialog} onOpenChange={handleClose}>
                <DialogContent className="bg-card overflow-auto max-h-screen md:max-h-[95vh] max-w-[500px]" aria-describedby={undefined}>
                    <DialogHeader>
                        <DialogTitle>{t(itemId? "management.editColor" : 'management.createColor')}</DialogTitle>
                    </DialogHeader>
                    
                    <AnimalColorForm onSubmit={onSubmit} defaultValues={itemId?items.find(i => i.id === itemId):undefined as any} />
                </DialogContent>
            </Dialog>
        </div>
    )
}