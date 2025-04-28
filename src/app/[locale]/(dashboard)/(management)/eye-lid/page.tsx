'use client'

import { useMemo } from 'react'
import type { Eyelid } from "@/shared/types"
import { useI18n } from "@/shared/hooks/use-i18n"
import { useCrud } from '@/shared/hooks/use-crud'
import { Button } from '@/shared/components/ui/button'
import { createEyeLidColums } from '@/entities/eye-lid'
import { DataTable } from '@/shared/components/data-table'
import { EyeLidForm, EyeLidSchema } from '@/features/eye-lid'
import { Dialog, DialogContent, DialogTitle, DialogHeader } from "@/shared/components/ui/dialog"
import { eyelidsControllerFindAll, eyelidsControllerCreate, eyelidsControllerRemove, eyelidsControllerUpdate } from '@/shared/api'

export default function EyeLid() {
    const { t } = useI18n()
    
    const { dialog, itemId, items, loading, totalItems, handleClose, handleDelete, handleEditItem, handleGetItems, onSubmit, setDialog } = useCrud<Eyelid, EyeLidSchema, EyeLidSchema>({
        findAll: eyelidsControllerFindAll,
        create: eyelidsControllerCreate,
        update: eyelidsControllerUpdate,
        remove: eyelidsControllerRemove,
    })

    const columns = useMemo(() => createEyeLidColums(handleEditItem, handleDelete, t), [handleEditItem, handleDelete])

    return (
        <div>
            <DataTable
                loading={loading}
                columns={columns}
                items={items as any}
                totalItems={totalItems}
                callback={handleGetItems}
                topSlot={<Button onClick={() => setDialog(true)} size={'default'} className="mt-0! w-full sm:w-fit">{t("management.createEyeLid")}</Button>}
            />

            <Dialog open={dialog} onOpenChange={handleClose}>
                <DialogContent className="overflow-auto max-h-screen md:max-h-[95vh] max-w-[500px]" aria-describedby={undefined}>
                    <DialogHeader>
                    <DialogTitle>{t(itemId?"management.editEyeLid":"management.createEyeLid")}</DialogTitle>
                    </DialogHeader>
                    
                    <EyeLidForm onSubmit={onSubmit} defaultValues={itemId?items.find(i => i.id === itemId):undefined as any} />
                </DialogContent>
            </Dialog>
        </div>
    )
}