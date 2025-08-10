'use client'

import { useMemo } from 'react'
import { Plus } from 'lucide-react'
import type { Breed } from "@/shared/types"
import { useCrud } from '@/shared/hooks/use-crud'
import { useI18n } from "@/shared/hooks/use-i18n"
import { useBreeds } from '@/shared/hooks/queries'
import { createBreedColums } from '@/entities/breeds'
import { Button } from '@/shared/components/ui/button'
import { DataTable } from '@/shared/components/data-table'
import { BreedForm, BreedSchema } from '@/features/breeds'
import { Drawer } from '@/shared/components/elements/drawer'
import { breedsControllerCreate, breedsControllerFindAll, breedsControllerRemove, breedsControllerUpdate } from '@/shared/api'

export default function Breeds() {
    const { t } = useI18n()
    const { breeds } = useBreeds()

    const { dialog, itemId, items, loading, totalItems, handleClose, handleDelete, handleEditItem, handleGetItems, onSubmit, setDialog } = useCrud<Breed, BreedSchema, BreedSchema>({
        findAll: breedsControllerFindAll,
        create: breedsControllerCreate as any,
        update: breedsControllerUpdate,
        remove: breedsControllerRemove,
    })

    const columns = useMemo(() => createBreedColums(handleEditItem, handleDelete, t), [handleEditItem, handleDelete])

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
                    {t('management.createBreed')}
                </Button>}
            />

            <Drawer
                open={dialog}
                title={t(itemId? "management.editBreed" : 'management.createBreed')}
                onClose={handleClose}>
                
                <BreedForm breeds={breeds} onSubmit={onSubmit} defaultValues={itemId?items.find(i => i.id === itemId):undefined as any} />
            </Drawer>
        </div>
    )
}