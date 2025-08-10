'use client'

import { useMemo } from 'react'
import { Plus } from 'lucide-react'
import { useI18n } from '@/shared/hooks/use-i18n'
import { useSearchParams } from "next/navigation"
import { useCrud } from '@/shared/hooks/use-crud'
import type { BloodSerumTest } from "@/shared/types"
import { Button } from '@/shared/components/ui/button'
import { DataTable } from '@/shared/components/data-table'
import { Drawer } from '@/shared/components/elements/drawer'
import { useRouter, usePathname } from "@/shared/i18n/routing"
import { createBloodSerumTestColums } from '@/entities/blood-serum-tests'
import { BloodSerumTestForm, BloodSerumTestSchema } from '@/features/blood-serum-tests'
import { bloodSerumTestsControllerCreate, bloodSerumTestsControllerFindAll, bloodSerumTestsControllerRemove, bloodSerumTestsControllerUpdate } from '@/shared/api'

export default function BloodSerumTests() {
    const router = useRouter()
    const pathname = usePathname()
    const { t, locale } = useI18n()
    const query = useSearchParams()
    const newAnimal = query.get('new')
    const animalId = query.get('animalId') ? Number(query.get('animalId')) : null

    const { dialog, itemId, items, loading, totalItems, handleClose, handleDelete, handleEditItem, handleGetItems, onSubmit, setDialog } = useCrud<BloodSerumTest, BloodSerumTestSchema, BloodSerumTestSchema>({
        dialogValue: !!newAnimal,
        findAll: bloodSerumTestsControllerFindAll,
        create: bloodSerumTestsControllerCreate as any,
        update: bloodSerumTestsControllerUpdate,
        remove: bloodSerumTestsControllerRemove,
        extraOnClose: () => newAnimal && router.push(pathname + ( animalId ? '?animalId='+animalId : ''))
    })

    const columns = useMemo(() => createBloodSerumTestColums(handleEditItem, handleDelete, t, locale), [handleEditItem, handleDelete])

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
                    {t('inspections.createBloodSerumTest')}
                </Button>}
            />

            <Drawer
                open={dialog}
                onClose={handleClose}
                widthClassName='max-w-[600px]!'
                title={t(itemId?"inspections.editBloodSerumTest":"inspections.createBloodSerumTest")}>
                <BloodSerumTestForm
                    animalId={animalId}
                    onSubmit={onSubmit}
                    defaultValues={itemId?items.find(i => i.id === itemId):undefined}
                />
            </Drawer>
        </div>
    )
}