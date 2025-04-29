'use client'

import { useState } from 'react'
import { useTranslations } from "next-intl"
import { useRouter } from '@/shared/i18n/routing'
import { useAuthData } from '@/shared/hooks/use-auth-data'
import { PawPrint, HeartPulse, Syringe } from 'lucide-react'
import { AnimalForm, AnimalSchema } from '@/features/animals'
import { VaccineForm, VaccineSchema } from '@/features/vaccines'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs"
import { GeneralInspectionForm, GeneralInspectionSchema } from '@/features/general-inspections'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { animalsControllerCreate, generalInspectionControllerCreate, vaccinesControllerCreate } from '@/shared/api'
import { useAnimalColors, useAnimalTypes, useBreeds, useEyelids, useFarmers, useLeatherCovers, useVaccineTypes } from '@/shared/hooks/queries'

export default function Animals() {
    const router = useRouter()
    const t = useTranslations()

    const { userData } = useAuthData()
    const [tab, setTab] = useState("animal")
    const [openTabs, setOpenTabs] = useState(1)
    const [newAnimal, setNewAnimal] = useState<AnimalSchema|null>(null)
    const [newInspection, setNewInspection] = useState<GeneralInspectionSchema|null>(null)
    
    const { breeds } = useBreeds()
    const { eyeLids } = useEyelids()
    const { animalTypes } = useAnimalTypes()
    const { vaccineTypes } = useVaccineTypes()
    const { animalColors } = useAnimalColors()
    const { leatherCovers } = useLeatherCovers()
    const { farmers } = useFarmers(userData?.userRole !== "FARMER")
    
    async function onSubmit(values: VaccineSchema | null = null) {
        try {
            const { id } = await animalsControllerCreate(newAnimal as any)
            
            await generalInspectionControllerCreate({...newInspection, animalId: id} as any)
            if(values) {
                await vaccinesControllerCreate({...values, animalId: id} as any)
            }

            router.push('/animal/'+id)
        } catch (error) {
            console.log(error)            
        }
    }

    function submitAnimal(values: AnimalSchema) {
        setNewAnimal(values)
        setTab("inspection")
        setOpenTabs(2)
    }

    function submitInspection(values: GeneralInspectionSchema) {
        setNewInspection(values)
        setTab("vaccine")
        setOpenTabs(3)
    }

    return (
        <div className='overflow-hidden'>
            <Tabs value={tab}>
                <TabsList color='primary' className="grid w-full grid-cols-3">
                    <TabsTrigger onClick={() => setTab('animal')} value="animal">
                        <PawPrint size={18} className='block md:hidden' />
                        <span className='hidden md:block'>{t('animals.animalInfo')}</span>
                    </TabsTrigger>
                    <TabsTrigger disabled={openTabs<2} onClick={() => setTab('inspection')} value="inspection">
                        <HeartPulse size={18} className='block md:hidden' />
                        <span className='hidden md:block'>{t('animals.generalInspection')}</span>
                    </TabsTrigger>
                    <TabsTrigger disabled={openTabs<3} onClick={() => setTab('vaccine')} value="vaccine">
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
                                breeds={breeds}
                                farmers={farmers}
                                colors={animalColors}
                                onSubmit={submitAnimal}
                                animalTypes={animalTypes}
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
                                hideAnimals
                                eyeLids={eyeLids}
                                animalColors={animalColors}
                                onSubmit={submitInspection}
                                leatherCovers={leatherCovers}
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
                                hideAnimals
                                onSubmit={onSubmit}
                                vaccineTypes={vaccineTypes}
                                onSkip={() => onSubmit(null)}
                            />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}