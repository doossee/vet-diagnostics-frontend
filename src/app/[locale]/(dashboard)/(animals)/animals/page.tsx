'use client'

import { Plus } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { Animal } from "@/shared/types"
import { useRouter } from '@/shared/i18n/routing'
import { useI18n } from "@/shared/hooks/use-i18n"
import { useCrud } from '@/shared/hooks/use-crud'
import { Button } from '@/shared/components/ui/button'
import { DataTable } from '@/shared/components/data-table'
import { useAuthData } from '@/shared/hooks/use-auth-data'
import { Drawer } from '@/shared/components/elements/drawer'
import { AnimalForm, AnimalSchema } from '@/features/animals'
import { AnimalFilters, animalFilters, createAnimalColums } from '@/entities/animals'
import { useAnimalColors, useAnimalTypes, useBreeds, useFarmers } from '@/shared/hooks/queries'
import { animalsControllerFindAll, animalsControllerCreate, animalsControllerRemove, animalsControllerUpdate } from '@/shared/api'

export default function Animals() {
    const router = useRouter()
    const { breeds } = useBreeds()
    const { t, locale } = useI18n()
    const { userData } = useAuthData()
    const { animalTypes } = useAnimalTypes()
    const { animalColors } = useAnimalColors()
    const [filters, setFilters] = useState(animalFilters)
    const { farmers } = useFarmers(userData?.userRole !== "FARMER")

    const { dialog, itemId, items, loading, totalItems, handleGetItems, handleClose, setDialog, onSubmit, handleDelete, handleEditItem } = useCrud<Animal, AnimalSchema, AnimalSchema>({
        findAll: animalsControllerFindAll,
        create: (values) => animalsControllerCreate(values as any),
        remove: animalsControllerRemove,
        update: (id, values) => animalsControllerUpdate(id, values as any),
        extraOnUpdate: ({farmerId, ...others}) => others,
        extraOnCreate: (values) => {
            if(userData?.userRole === 'FARMER')
                Object.assign(values, { farmerId: userData?.userId! })
            console.log(values);
            return values
        },
    })

    const columns = useMemo(() => createAnimalColums(handleEditItem, handleDelete, t, locale), [handleEditItem, handleDelete])

    return (
        <div>
            <AnimalFilters
                breeds={breeds}
                filters={filters}
                colors={animalColors}
                setFilters={setFilters}
                animalTypes={animalTypes} />

            <DataTable
                loading={loading}
                columns={columns}
                filters={filters}
                items={items as any}
                totalItems={totalItems}
                callback={handleGetItems}
                onRowClick={(item: Animal) => router.push(`/animals/${item.id}`)}
                topSlot={<Button onClick={() => setDialog(true)} size={'default'} className="mt-0! w-full sm:w-fit">
                    <Plus />
                    {t('animals.createButton')}
                </Button>}
            />

            <Drawer
                open={dialog}
                onClose={handleClose}
                widthClassName='max-w-[650px]!'
                title={t(itemId? "animals.editAnimal":"animals.createAnimal")}>
                <AnimalForm
                    breeds={breeds}
                    farmers={farmers}
                    onSubmit={onSubmit}
                    colors={animalColors}
                    animalTypes={animalTypes}
                    showFarmer={userData?.userRole !== 'FARMER'}
                    defaultValues={itemId?items.find(i => i.id === itemId):undefined} />
            </Drawer>
        </div>
    )
}