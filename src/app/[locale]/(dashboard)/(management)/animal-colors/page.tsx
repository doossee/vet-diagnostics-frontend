'use client'

import { useMemo } from 'react'
import { Plus } from 'lucide-react'
import type { Color } from "@/shared/types"
import { useI18n } from '@/shared/hooks/use-i18n'
import { useCrud } from '@/shared/hooks/use-crud'
import { Button } from '@/shared/components/ui/button'
import { DataTable } from '@/shared/components/data-table'
import { Drawer } from '@/shared/components/elements/drawer'
import { createAnimalColorColums } from '@/entities/animal-colors'
import { AnimalColorForm, AnimalColorSchema } from '@/features/animal-colors'
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
                topSlot={<Button onClick={() => setDialog(true)} size={'sm'} className="mt-0! w-full sm:w-fit">
                    <Plus />
                    {t('management.createColor')}
                </Button>}
            />

            <Drawer
                open={dialog}
                onClose={handleClose}
                title={t(itemId? "management.editColor" : 'management.createColor')}>
                <AnimalColorForm onSubmit={onSubmit} defaultValues={itemId?items.find(i => i.id === itemId):undefined as any} />
            </Drawer>
        </div>
    )
}