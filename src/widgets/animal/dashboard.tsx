'use client';

import { useI18n } from '@/shared/hooks/use-i18n'
import { useRouter } from '@/shared/i18n/routing'
import { Button } from '@/shared/components/ui/button'
import { useSearchQueryParams } from '@/shared/hooks/use-query-params';
import { FlaskConical, Shovel, Syringe, FlaskRound, Plus } from 'lucide-react';
import { BLOOD_SERUM_TESTS, GENERAL_BLOOD_TESTS } from '@/shared/constants'
import { Table, TableBody, TableCell, TableRow } from '@/shared/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { ANIMAL_GENDERS, OBESITY_TYPES, BODY_TYPES, CUSTOMER_TYPES, POSITIONS, BODY_STRUCTURES } from '@/shared/constants'
import { useAnimals, useDiseases, useGeneralInspection, useVaccines, useGeneralBloodTests, useBloodSerumTests } from "@/shared/hooks/queries"
import { EmptyState } from '@/shared/components/empty-state';

export function AnimalDashboard({ id }: { id: number }) {
    const router = useRouter()
    const { t, locale } = useI18n()
    const searchParams = useSearchQueryParams()

    const { animals } = useAnimals({ id: +id })
    const { diseases } = useDiseases({ last: true, animalId: +id })
    const { vaccines } = useVaccines({ last: true, animalId: +id })
    const { bloodSerumTests } = useBloodSerumTests({ last: true, animalId: +id })
    const { generalBloodTests, isLoading: generalBloodTestsLoading } = useGeneralBloodTests({ last: true, animalId: +id })
    const { generalInspections } = useGeneralInspection({ last: true, animalId: +id })

    const animal = animals?.[0] ?? null
    const disease = diseases?.[0] ?? null
    const vaccine = vaccines?.[0] ?? null
    const bloodSerum = bloodSerumTests?.[0] ?? null
    const generalBlood = generalBloodTests?.[0] ?? null
    const generalInspection = generalInspections?.[0] ?? null

    return (
        <div>
            {/* <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                <Button onClick={() => router.push(`/blood-serum-tests?animalId=${id}&new=true`)}>
                    <FlaskRound size={40} />
                    <h1 className='text-sm font-bold'>{t('inspections.createBloodSerumTest')}</h1>
                </Button>
                <Button onClick={() => router.push(`/general-blood-tests?animalId=${id}&new=true`)}>
                    <Syringe size={40} />
                    <h1 className='text-sm font-bold'>{t('inspections.createBloodTest')}</h1>
                </Button>
                <Button onClick={() => router.push(`/urine-tests?animalId=${id}&new=true`)}>
                    <FlaskConical size={40} />
                    <h1 className='text-sm font-bold'>{t('inspections.createUrineTest')}</h1>
                </Button>
                <Button onClick={() => router.push(`/dung-tests?animalId=${id}&new=true`)}>
                    <Shovel size={40} />
                    <h1 className='text-sm font-bold'>{t('inspections.createDungTest')}</h1>
                </Button>
            </div> */}

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
                        <div className='flex items-center justify-between'>
                            <CardTitle>{t('animals.generalInspection')}</CardTitle>

                            {generalInspection && <Button>
                                <Plus />
                                Добавить
                            </Button>}
                        </div>
                    </CardHeader>
                    <CardContent className='px-4'>
                        {generalInspection && <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell><b>{t("inspections.obesity")}</b></TableCell>
                                    <TableCell>{generalInspection?.bodyPosition ? OBESITY_TYPES[generalInspection.obesity][locale] : '-'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><b>{t("inspections.bodyType")}</b></TableCell>
                                    <TableCell>{generalInspection?.bodyType ? BODY_TYPES[generalInspection.bodyType][locale] : '-'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><b>{t("inspections.bodyStructure")}</b></TableCell>
                                    <TableCell>{generalInspection?.bodyStructure ? BODY_STRUCTURES[generalInspection.bodyStructure][locale] : '-'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><b>{t("inspections.bodyPosition")}</b></TableCell>
                                    <TableCell>{generalInspection?.bodyPosition ? POSITIONS[generalInspection.bodyPosition][locale] : "-"}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><b>{t("inspections.customerType")}</b></TableCell>
                                    <TableCell>{generalInspection?.character ? CUSTOMER_TYPES[generalInspection.character][locale] : '-'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><b>{t("form.color")}</b></TableCell>
                                    <TableCell>{generalInspection?.color?.name ? generalInspection?.color?.name : '-'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><b>{t("management.leatherCover")}</b></TableCell>
                                    <TableCell>{generalInspection?.leatherCover?.name ? generalInspection.leatherCover.name : '-'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><b>{t("management.eyeLid")}</b></TableCell>
                                    <TableCell>{generalInspection?.eyelid?.name ? generalInspection.eyelid.name : '-'}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>}
                        {!generalInspection && <EmptyState>
                            <Button>
                                <Plus />
                                Добавить
                            </Button>    
                        </EmptyState>}
                    </CardContent>
                </Card>

                
                <Card className='shadow-none rounded'>
                    <CardHeader>
                        <div className='flex items-center justify-between'>
                            <CardTitle>{t('form.disease')}</CardTitle>

                            {disease && <Button>
                                <Plus />
                                Добавить
                            </Button>}
                        </div>
                    </CardHeader>
                    <CardContent className='px-4'>
                        {disease && <Table>
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
                        </Table>}
                        {!disease && <EmptyState>
                            <Button>
                                <Plus />
                                Добавить
                            </Button>    
                        </EmptyState>}
                    </CardContent>
                </Card>

                <Card className='shadow-none rounded'>
                    <CardHeader>
                        <div className='flex items-center justify-between'>
                            <CardTitle>{t('animals.vaccine')}</CardTitle>

                            {vaccine && <Button>
                                <Plus />
                                Добавить
                            </Button>}
                        </div>
                    </CardHeader>
                    <CardContent className='px-4'>
                        {vaccine && <Table>
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
                        </Table>}
                        {!vaccine && <EmptyState>
                            <Button>
                                <Plus />
                                Добавить
                            </Button>    
                        </EmptyState>}
                    </CardContent>
                </Card>


                <Card className='shadow-none rounded h-min'>
                    <CardHeader>
                        <div className='flex items-center justify-between'>
                            <CardTitle>{t('nav.generalBloodTests')}</CardTitle>

                            {generalBlood && <Button>
                                <Plus />
                                Добавить
                            </Button>}
                        </div>
                    </CardHeader>
                    <CardContent className='px-4'>
                        {generalBlood?.id && <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell><b>{t("inspections.obesity")}</b></TableCell>
                                    <TableCell>{new Date(generalBlood.createdAt).toLocaleDateString()}</TableCell>
                                </TableRow>
                                {...Object.keys(GENERAL_BLOOD_TESTS).map(key => (
                                    <TableRow>
                                        <TableCell><b>{(GENERAL_BLOOD_TESTS[key as keyof typeof GENERAL_BLOOD_TESTS]?.[locale])}</b></TableCell>
                                        <TableCell>{generalBlood?.[key as keyof typeof GENERAL_BLOOD_TESTS] + " " + GENERAL_BLOOD_TESTS[key as keyof typeof GENERAL_BLOOD_TESTS]?.[`unit_${locale}`]}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>}
                        {(!generalBlood && !generalBloodTestsLoading) && <EmptyState>
                            <Button>
                                <Plus />
                                Добавить
                            </Button>    
                        </EmptyState> }
                    </CardContent>
                </Card>

                <Card className='shadow-none rounded h-min'>
                    <CardHeader>
                        <div className='flex items-center justify-between'>
                            <CardTitle>{t('nav.bloodSerumTests')}</CardTitle>

                            {bloodSerum && <Button>
                                <Plus />
                                Добавить
                            </Button>}
                        </div>
                    </CardHeader>
                    <CardContent className='px-4'>
                        {bloodSerum?.id && <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell><b>{t("inspections.obesity")}</b></TableCell>
                                    <TableCell>{new Date(bloodSerum.createdAt).toLocaleDateString()}</TableCell>
                                </TableRow>
                                {...Object.keys(BLOOD_SERUM_TESTS).map(key => (
                                    <TableRow>
                                        <TableCell><b>{(BLOOD_SERUM_TESTS[key as keyof typeof BLOOD_SERUM_TESTS]?.[locale])}</b></TableCell>
                                        <TableCell>{bloodSerum[key as keyof typeof BLOOD_SERUM_TESTS] + " " + BLOOD_SERUM_TESTS[key as keyof typeof BLOOD_SERUM_TESTS][`unit_${locale}`]}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>}
                        {!bloodSerum &&  <EmptyState>
                            <Button>
                                <Plus />
                                Добавить
                            </Button>    
                        </EmptyState> }
                    </CardContent>
                </Card>
                
            </div>
        </div>
    )
}