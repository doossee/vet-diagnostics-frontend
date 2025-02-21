'use client'

import { useRouter } from '~/i18n/routing'
import { useEffect, useState } from 'react'
import { useTranslations } from "next-intl"
import { useQuery } from "@tanstack/react-query"
import { useAuthData } from '~/hooks/use-auth-data'
import { AnimalForm } from '~/components/forms/animal-form'
import { PawPrint, HeartPulse, Syringe } from 'lucide-react'
import { VaccineForm } from '~/components/forms/vaccine-form'
import type { Farmer, Animal, GeneralInspection } from "~/lib/type"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { GeneralInspectionForm } from '~/components/forms/general-inspection-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { farmersControllerFindAll, breedsControllerFindAll,
colorsControllerFindAll, animalTypesControllerFindAll,
animalsControllerCreate, eyelidsControllerFindAll,
leatherCoversControllerFindAll, generalInspectionControllerCreate,
vaccinesControllerCreate, vaccineTypesControllerFindAll } from '~/lib/api'

export default function Animals() {
    const router = useRouter()
    const t = useTranslations()

    const { userData } = useAuthData()
    const [tab, setTab] = useState("animal")
    const [farmers, setFarmers] = useState<Farmer[]>([])
    const [newAnimal, setNewAnimal] = useState<Animal|null>(null)
    const [newInspection, setNewInspection] = useState<GeneralInspection|null>(null)

    async function handleGetFarmers() {
        try {
            const { data } = await farmersControllerFindAll({page:1, perPage: 1000})
            setFarmers(data as any)
        } catch (error) {
            console.log(error)
        }
    }

    async function onSubmit(values: any) {
        try {
            const { id } = await animalsControllerCreate(newAnimal as any)
            
            await generalInspectionControllerCreate({...newInspection, animalId: id} as any)
            await vaccinesControllerCreate({...values, animalId: id})

            router.push('/animal/'+id)
        } catch (error) {
            console.log(error)            
        }
    }

    function submitAnimal(values: Animal) {
        setNewAnimal(values)
        setTab("inspection")
    }

    function submitInspection(values: GeneralInspection) {
        setNewInspection(values)
        setTab("vaccine")
    }

    useEffect(() => {
        if(userData?.userRole !== "FARMER") {
            handleGetFarmers()
        }
    }, [])

    const { data: colors } = useQuery({
        queryKey: ['animal-colors'],
        queryFn: () => colorsControllerFindAll({page: 1, perPage: 100})
    })
    
    const { data: types } = useQuery({
        queryKey: ['animal-types'],
        queryFn: () => animalTypesControllerFindAll({page: 1, perPage: 100})
    })

    const { data: breeds } = useQuery({
        queryKey: ['breeds'],
        queryFn: () => breedsControllerFindAll({ page: 1, perPage: 1000 })
    })

    const { data: eyeLids } = useQuery({
        queryKey: ['eye-lids'],
        queryFn: () => eyelidsControllerFindAll({page: 1, perPage: 100}),
    })

    const { data: leatherCovers } = useQuery({
        queryKey: ['leather-covers'],
        queryFn: () => leatherCoversControllerFindAll({page: 1, perPage: 100}),
    })

    const { data: vaccineTypes } = useQuery({
        queryKey: ['vaccine-types'],
        queryFn: () => vaccineTypesControllerFindAll({page: 1, perPage: 100})
    })
    
    return (
        <div className='overflow-hidden'>
            <Tabs value={tab}>
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger onClick={() => setTab('animal')} value="animal">
                        <PawPrint size={18} className='block md:hidden' />
                        <span className='hidden md:block'>{t('animals.animalInfo')}</span>
                    </TabsTrigger>
                    <TabsTrigger onClick={() => setTab('inspection')} value="inspection">
                        <HeartPulse size={18} className='block md:hidden' />
                        <span className='hidden md:block'>{t('animals.generalInspection')}</span>
                    </TabsTrigger>
                    <TabsTrigger onClick={() => setTab('vaccine')} value="vaccine">
                        <Syringe size={18} className='block md:hidden' />
                        <span className='hidden md:block'>{t('animals.vaccine')}</span>
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="animal">
                    <Card className="shadow-none rounded-lg">
                        <CardHeader>
                            <CardTitle>{t('animals.animalInfo')}</CardTitle>
                            <CardDescription></CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <AnimalForm
                                farmers={farmers}
                                types={types?.data || [] as any}
                                breeds={breeds?.data || [] as any}
                                colors={colors?.data || [] as any}
                                onSubmit={submitAnimal}
                                showFarmer={userData?.userRole !== 'FARMER'}
                            />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="inspection">
                    <Card className="shadow-none rounded-lg">
                        <CardHeader>
                            <CardTitle>{t('animals.generalInspection')}</CardTitle>
                            <CardDescription></CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <GeneralInspectionForm
                                colors={colors?.data || [] as any}
                                eyeLids={eyeLids?.data || [] as any}
                                leatherCovers={leatherCovers?.data || [] as any}
                                onSubmit={submitInspection}
                            />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="vaccine">
                    <Card className="shadow-none rounded-lg">
                        <CardHeader>
                            <CardTitle>{t('animals.vaccine')}</CardTitle>
                            <CardDescription></CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <VaccineForm
                                types={vaccineTypes?.data||[] as any}
                                onSubmit={onSubmit}
                            />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}