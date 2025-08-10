'use client'

import { useMemo } from 'react'
import { Plus } from 'lucide-react'
import type { AnimalType } from "@/shared/types"
import { useCrud } from '@/shared/hooks/use-crud'
import { useI18n } from '@/shared/hooks/use-i18n'
import { Button } from '@/shared/components/ui/button'
import { DataTable } from '@/shared/components/data-table'
import { Drawer } from '@/shared/components/elements/drawer'
import { createAnimalTypeColums } from '@/entities/animal-types'
import { AnimalTypeSchema, AnimalTypeForm } from '@/features/animal-types'
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
                topSlot={<Button onClick={() => setDialog(true)} size={'sm'} className="mt-0! w-full sm:w-fit">
                    <Plus />
                    {t('animalTypes.createButton')}
                </Button>}
            />

            <Drawer open={dialog}
                onClose={handleClose}
                title={t(itemId?'animalTypes.editAnimalType':'animalTypes.createAnimalType')}>
                <AnimalTypeForm onSubmit={onSubmit} defaultValues={itemId?items.find(i => i.id === itemId):undefined} />
            </Drawer>
        </div>
    )
}