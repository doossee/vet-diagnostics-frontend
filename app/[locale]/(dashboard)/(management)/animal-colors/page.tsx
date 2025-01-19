'use client'

import { z } from "zod"
import { useState } from 'react'
import type { Color } from "~/lib/type"
import { useForm } from "react-hook-form"
import { useLocale, useTranslations } from "next-intl"
import { ALERT_MESSAGES } from "~/constants"
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { DataTable } from '~/components/data-table'
import { DialogTitle } from '@radix-ui/react-dialog'
import { zodResolver } from "@hookform/resolvers/zod"
import { Dialog, DialogContent, DialogHeader } from "~/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { colorsControllerFindAll, colorsControllerCreate, colorsControllerRemove, colorsControllerUpdate } from '~/lib/api'

export default function AnimalColors() {
    const t = useTranslations()
    const locale = useLocale() as 'uz' | 'ru'

    const COLUMNS = [
        { title: t('management.colorName'), key: 'name'},
        { title: t('management.colorPick'), key: 'hex' },
        { title: t('table.actions'), key: 'actions', render(item: Color) {
            return (<div className="flex gap-2 items-center">
                <Button onClick={() => handleEditItem(item)} size='sm'>
                    {t('table.edit')}
                </Button>
                <Button onClick={() => handleDelete(item.id)} size='sm'>
                    {t('table.delete')}
                </Button>
            </div>)
        } },
    ]

    const [dialog, setDialog] = useState(false)
    const [loading, setLoading] = useState(true)
    const [totalItems, setTotalItems] = useState(0)
    const [items, setItems] = useState<Color[]>([])
    const [itemId, setItemId] = useState<number | null>(null)

    const formSchema = z.object({
        name: z.string().min(1, t("required.colorNameRequired")),
        hex: z.string().optional()
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            hex: "#000000",
            name: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if (itemId) {
                const data: any = await colorsControllerUpdate(itemId, values as any)
                setItems(p => p.map(i => {
                    if(i.id === itemId) return data
                    return i
                }))
            } else {
                const data: any = await colorsControllerCreate(values as any)
                setItems(p => [...p, data])
            }
    
            handleClose()
        } catch (error) {
            console.log(error)            
        }
    }

    async function handleGetItems(params: any) {
        try {
            setLoading(true)
            const {data, meta} = await colorsControllerFindAll(params)
            setItems(data as any)
            setTotalItems(meta.total)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    async function handleDelete(id: number) {
        try {
            if(!confirm(ALERT_MESSAGES.DELETE_CONFIRM[locale])) return
            await colorsControllerRemove(id)
            setItems(p => p.filter(i => i.id !== id))
        } catch (error) {
            console.log(error)
        }
    }

    function handleEditItem(item: Color) {
        setDialog(true)
        setItemId(item.id)

        form.setValue('hex', item.hex!)
        form.setValue('name', item.name)
    }

    function handleClose() {
        form.reset()
        setItemId(null)
        setDialog(false)
    }

    return (
        <div>
            <DataTable
                loading={loading}
                columns={COLUMNS}
                items={items as any}
                totalItems={totalItems}
                callback={handleGetItems}
                topSlot={<Button onClick={() => setDialog(true)} size={'default'} className="!mt-0 w-full sm:w-fit">{t('management.createColor')}</Button>}
            />

            <Dialog open={dialog} onOpenChange={handleClose}>
                <DialogContent className="bg-card overflow-auto max-h-screen md:max-h-[95vh] max-w-[500px]" aria-describedby={undefined}>
                    <DialogHeader>
                        <DialogTitle>{t(itemId? "management.editColor" : 'management.createColor')}</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                name="name"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t("management.colorName")}</FormLabel>
                                        <FormControl>
                                            <Input placeholder={t("management.colorName")} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="hex"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t("management.colorPick")} {field.value}</FormLabel>
                                        <FormControl>
                                            <Input type="color" placeholder={t("management.colorPick")} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button disabled={form.formState.isSubmitting} type="submit" className="w-full">{t(form.formState.isSubmitting?"form.submiting":"form.submit")}</Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    )
}