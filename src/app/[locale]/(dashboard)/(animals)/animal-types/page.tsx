'use client'

import { useMemo } from 'react'
import type { AnimalType } from "@/shared/types"
import { useCrud } from '@/shared/hooks/use-crud'
import { useI18n } from '@/shared/hooks/use-i18n'
import { Button } from '@/shared/components/ui/button'
import { DataTable } from '@/shared/components/data-table'
import { createAnimalTypeColums } from '@/entities/animal-types'
import { AnimalTypeSchema, AnimalTypeForm } from '@/features/animal-types'
import { Dialog, DialogTitle, DialogContent, DialogHeader } from "@/shared/components/ui/dialog"
import { animalTypesControllerFindAll, animalTypesControllerCreate, animalTypesControllerRemove, animalTypesControllerUpdate } from '@/shared/api'

export default function AnimalTypes() {
    const { t } = useI18n()

    const { dialog, itemId, items, loading, totalItems, handleClose, handleDelete, handleEditItem, handleGetItems, onSubmit, setDialog } = useCrud<AnimalType, AnimalTypeSchema, AnimalTypeSchema>({
        findAll: animalTypesControllerFindAll,
        create: animalTypesControllerCreate,
        update: animalTypesControllerUpdate,
        remove: animalTypesControllerRemove,
    })

    const columns = useMemo(() => createAnimalTypeColums(handleEditItem, handleDelete, t), [handleEditItem, handleDelete])

    return (
        <div>
            <DataTable
                loading={loading}
                columns={columns}
                items={items as any}
                totalItems={totalItems}
                callback={handleGetItems}
                topSlot={<Button onClick={() => setDialog(true)} size={'default'} className="mt-0! w-full sm:w-fit">{t('animalTypes.createButton')}</Button>}
            />

            <Dialog open={dialog} onOpenChange={handleClose}>
                <DialogContent className="bg-card overflow-auto max-h-screen md:max-h-[95vh] max-w-[500px]" aria-describedby={undefined}>
                    <DialogHeader>
                        <DialogTitle>{t(itemId?'animalTypes.editAnimalType':'animalTypes.createAnimalType')}</DialogTitle>
                    </DialogHeader>

                    <AnimalTypeForm onSubmit={onSubmit} defaultValues={itemId?items.find(i => i.id === itemId):undefined} />
                </DialogContent>
            </Dialog>
        </div>
    )
}