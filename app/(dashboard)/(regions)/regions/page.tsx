'use client'

import { Input } from '~/components/ui/input'
import { useRegions } from './hook/use-regions'
import { Button } from '~/components/ui/button'
import { DataTable } from '~/components/data-table'
import { DialogTitle } from '@radix-ui/react-dialog'
import { Dialog, DialogContent, DialogHeader } from "~/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'

export default function Regions() {
    const { form, itemId, regions, dialog, loading, COLUMNS, total,  setDialog, handleClose, handleGetRegions, onSubmit } = useRegions()

    return (
        <div>
            <DataTable
                loading={loading}
                columns={COLUMNS}
                totalItems={total}
                items={regions as any}
                callback={handleGetRegions}
                topSlot={<Button onClick={() => setDialog(true)} className="w-full sm:w-fit">Viloyat yaratish</Button>} />

            <Dialog open={dialog} onOpenChange={handleClose}>
                <DialogContent className="bg-card overflow-auto max-h-screen md:max-h-[95vh]" aria-describedby={undefined}>
                    <DialogHeader>
                        <DialogTitle>{itemId?"Viloyatni o'zgartirish":"Viloyat yaratish"}</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                name="name"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Viloyat nomi</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Viloyat nomi" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full">Saqlash</Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    )
}