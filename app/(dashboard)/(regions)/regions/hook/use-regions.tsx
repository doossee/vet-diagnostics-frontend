'use client'

import { z } from "zod"
import { useState } from 'react'
import { Region } from "~/lib/type"
import { useForm } from "react-hook-form"
import { ALERT_MESSAGES } from "~/constants"
import { Button } from '~/components/ui/button'
import { zodResolver } from "@hookform/resolvers/zod"
import { regionsControllerFindAll, regionsControllerCreate, regionsControllerRemove, regionsControllerUpdate } from '~/lib/api'
import { useQueryClientHook } from "~/app/query-client"

export function useRegions() {
    const COLUMNS = [
        { title: 'Viloyat nomi', key: 'name' },
        { title: 'Tumanlar soni', key: 'districs', render(item: Region) {
            return item.districts?.length || 0
        } },
        { title: 'Boshqarish', key: 'actions', hideTitleInMobile: true, render(item: Region) {
            return (<div className="flex gap-2 items-center">
                <Button onClick={() => handleEditItem(item)} size='sm'>
                    O'zgartirish
                </Button>
                <Button onClick={() => handleDelete(item.id)} size='sm'>
                    O'chirish
                </Button>
            </div>)
        } },
    ]

    const [total, setTotal] = useState(0)
    const [dialog, setDialog] = useState(false)
    const [loading, setLoading] = useState(true)
    const [regions, setRegions] = useState<Region[]>([])
    const [itemId, setItemId] = useState<number|null>(null)

    const formSchema = z.object({
        name: z.string().min(1, "Viloyat nomi kiritishi shart"),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if(itemId) {
                const data: any = await regionsControllerUpdate(itemId, values)
                setRegions(p => p.map(i => {
                    if(i.id === itemId) return data
                    return i
                }))
            } else {
                const data: any = await regionsControllerCreate(values)
                setRegions(p => [...p, data])
            }

            handleClose()
        } catch (error) {
            console.log(error)            
        }
    }

    async function handleGetRegions(params: any) {
        try {
            setLoading(true)
            const items = await regionsControllerFindAll(params)
            setTotal(items.meta.total)
            setRegions(items.data as any)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    async function handleDelete(id: number) {
        if(!confirm(ALERT_MESSAGES.DELETE_CONFIRM)) return
        await regionsControllerRemove(id)
        setRegions(p => p.filter(i => i.id !== id))
    }

    function handleEditItem(item: Region) {
        setDialog(true)
        setItemId(item.id)
        form.setValue('name', item.name)
    }

    function handleClose() {
        form.reset()
        setItemId(null)
        setDialog(false)
    }

    return {
        form,
        total,
        itemId,
        dialog,
        loading,
        regions,
        COLUMNS,

        onSubmit,
        setDialog,
        handleClose,
        handleGetRegions,
    }
}