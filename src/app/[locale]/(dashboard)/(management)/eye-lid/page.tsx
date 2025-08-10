'use client'

import { useMemo } from 'react'
import { Plus } from 'lucide-react'
import type { Eyelid } from "@/shared/types"
import { useI18n } from "@/shared/hooks/use-i18n"
import { useCrud } from '@/shared/hooks/use-crud'
import { Button } from '@/shared/components/ui/button'
import { createEyeLidColums } from '@/entities/eye-lid'
import { DataTable } from '@/shared/components/data-table'
import { Drawer } from '@/shared/components/elements/drawer'
import { EyeLidForm, EyeLidSchema } from '@/features/eye-lid'
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
                topSlot={<Button onClick={() => setDialog(true)} size={'sm'} className="mt-0! w-full sm:w-fit">
                    <Plus />
                    {t("management.createEyeLid")}
                </Button>}
            />

            <Drawer
                open={dialog}
                onClose={handleClose}
                title={t(itemId?"management.editEyeLid":"management.createEyeLid")}>
                <EyeLidForm onSubmit={onSubmit} defaultValues={itemId?items.find(i => i.id === itemId):undefined as any} />
            </Drawer>
        </div>
    )
}