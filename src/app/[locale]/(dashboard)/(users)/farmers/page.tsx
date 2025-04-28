'use client'

import type { User } from "@/shared/types"
import { useI18n } from "@/shared/hooks/use-i18n"
import { useCrud } from "@/shared/hooks/use-crud"
import { useCallback, useMemo, useState } from 'react'
import { Button } from '@/shared/components/ui/button'
import { UserForm, UserSchema } from "@/features/users"
import { useAuthData } from "@/shared/hooks/use-auth-data"
import { DataTable } from '@/shared/components/data-table'
import { createUserColums, UserFilters, userFilters } from "@/entities/users"
import { useDistricts, useRegions, useVeterinarians } from "@/shared/hooks/queries"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog"
import { farmersControllerCreate, farmersControllerFindAll, farmersControllerRemove, usersControllerUpdate } from '@/shared/api'

export default function Veterinarians() {
    const { t, locale } = useI18n()
    const { userData } = useAuthData()
    const [filters, setFilters] = useState(userFilters)
    const [regionId, setRegionId] = useState<number|null>(null)
    
    const { regions } = useRegions()
    const { districts } = useDistricts()
    const { veterinarians } = useVeterinarians(userData?.userRole === "ADMIN")
    
    const { dialog, itemId, items, loading, totalItems, handleClose, handleDelete, handleEditItem, handleGetItems, onSubmit, setDialog } = useCrud<User, UserSchema, UserSchema>({
        findAll: farmersControllerFindAll,
        create: farmersControllerCreate as any,
        update: usersControllerUpdate,
        remove: farmersControllerRemove,
        extraOnGet: (data) => {
            return data.map(({ user, veterinarianId }: any) => ({ ...user, veterinarianId }) )
        },
        extraOnAfterCreate: ({user, veterinarianId}) => {
            return ({ ...user, veterinarianId })
        },
        extraOnEdit: (item) => {
            handleSetRegionId(item.districtId)
        },
        extraOnCreate: (values) => {
            if (userData?.userRole === 'VETERINARIAN')
                values.veterinarianId = userData?.userId!
            return values
        },
        extraOnUpdate: (values) => {
            const { password, veterinarianId, ...others } = values
            if(password?.trim()) Object.assign(others, {password})
            return others
        },
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

    const columns = useMemo(() => createUserColums(handleEditItem as any, handleDelete, t, locale), [handleEditItem, handleDelete])

    return (
        <div>
            <UserFilters
                filters={filters}
                regions={regions}
                districts={districts}
                setFilters={setFilters}
            />

            <DataTable
                filters={filters}
                loading={loading}
                items={items as any}
                totalItems={totalItems}
                columns={columns as any}
                callback={handleGetItems}
                topSlot={<Button onClick={() => setDialog(true)} size={'default'} className="mt-0! w-full sm:w-fit">{t('users.createFarmer')}</Button>}
            />

            <Dialog open={dialog} onOpenChange={handleClose}>
                <DialogContent className="overflow-auto max-h-screen md:max-h-[95vh] max-w-[650px]" aria-describedby={undefined}>
                    <DialogHeader>
                        <DialogTitle>{t(itemId?'users.editFarmer':'users.createFarmer')}</DialogTitle>
                    </DialogHeader>

                    <UserForm
                        itemId={itemId}
                        regions={regions}
                        onSubmit={onSubmit}
                        regionId={regionId}
                        setRegionId={setRegionId}
                        veterinarians={veterinarians}
                        districts={filteredDistricts() as any}
                        showVeterinarians={userData?.userRole === 'ADMIN'}
                        defaultValues={itemId?items.find(i => i.id === itemId):undefined as any}
                    />
                </DialogContent>
            </Dialog>
        </div>
    )
}