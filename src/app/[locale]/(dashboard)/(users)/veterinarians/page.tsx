'use client'

import type { User } from "@/shared/types"
import { useI18n } from "@/shared/hooks/use-i18n"
import { useCrud } from "@/shared/hooks/use-crud"
import { useCallback, useMemo, useState } from 'react'
import { UserForm, UserSchema } from '@/features/users'
import { DataTable } from '@/shared/components/data-table'
import { Drawer } from "@/shared/components/elements/drawer"
import { useDistricts, useRegions } from "@/shared/hooks/queries"
import { createUserColums, UserFilters, userFilters } from '@/entities/users'
import { useGetVeterinarians } from "@/entities/users/services/queries"
import { useUpdateVeterinarian, useCreateVeterinarian, useDeleteVeterinarian } from "@/entities/users/services/mutations"
// TODO: fix
export default function Veterinarians() {
    const { t, locale } = useI18n()
    const [filters, setFilters] = useState(userFilters)
    const [regionId, setRegionId] = useState<number|null>(null)

    const { regions } = useRegions()
    const { districts } = useDistricts()

    const { dialog, editedItem, createButton, handleClose, handleDelete, handleEditItem, onSubmit } = useCrud<User, UserSchema, UserSchema>({
        createMutation: useCreateVeterinarian,
        updateMutation: useUpdateVeterinarian,
        removeMutation: useDeleteVeterinarian,
        extraOnEdit: (item: any) => handleSetRegionId(item.districtId),
        extraOnCreate: ({veterinarianId, ...values}) => ({...values, role: 'VETERINARIAN'}),
        extraOnUpdate: (values) => {
            const { password, veterinarianId, ...others } = values
            if(password?.trim()) Object.assign(others, {password})
            return others
        },
        extraOnClose: () => setRegionId(null)
    })

    function handleSetRegionId(id: number) {
        const d = districts.find(_ => _.id === id)
        if(!d) return
        setRegionId(d.regionId)
    }

    const filteredDistricts = useCallback(() => {
        if(regionId) return districts.filter(d => d.regionId === regionId)
        else return []
    }, [regionId])

    const columns = useMemo(() => createUserColums(handleEditItem, handleDelete, t, locale), [handleEditItem, handleDelete])

    return (
        <div>
            <UserFilters
                filters={filters}
                regions={regions}
                districts={districts}
                setFilters={setFilters}
            />

            <DataTable
                columns={columns}
                queryFunction={useGetVeterinarians}
                topSlot={createButton(t('users.createVeterinarian'))}
            />

            <Drawer
                open={dialog}
                onClose={handleClose}
                widthClassName="max-w-[650px]!"
                title={t(editedItem?'users.editVeterinarian':'users.createVeterinarian')}>
                <UserForm
                    itemId={editedItem?.id}
                    regions={regions}
                    onSubmit={onSubmit}
                    regionId={regionId}
                    setRegionId={setRegionId}
                    districts={filteredDistricts()}
                    defaultValues={editedItem?editedItem:undefined as any}
                />
            </Drawer>
        </div>
    )
}