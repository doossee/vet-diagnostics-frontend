'use client'

import type { User } from "@/shared/types"
import { useI18n } from "@/shared/hooks/use-i18n"
import { useCrud } from "@/shared/hooks/use-crud"
import { Button } from '@/shared/components/ui/button'
import { useCallback, useMemo, useState } from 'react'
import { UserForm, UserSchema } from '@/features/users'
import { DataTable } from '@/shared/components/data-table'
import { useDistricts, useRegions } from "@/shared/hooks/queries"
import { createUserColums, UserFilters, userFilters } from '@/entities/users'
import { Dialog, DialogTitle, DialogContent, DialogHeader } from "@/shared/components/ui/dialog"
import { veterinariansControllerFindAll, veterinariansControllerCreate, veterinariansControllerRemove, usersControllerUpdate } from '@/shared/api'

export default function Veterinarians() {
    const { t, locale } = useI18n()
    const [filters, setFilters] = useState(userFilters)
    const [regionId, setRegionId] = useState<number|null>(null)

    const { regions } = useRegions()
    const { districts } = useDistricts()

    const { dialog, itemId, items, loading, totalItems, handleClose, handleDelete, handleEditItem, handleGetItems, onSubmit, setDialog } = useCrud<User, UserSchema, UserSchema>({
        findAll: veterinariansControllerFindAll,
        create: veterinariansControllerCreate as any,
        update: usersControllerUpdate,
        remove: veterinariansControllerRemove,
        extraOnGet: (data) => {
            return data.map(({ user }: any) => user)
        },
        extraOnEdit: (item: any) => handleSetRegionId(item.districtId),
        extraOnCreate: ({veterinarianId, ...values}) => ({...values, role: 'VETERINARIAN'}),
        extraOnAfterCreate: ({user}) => {
            return user
        },
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
                loading={loading}
                filters={filters}
                items={items as any}
                totalItems={totalItems}
                columns={columns as any}
                callback={handleGetItems}
                topSlot={<Button onClick={() => setDialog(true)} size={'default'} className="mt-0! w-full sm:w-fit">{t('users.createVeterinarian')}</Button>}
            />

            <Dialog open={dialog} onOpenChange={handleClose}>
                <DialogContent className="overflow-auto max-h-screen md:max-h-[95vh] max-w-[650px]" aria-describedby={undefined}>
                    <DialogHeader>
                        <DialogTitle>{t(itemId?'users.editVeterinarian':'users.createVeterinarian')}</DialogTitle>
                    </DialogHeader>
                    
                    <UserForm
                        itemId={itemId}
                        regions={regions}
                        onSubmit={onSubmit}
                        regionId={regionId}
                        setRegionId={setRegionId}
                        districts={filteredDistricts()}
                        defaultValues={itemId?items.find(i => i.id === itemId):undefined as any}
                    />
                </DialogContent>
            </Dialog>
        </div>
    )
}