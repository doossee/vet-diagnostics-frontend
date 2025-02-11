'use client'

import { useRouter } from '~/i18n/routing'
import { useParams } from 'next/navigation'
import { Button } from '~/components/ui/button'
import { useQuery } from "@tanstack/react-query"
import { useLocale, useTranslations } from "next-intl"
import { BLOOD_SERUM_TESTS, GENERAL_BLOOD_TESTS } from '~/constants'
import { FlaskConical, Shovel, Syringe, FlaskRound } from 'lucide-react'
import { Table, TableBody, TableCell, TableRow } from '~/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Disease, Vaccine, BloodSerumTest, GeneralBloodTest } from '~/lib/type'
import { ANIMAL_GENDERS, OBESITY_TYPES, BODY_TYPES, CUSTOMER_TYPES, POSITIONS, BODY_STRUCTURES } from '~/constants'
import { animalsControllerFindOne, generalInspectionControllerFindAll, diseasesControllerFindAll, vaccinesControllerFindAll, generalBloodTestControllerFindAll, bloodSerumTestsControllerFindAll } from '~/lib/api'

export default function Animals() {
    const router = useRouter()
    const t = useTranslations()
    const params = useParams<{id: string}>()
    const locale = useLocale() as 'uz' | 'ru'
    
    const { data: animal } = useQuery({
        queryKey: ['animal', params.id],
        queryFn: () => animalsControllerFindOne(+params.id)
    })

    const { data: inspection } = useQuery({
        queryKey: ['last-general-inspection', params.id],
        queryFn: async () => {
            const data = await generalInspectionControllerFindAll({ page: 1, perPage: 1, byCreatedDate: 'desc', animalId: +params.id })
            
            return data.data[0] ?? null
        },
    })

    const { data: disease } = useQuery({
        queryKey: ['last-disease', params.id],
        queryFn: async () => {
            const data: any = await diseasesControllerFindAll({ page: 1, perPage: 1, byCreatedDate: 'desc', animalId: +params.id })
            
            return (data.data[0] as Disease) ?? null
        }
    })
    
    const { data: vaccine } = useQuery({
        queryKey: ['last-vaccine', params.id],
        queryFn: async () => {
            const data: any = await vaccinesControllerFindAll({ page: 1, perPage: 1, byCreatedDate: 'desc', animalId: +params.id })
            
            return (data.data[0] as Vaccine) ?? null
        }
    })

    const { data: bloodTest } = useQuery({
        queryKey: ['last-blood-test', params.id],
        queryFn: async () => {
            const data: any = await generalBloodTestControllerFindAll({ page: 1, perPage: 1, byCreatedDate: 'desc', animalId: +params.id })
            
            return (data.data[0] as GeneralBloodTest) ?? null
        }
    })

    const { data: serumTest } = useQuery({
        queryKey: ['last-blood-serum', params.id],
        queryFn: async () => {
            const data: any = await bloodSerumTestsControllerFindAll({ page: 1, perPage: 1, byCreatedDate: 'desc', animalId: +params.id })
            
            return (data.data[0] as BloodSerumTest) ?? null
        }
    })
    
    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                <Button onClick={() => router.push(`/blood-serum-tests?animalId=${params.id}&new=true`)}>
                    <FlaskRound size={40} />
                    <h1 className='text-sm font-bold'>{t('inspections.createBloodSerumTest')}</h1>
                </Button>
                <Button onClick={() => router.push(`/general-blood-tests?animalId=${params.id}&new=true`)}>
                    <Syringe size={40} />
                    <h1 className='text-sm font-bold'>{t('inspections.createBloodTest')}</h1>
                </Button>
                <Button onClick={() => router.push(`/urine-tests?animalId=${params.id}&new=true`)}>
                    <FlaskConical size={40} />
                    <h1 className='text-sm font-bold'>{t('inspections.createUrineTest')}</h1>
                </Button>
                <Button onClick={() => router.push(`/dung-tests?animalId=${params.id}&new=true`)}>
                    <Shovel size={40} />
                    <h1 className='text-sm font-bold'>{t('inspections.createDungTest')}</h1>
                </Button>
            </div>

            <div className='mt-4 grid grid-cols-1 md:grid-cols-2 gap-4'>

                <Card className='shadow-none rounded'>
                    <CardHeader>
                        <CardTitle>{t('animals.animalInfo')}</CardTitle>
                    </CardHeader>
                    <CardContent className='px-4'>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell><b>{t("animals.name")}</b></TableCell>
                                    {animal?.nameOrCode && <TableCell>{animal?.nameOrCode}</TableCell>}
                                </TableRow>
                                <TableRow>
                                    <TableCell><b>{t("animals.age")}</b></TableCell>
                                    {animal?.birthDate && <TableCell>{new Date().getFullYear() - new Date(animal.birthDate!).getFullYear()}</TableCell>}
                                </TableRow>
                                <TableRow>
                                    <TableCell><b>{t("form.type")}</b></TableCell>
                                    {(animal as any)?.type?.name && <TableCell>{(animal as any)?.type?.name}</TableCell>}
                                </TableRow>
                                <TableRow>
                                    <TableCell><b>{t("animals.color")}</b></TableCell>
                                    {(animal as any)?.color?.name && <TableCell>{(animal as any)?.color?.name}</TableCell>}
                                </TableRow>
                                <TableRow>
                                    <TableCell><b>{t("animals.weight")}</b></TableCell>
                                    {animal?.weight && <TableCell>{animal.weight}</TableCell>}
                                </TableRow>
                                <TableRow>
                                    <TableCell><b>{t("form.gender")}</b></TableCell>
                                    {animal?.gender && <TableCell>{ANIMAL_GENDERS.find(g => g.value === animal.gender)?.[locale]}</TableCell>}
                                </TableRow>
                                <TableRow>
                                    <TableCell><b>{t("animals.breed")}</b></TableCell>
                                    {(animal as any)?.breed?.name && <TableCell>{(animal as any).breed?.name}</TableCell>}
                                </TableRow>
                                <TableRow>
                                    <TableCell><b>{t("animals.arrivalDate")}</b></TableCell>
                                    {animal?.arrivalDate && <TableCell>{new Date(animal?.arrivalDate).toLocaleDateString()}</TableCell>}
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Card className='shadow-none rounded'>
                    <CardHeader>
                        <CardTitle>{t('animals.generalInspection')}</CardTitle>
                    </CardHeader>
                    <CardContent className='px-4'>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell><b>{t("inspections.obesity")}</b></TableCell>
                                    <TableCell>{inspection?.bodyPosition ? OBESITY_TYPES[inspection.obesity][locale] : '-'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><b>{t("inspections.bodyType")}</b></TableCell>
                                    <TableCell>{inspection?.bodyType ? BODY_TYPES[inspection.bodyType][locale] : '-'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><b>{t("inspections.bodyStructure")}</b></TableCell>
                                    <TableCell>{inspection?.bodyStructure ? BODY_STRUCTURES[inspection.bodyStructure][locale] : '-'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><b>{t("inspections.bodyPosition")}</b></TableCell>
                                    <TableCell>{inspection?.bodyPosition ? POSITIONS[inspection.bodyPosition][locale] : "-"}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><b>{t("inspections.customerType")}</b></TableCell>
                                    <TableCell>{inspection?.character ? CUSTOMER_TYPES[inspection.character][locale] : '-'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><b>{t("form.color")}</b></TableCell>
                                    <TableCell>{(inspection as any)?.color?.name ? (inspection as any)?.color?.name : '-'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><b>{t("management.leatherCover")}</b></TableCell>
                                    <TableCell>{(inspection as any)?.leatherCover?.name ? (inspection as any).leatherCover.name : '-'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><b>{t("management.eyeLid")}</b></TableCell>
                                    <TableCell>{(inspection as any)?.eyelid?.name ? (inspection as any).eyelid.name : '-'}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                
                <Card className='shadow-none rounded'>
                    <CardHeader>
                        <CardTitle>{t('form.disease')}</CardTitle>
                    </CardHeader>
                    <CardContent className='px-4'>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell><b>{t("inspections.obesity")}</b></TableCell>
                                    <TableCell>{disease?.startTime ? new Date(disease.startTime).toLocaleDateString() + '-' + new Date(disease.endTime).toLocaleDateString()  : '-'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><b>{t("inspections.bodyType")}</b></TableCell>
                                    <TableCell>{disease?.type?.id ? disease.type.name : '-'}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Card className='shadow-none rounded'>
                    <CardHeader>
                        <CardTitle>{t('animals.vaccine')}</CardTitle>
                    </CardHeader>
                    <CardContent className='px-4'>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell><b>{t("inspections.obesity")}</b></TableCell>
                                    <TableCell>{vaccine?.date ? new Date(vaccine.date).toLocaleDateString() : '-'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><b>{t("inspections.bodyType")}</b></TableCell>
                                    <TableCell>{vaccine?.type?.id ? vaccine.type.name : '-'}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>


                {serumTest && <Card className='shadow-none rounded'>
                    <CardHeader>
                        <CardTitle>{t('nav.bloodSerumTests')}</CardTitle>
                    </CardHeader>
                    <CardContent className='px-4'>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell><b>{t("inspections.obesity")}</b></TableCell>
                                    <TableCell>{new Date(serumTest.createdAt).toLocaleDateString()}</TableCell>
                                </TableRow>
                                {...Object.keys(BLOOD_SERUM_TESTS).map(key => (
                                    <TableRow>
                                        <TableCell><b>{t(BLOOD_SERUM_TESTS[key as keyof typeof BLOOD_SERUM_TESTS][locale])}</b></TableCell>
                                        <TableCell>{serumTest[key as keyof typeof BLOOD_SERUM_TESTS] + " " + BLOOD_SERUM_TESTS[key as keyof typeof BLOOD_SERUM_TESTS][`unit_${locale}`]}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>}
                
                {bloodTest && <Card className='shadow-none rounded'>
                    <CardHeader>
                        <CardTitle>{t('nav.generalBloodTests')}</CardTitle>
                    </CardHeader>
                    <CardContent className='px-4'>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell><b>{t("inspections.obesity")}</b></TableCell>
                                    <TableCell>{new Date(bloodTest.createdAt).toLocaleDateString()}</TableCell>
                                </TableRow>
                                {...Object.keys(GENERAL_BLOOD_TESTS).map(key => (
                                    <TableRow>
                                        <TableCell><b>{t(GENERAL_BLOOD_TESTS[key as keyof typeof GENERAL_BLOOD_TESTS][locale])}</b></TableCell>
                                        <TableCell>{bloodTest?.[key as keyof typeof GENERAL_BLOOD_TESTS] + " " + GENERAL_BLOOD_TESTS[key as keyof typeof GENERAL_BLOOD_TESTS][`unit_${locale}`]}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>}
            </div>
        </div>
    )
}