import { useState } from 'react'
import { useI18n } from './use-i18n'
import { ALERT_MESSAGES } from '../constants'

interface UseCrudOptions<T, CreateValues, UpdateValues> {
    findAll: (params: any) => Promise<any>
    create: (values: CreateValues) => Promise<any>
    update: (id: number, values: any) => Promise<any>
    remove: (id: number) => Promise<any>
    extraOnCreate?: (values: CreateValues) => Partial<T|CreateValues> | void
    extraOnAfterCreate?: (values: any) => any
    extraOnUpdate?: (values: UpdateValues) => Partial<T|CreateValues> | void
    extraOnClose?: () => void
    extraOnEdit?: (item: T) => void
    extraOnGet?: (data: T[]) => any[]

    dialogValue?: boolean
}

export function useCrud<T, CreateValues, UpdateValues>(options: UseCrudOptions<T, CreateValues, UpdateValues>) {
    const { locale } = useI18n()
    const [items, setItems] = useState<T[]>([])
    const [loading, setLoading] = useState(true)
    const [totalItems, setTotalItems] = useState(0)
    const [itemId, setItemId] = useState<number | null>(null)
    const [dialog, setDialog] = useState(options.dialogValue||false)

    async function handleGetItems(params: any) {
        try {
          setLoading(true)
          const { data, meta } = await options.findAll(params)
          const newData = options.extraOnGet ? options.extraOnGet(data) : data
          setItems(newData)
          setTotalItems(meta.total)
        } finally {
          setLoading(false)
        }
    }
    
    async function onSubmit(values: any) {
        try {
            if (itemId) {
                const newValues = options.extraOnUpdate ? options.extraOnUpdate(values) : values
                const updated = await options.update(itemId, newValues)
                setItems(prev => prev.map(i => (i as any).id === itemId ? updated : i))
            } else {
                const newValues = options.extraOnCreate ? options.extraOnCreate(values) : values
                const created = await options.create(newValues)
                const newData = options.extraOnAfterCreate ? options.extraOnAfterCreate(created) : created
                setItems(prev => [...prev, newData])
            }
            handleClose()
        } catch (error) {
          console.error(error)
        }
    }

    async function handleDelete(id: number) {
        try {
          if(!confirm(ALERT_MESSAGES.DELETE_CONFIRM[locale])) return
          await options.remove(id)
          setItems(prev => prev.filter(i => (i as any).id !== id))
        } catch (error) {
          console.error(error)
        }
    }

    function handleEditItem(item: T) {
        setDialog(true)
        setItemId((item as any).id)
        !!options.extraOnEdit && options.extraOnEdit(item)
    }
    
    function handleClose() {
        setItemId(null)
        setDialog(false)
        !!options.extraOnClose && options.extraOnClose()
    }

    return {
        dialog,
        setDialog,
        loading,
        setLoading,
        totalItems,
        setTotalItems,
        items,
        setItems,
        itemId,
        setItemId,
        handleGetItems,
        handleDelete,
        handleEditItem,
        onSubmit,
        handleClose,
    }
}