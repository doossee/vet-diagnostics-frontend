"use client";

import { Plus } from "lucide-react";
import { useI18n } from "@/shared/hooks/use-i18n";
import { routes } from "@/shared/constants/routes";
import { Button } from "@/shared/components/ui/button";
import { EmptyState } from "@/shared/components/empty-state";
import { useSearchQueryParams } from "@/shared/hooks/use-query-params";
import { useGetLastVaccine } from "@/entities/vaccines/services/queries";
import { useGetLastDisease } from "@/entities/diseases/services/queries";
import { useGetAnimal } from '@/entities/animals/services/animal-queries';
import { BLOOD_SERUM_TESTS, GENERAL_BLOOD_TESTS } from "@/shared/constants";
import { SketeletonWrapper } from "@/shared/components/elements/skeleton-wrapper";
import { Table, TableBody, TableCell, TableRow } from "@/shared/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { useGetLastBloodSerumTest } from "@/entities/blood-serum-tests/services/queries";
import { useGetLastGeneralBloodTest } from "@/entities/general-blood-tests/services/queries";
import { useGetLastGeneralInspection } from "@/entities/general-inspections/services/queries";
import { ANIMAL_GENDERS, OBESITY_TYPES, BODY_TYPES, CUSTOMER_TYPES, POSITIONS, BODY_STRUCTURES } from "@/shared/constants";

// TODO: fix create links

