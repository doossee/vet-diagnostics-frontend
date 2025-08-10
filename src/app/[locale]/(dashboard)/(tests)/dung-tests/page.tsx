'use client'

import { useMemo } from 'react'
import { Plus } from 'lucide-react'
import type { DungTest } from "@/shared/types"
import { useI18n } from "@/shared/hooks/use-i18n"
import { useCrud } from "@/shared/hooks/use-crud"
import { useSearchParams } from "next/navigation"
import { Button } from '@/shared/components/ui/button'
import { DataTable } from '@/shared/components/data-table'
import { Drawer } from '@/shared/components/elements/drawer'
import { createDungTestColums } from '@/entities/dung-tests'
import { usePathname, useRouter } from "@/shared/i18n/routing"
import { useDiseases, useDungColors } from "@/shared/hooks/queries"
import { DungTestForm, DungTestSchema, dungTestValues } from '@/features/dung-tests'
import { dungTestsControllerCreate, dungTestsControllerFindAll, dungTestsControllerRemove, dungTestsControllerUpdate } from '@/shared/api'

export default function DungTests() {
    const { t, locale } = useI18n()
    const router = useRouter()
    const pathname = usePathname()
    const query = useSearchParams()
    const newAnimal = query.get('new')
    const animalId = query.get('animalId') ? Number(query.get('animalId')) : null    

    const { diseases } = useDiseases()
    const { dungColors } = useDungColors()

    const { dialog, itemId, items, loading, totalItems, handleClose, handleDelete, handleEditItem, handleGetItems, onSubmit, setDialog } = useCrud<DungTest, DungTestSchema, DungTestSchema>({
        dialogValue: !!newAnimal,
        findAll: dungTestsControllerFindAll,
        create: dungTestsControllerCreate,
        remove: dungTestsControllerRemove,
        update: dungTestsControllerUpdate,
        extraOnClose: () => newAnimal && router.push(pathname + ( animalId ? '?animalId='+animalId : ''))
    })

    const columns = useMemo(() => createDungTestColums(handleEditItem, handleDelete, t, locale), [handleEditItem, handleDelete])

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
                    {t("inspections.createDungTest")}
                </Button>} />

            <Drawer
                open={dialog}
                onClose={handleClose}
                title={t(itemId?"inspections.editDungTest":"inspections.createDungTest")}>
                <DungTestForm
                    onSubmit={onSubmit}
                    diseases={diseases}
                    dungColors={dungColors}
                    defaultValues={itemId?items.find(i => i.id === itemId):(animalId?{...dungTestValues, animalId}:undefined) as any}/>
            </Drawer>
        </div>
    )
}