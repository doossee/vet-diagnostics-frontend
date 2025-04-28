'use client'

import { useMemo } from 'react'
import { useI18n } from "@/shared/hooks/use-i18n"
import { useCrud } from '@/shared/hooks/use-crud'
import type { LeatherCover } from "@/shared/types"
import { Button } from '@/shared/components/ui/button'
import { DataTable } from '@/shared/components/data-table'
import { createLeatherCoverColums } from "@/entities/leather-cover"
import { LeatherCoverForm, LeatherCoverSchema } from "@/features/leather-cover"
import { Dialog, DialogTitle, DialogContent, DialogHeader } from "@/shared/components/ui/dialog"
import { leatherCoversControllerCreate, leatherCoversControllerFindAll, leatherCoversControllerRemove, leatherCoversControllerUpdate } from '@/shared/api'

export default function LeatherCovers() {
    const { t  } = useI18n()
    
    const { dialog, itemId, items, loading, totalItems, handleClose, handleDelete, handleEditItem, handleGetItems, onSubmit, setDialog } = useCrud<LeatherCover, LeatherCoverSchema, LeatherCoverSchema>({
        findAll: leatherCoversControllerFindAll,
        create: leatherCoversControllerCreate,
        update: leatherCoversControllerUpdate,
        remove: leatherCoversControllerRemove,
    })

    const columns = useMemo(() => createLeatherCoverColums(handleEditItem, handleDelete, t), [handleEditItem, handleDelete])

    return (
        <div>
            <DataTable
                loading={loading}
                columns={columns}
                items={items as any}
                totalItems={totalItems}
                callback={handleGetItems}
                topSlot={<Button onClick={() => setDialog(true)} size={'default'} className="mt-0! w-full sm:w-fit">{t("management.createLeatherCover")}</Button>}
            />

            <Dialog open={dialog} onOpenChange={handleClose}>
                <DialogContent className="overflow-auto max-h-screen md:max-h-[95vh] max-w-[500px]" aria-describedby={undefined}>
                    <DialogHeader>
                    <DialogTitle>{t(itemId?"management.editLeatherCover":"management.createLeatherCover")}</DialogTitle>
                    </DialogHeader>
                    
                    <LeatherCoverForm onSubmit={onSubmit} defaultValues={itemId?items.find(i => i.id === itemId):undefined as any} />
                </DialogContent>
            </Dialog>
        </div>
    )
}