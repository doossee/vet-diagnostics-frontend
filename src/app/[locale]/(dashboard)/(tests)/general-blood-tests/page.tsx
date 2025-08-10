'use client'

import { useMemo } from 'react'
import { Plus } from 'lucide-react'
import { useSearchParams } from "next/navigation"
import { useI18n } from "@/shared/hooks/use-i18n"
import { useCrud } from '@/shared/hooks/use-crud'
import { Button } from '@/shared/components/ui/button'
import type { GeneralBloodTest } from "@/shared/types"
import { DataTable } from '@/shared/components/data-table'
import { Drawer } from '@/shared/components/elements/drawer'
import { usePathname, useRouter } from "@/shared/i18n/routing"
import { createGeneralBloodTestColums } from '@/entities/general-blood-tests'
import { GeneralBloodTestForm, GeneralBloodTestSchema, generalBloodTestValues } from '@/features/general-blood-tests'
import { generalBloodTestControllerCreate, generalBloodTestControllerFindAll, generalBloodTestControllerUpdate, generalBloodTestControllerRemove } from '@/shared/api'

export default function GeneralBloodTests() {
    const router = useRouter()
    const pathname = usePathname()
    const query = useSearchParams()
    const { t, locale } = useI18n()

    const newAnimal = query.get('new')
    const animalId = query.get('animalId') ? Number(query.get('animalId')) : null

    const { dialog, itemId, items, loading, totalItems, handleClose, handleDelete, handleEditItem, handleGetItems, onSubmit, setDialog } = useCrud<GeneralBloodTest, GeneralBloodTestSchema, GeneralBloodTestSchema>({
        dialogValue: !!newAnimal,
        findAll: generalBloodTestControllerFindAll,
        create: generalBloodTestControllerCreate as any,
        update: generalBloodTestControllerUpdate,
        remove: generalBloodTestControllerRemove,
        extraOnClose: () => newAnimal && router.push(pathname + ( animalId ? '?animalId='+animalId : ''))
    })

    const columns = useMemo(() => createGeneralBloodTestColums(handleEditItem, handleDelete, t, locale), [handleEditItem, handleDelete])

    return (
        <div>
            <DataTable
                loading={loading}
                columns={columns}
                items={items as any}
                totalItems={totalItems}
                callback={handleGetItems}
                topSlot={<Button onClick={() => setDialog(true)} size={'default'} className="mt-0! w-full sm:w-fit">
                    <Plus />
                    {t("inspections.createBloodTest")}
                </Button>} />

            <Drawer
                open={dialog}
                onClose={handleClose}
                widthClassName='max-w-[650px]!'
                title={t(itemId?"inspections.editBloodTest":"inspections.createBloodTest")}>
                <GeneralBloodTestForm
                    onSubmit={onSubmit}
                    animalId={animalId}
                    defaultValues={itemId?items.find(i => i.id === itemId):(animalId?generalBloodTestValues(animalId):undefined)} />
            </Drawer>
        </div>
    )
}