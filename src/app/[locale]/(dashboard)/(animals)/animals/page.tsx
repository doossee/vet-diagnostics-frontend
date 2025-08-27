'use client'

import { Plus } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { Animal } from "@/shared/types"
import { useRouter } from '@/shared/i18n/routing'
import { useI18n } from "@/shared/hooks/use-i18n"
import { useCrud } from '@/shared/hooks/use-crud'
import { routes } from '@/shared/constants/routes'
import { DataTable } from '@/shared/components/data-table'
import { useAuthData } from '@/shared/hooks/use-auth-data'
import { Drawer } from '@/shared/components/elements/drawer'
import { AnimalForm, AnimalSchema } from '@/features/animals'
import { useGetAnimals } from '@/entities/animals/services/animal-color-queries'
import { AnimalFilters, animalFilters, createAnimalColums } from '@/entities/animals'
import { useAnimalColors, useAnimalTypes, useBreeds, useFarmers } from '@/shared/hooks/queries'
import { useCreateAnimal, useDeleteAnimal, useUpdateAnimal } from '@/entities/animals/services/animal-color-mutations'

export default function Animals() {
    const router = useRouter()
    const { breeds } = useBreeds()
    const { t, locale } = useI18n()
    const { userData } = useAuthData()
    const { animalTypes } = useAnimalTypes()
    const { animalColors } = useAnimalColors()
    const [filters, setFilters] = useState(animalFilters)
    // const { farmers } = useFarmers(userData?.userRole !== "FARMER")

    const { dialog, editedItem, handleClose, createButton, setDialog, onSubmit, handleDelete, handleEditItem } = useCrud<Animal, AnimalSchema, AnimalSchema>({
        createMutation: useCreateAnimal,
        removeMutation: useDeleteAnimal,
        updateMutation: useUpdateAnimal,

        extraOnUpdate: ({farmerId, ...others}) => others,
        extraOnCreate: (values) => {
            if(userData?.userRole === 'FARMER')
                Object.assign(values, { farmerId: userData?.userId! })
            return values
        },
    })

    const columns = useMemo(() => createAnimalColums(handleEditItem, handleDelete, t, locale), [handleEditItem, handleDelete])

    const handleNavigate = (item: Animal) => {
        router.push(routes.ANIMALS.ID(item.id))
    }

    return (
        <div>
            <AnimalFilters
                breeds={breeds}
                filters={filters}
                colors={animalColors}
                setFilters={setFilters}
                animalTypes={animalTypes} />

            <DataTable
                columns={columns}
                filters={filters}
                onRowClick={handleNavigate}
                queryFunction={useGetAnimals}
                topSlot={createButton(t('animals.createButton'))}
            />

            {/* <Drawer
                open={dialog}
                onClose={handleClose}
                widthClassName='max-w-[650px]!'
                title={t(editedItem? "animals.editAnimal":"animals.createAnimal")}>
                <AnimalForm
                    breeds={breeds}
                    farmers={farmers}
                    onSubmit={onSubmit}
                    colors={animalColors}
                    animalTypes={animalTypes}
                    showFarmer={userData?.userRole !== 'FARMER'}
                    defaultValues={editedItem?editedItem:undefined} />
            </Drawer> */}
        </div>
    )
}