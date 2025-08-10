'use client'

import { useMemo } from 'react'
import { Plus } from 'lucide-react'
import type { DungColor } from "@/shared/types"
import { useCrud } from '@/shared/hooks/use-crud'
import { useI18n } from "@/shared/hooks/use-i18n"
import { Button } from '@/shared/components/ui/button'
import { DataTable } from '@/shared/components/data-table'
import { Drawer } from '@/shared/components/elements/drawer'
import { createDungColorColums } from '@/entities/dung-colors'
import { DungColorForm, DungColorSchema } from '@/features/dung-colors'
import { dungColorsControllerCreate, dungColorsControllerFindAll, dungColorsControllerRemove, dungColorsControllerUpdate } from '@/shared/api'

export default function DungColors() {
    const { t } = useI18n()
    
    const { dialog, itemId, items, loading, totalItems, handleClose, handleDelete, handleEditItem, handleGetItems, onSubmit, setDialog } = useCrud<DungColor, DungColorSchema, DungColorSchema>({
        findAll: dungColorsControllerFindAll,
        create: dungColorsControllerCreate,
        update: dungColorsControllerUpdate,
        remove: dungColorsControllerRemove,
    })

    const columns = useMemo(() => createDungColorColums(handleEditItem, handleDelete, t), [handleEditItem, handleDelete])

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
                    {t("management.dungColorCreate")}
                </Button>}
            />

            <Drawer
                open={dialog}
                onClose={handleClose}
                title={t(itemId? "management.editColor" : 'management.createColor')}>
                <DungColorForm onSubmit={onSubmit} defaultValues={itemId?items.find(i => i.id === itemId):undefined as any} />
            </Drawer>
        </div>
    )
}