export function AnimalDashboard({ id }: { id: number }) {
  const { t, locale } = useI18n();
  const { setMany } = useSearchQueryParams();

  const { data: animal, isLoading: isAnimalLoading } = useGetAnimal(id)
  const { data: disease, isLoading: isDiseaseLoading } = useGetLastDisease(id)
  const { data: vaccine, isLoading: isVaccineLoading } = useGetLastVaccine(id)
  const { data: bloodSerumTest, isLoading: isBloodSerumTestLoading } = useGetLastBloodSerumTest(id)
  const { data: generalBloodTest, isLoading: isGeneralBloodTestLoading } = useGetLastGeneralBloodTest(id)
  const { data: generalInspection, isLoading: isGeneralInspectionLoading } = useGetLastGeneralInspection(id)
  
  const handleCreateGeneralBloodTest = () => {
    setMany({ animalId: id, new: true }, routes.GENERAL_BLOOD_TESTS)
  }

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

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="shadow-none rounded">
          <CardHeader>
            <CardTitle>{t("animals.animalInfo")}</CardTitle>
          </CardHeader>
          <CardContent className="px-4">
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <b>{t("animals.name")}</b>
                  </TableCell>
                  
                  <TableCell>
                    <SketeletonWrapper loading={isAnimalLoading}>
                      {animal?.nameOrCode}
                    </SketeletonWrapper>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>{t("animals.age")}</b>
                  </TableCell>
                  <TableCell>
                    <SketeletonWrapper loading={isAnimalLoading}>
                      {new Date().getFullYear() - new Date(animal?.birthDate!).getFullYear()}
                    </SketeletonWrapper>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>{t("form.type")}</b>
                  </TableCell>
                  
                  <TableCell>
                    <SketeletonWrapper loading={isAnimalLoading}>
                      {(animal as any)?.type?.name}
                    </SketeletonWrapper>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>{t("animals.color")}</b>
                  </TableCell>
                  
                  <TableCell>
                    <SketeletonWrapper loading={isAnimalLoading}>
                      {(animal as any)?.color?.name}
                    </SketeletonWrapper>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>{t("animals.weight")}</b>
                  </TableCell>
                  <TableCell>
                    <SketeletonWrapper loading={isAnimalLoading}>
                      {animal?.weight}
                    </SketeletonWrapper>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>{t("form.gender")}</b>
                  </TableCell>
                  <TableCell>
                    <SketeletonWrapper loading={isAnimalLoading}>
                      {ANIMAL_GENDERS.find((g) => g.value === animal?.gender)?.[locale]}
                    </SketeletonWrapper>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>{t("animals.breed")}</b>
                  </TableCell>
                  <TableCell>
                    <SketeletonWrapper loading={isAnimalLoading}>
                      {(animal as any)?.breed?.name}
                    </SketeletonWrapper>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>{t("animals.arrivalDate")}</b>
                  </TableCell>
                  <TableCell>
                    <SketeletonWrapper loading={isAnimalLoading}>
                      {new Date(animal?.arrivalDate!).toLocaleDateString()}
                    </SketeletonWrapper>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="shadow-none rounded">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{t("animals.generalInspection")}</CardTitle>

              {generalInspection?.id && (
                <Button>
                  <Plus />
                  Добавить
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="px-4">
            {(!generalInspection?.id && !isGeneralInspectionLoading) ? (
              <EmptyState>
                <Button>
                  <Plus />
                  Добавить
                </Button>
              </EmptyState>
            ) : <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <b>{t("inspections.obesity")}</b>
                  </TableCell>
                  <TableCell>
                    <SketeletonWrapper loading={isGeneralInspectionLoading}>
                      {generalInspection?.bodyPosition ? OBESITY_TYPES[generalInspection.obesity][locale] : "-"}
                    </SketeletonWrapper>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>{t("inspections.bodyType")}</b>
                  </TableCell>
                  <TableCell>
                    <SketeletonWrapper loading={isGeneralInspectionLoading}>
                      {generalInspection?.bodyType ? BODY_TYPES[generalInspection.bodyType][locale] : "-"}
                    </SketeletonWrapper>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>{t("inspections.bodyStructure")}</b>
                  </TableCell>
                  <TableCell>
                    <SketeletonWrapper loading={isGeneralInspectionLoading}>
                      {generalInspection?.bodyStructure ? BODY_STRUCTURES[generalInspection.bodyStructure][locale] : "-"}
                    </SketeletonWrapper>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>{t("inspections.bodyPosition")}</b>
                  </TableCell>
                  <TableCell>
                    <SketeletonWrapper loading={isGeneralInspectionLoading}>
                      {generalInspection?.bodyPosition ? POSITIONS[generalInspection.bodyPosition][locale] : "-"}
                    </SketeletonWrapper>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>{t("inspections.customerType")}</b>
                  </TableCell>
                  <TableCell>
                    <SketeletonWrapper loading={isGeneralInspectionLoading}>
                      {generalInspection?.character ? CUSTOMER_TYPES[generalInspection.character][locale] : "-"}
                    </SketeletonWrapper>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>{t("form.color")}</b>
                  </TableCell>
                  <TableCell>
                    <SketeletonWrapper loading={isGeneralInspectionLoading}>
                      {generalInspection?.color?.name ? generalInspection?.color?.name : "-"}
                    </SketeletonWrapper>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>{t("management.leatherCover")}</b>
                  </TableCell>
                  <TableCell>
                    <SketeletonWrapper loading={isGeneralInspectionLoading}>
                      {generalInspection?.leatherCover?.name ? generalInspection.leatherCover.name : "-"}
                    </SketeletonWrapper>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>{t("management.eyeLid")}</b>
                  </TableCell>
                  <TableCell>
                    <SketeletonWrapper loading={isGeneralInspectionLoading}>
                      {generalInspection?.eyelid?.name ? generalInspection.eyelid.name : "-"}
                    </SketeletonWrapper>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>}
          </CardContent>
        </Card>

        <Card className="shadow-none rounded">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{t("form.disease")}</CardTitle>

              {disease?.id && (
                <Button>
                  <Plus />
                  Добавить
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="px-4">
            {(!disease && !isDiseaseLoading) ? (
              <EmptyState>
                <Button>
                  <Plus />
                  Добавить
                </Button>
              </EmptyState>
            ) : <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <b>{t("inspections.obesity")}</b>
                  </TableCell>
                  <TableCell>
                    <SketeletonWrapper loading={isDiseaseLoading}>
                      {disease?.startTime ? new Date(disease.startTime).toLocaleDateString() + "-" + new Date(disease.endTime).toLocaleDateString() : "-"}
                    </SketeletonWrapper>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>{t("inspections.bodyType")}</b>
                  </TableCell>
                  <TableCell>
                    <SketeletonWrapper loading={isDiseaseLoading}>
                      {disease?.type?.id ? disease.type?.name : "-"}
                    </SketeletonWrapper>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>}
          </CardContent>
        </Card>

        <Card className="shadow-none rounded">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{t("animals.vaccine")}</CardTitle>

              {vaccine?.id && (
                <Button>
                  <Plus />
                  Добавить
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="px-4">
            {(!vaccine && !isVaccineLoading) ? (
              <EmptyState>
                <Button>
                  <Plus />
                  Добавить
                </Button>
              </EmptyState>
            ) : <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <b>{t("inspections.obesity")}</b>
                  </TableCell>
                  <TableCell>
                    <SketeletonWrapper loading={isVaccineLoading}>
                      {vaccine?.date ? new Date(vaccine.date).toLocaleDateString() : "-"}
                    </SketeletonWrapper>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>{t("inspections.bodyType")}</b>
                  </TableCell>
                  <TableCell>
                    <SketeletonWrapper loading={isVaccineLoading}>
                      {vaccine?.type?.id ? vaccine.type.name : "-"}
                    </SketeletonWrapper>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>}
          </CardContent>
        </Card>

        <Card className="shadow-none rounded h-min">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{t("nav.generalBloodTests")}</CardTitle>

              {generalBloodTest?.id && (
                <Button onClick={handleCreateGeneralBloodTest}>
                  <Plus />
                  Добавить
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="px-4">
            {(!generalBloodTest && !isGeneralBloodTestLoading) ? (
              <EmptyState>
                <Button onClick={handleCreateGeneralBloodTest}>
                  <Plus />
                  Добавить
                </Button>
              </EmptyState>
            ) : <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <b>{t("inspections.obesity")}</b>
                  </TableCell>
                  <TableCell>
                    <SketeletonWrapper loading={isGeneralBloodTestLoading}>
                      {new Date(generalBloodTest?.createdAt!).toLocaleDateString()}
                    </SketeletonWrapper>
                  </TableCell>
                </TableRow>
                {...Object.keys(GENERAL_BLOOD_TESTS).map((key) => (
                  <TableRow>
                    <TableCell>
                      <b>{GENERAL_BLOOD_TESTS[key as keyof typeof GENERAL_BLOOD_TESTS]?.[locale]}</b>
                    </TableCell>
                    <TableCell>
                      <SketeletonWrapper loading={isGeneralBloodTestLoading}>
                        {generalBloodTest?.[key as keyof typeof GENERAL_BLOOD_TESTS] + " " + GENERAL_BLOOD_TESTS[key as keyof typeof GENERAL_BLOOD_TESTS]?.[`unit_${locale}`]}
                      </SketeletonWrapper>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>}
          </CardContent>
        </Card>

        <Card className="shadow-none rounded h-min">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{t("nav.bloodSerumTests")}</CardTitle>

              {bloodSerumTest?.id && (
                <Button>
                  <Plus />
                  Добавить
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="px-4">
            {(!bloodSerumTest?.id && !isBloodSerumTestLoading) ? (
              <EmptyState>
                <Button>
                  <Plus />
                  Добавить
                </Button>
              </EmptyState>
            ) : <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <b>{t("inspections.obesity")}</b>
                  </TableCell>
                  <TableCell>
                    <SketeletonWrapper loading={isBloodSerumTestLoading}>
                      {new Date(bloodSerumTest?.createdAt!).toLocaleDateString()}
                    </SketeletonWrapper>
                  </TableCell>
                </TableRow>
                {...Object.keys(BLOOD_SERUM_TESTS).map((key) => (
                  <TableRow>
                    <TableCell>
                      <b>{BLOOD_SERUM_TESTS[key as keyof typeof BLOOD_SERUM_TESTS]?.[locale]}</b>
                    </TableCell>
                    <TableCell>
                      <SketeletonWrapper loading={isBloodSerumTestLoading}>
                        {bloodSerumTest?.[key as keyof typeof BLOOD_SERUM_TESTS] + " " + BLOOD_SERUM_TESTS[key as keyof typeof BLOOD_SERUM_TESTS][`unit_${locale}`]}
                      </SketeletonWrapper>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
