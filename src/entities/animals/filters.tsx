import { ANIMAL_GENDERS } from '@/shared/constants'
import { Gender, Breed, Color, AnimalType } from '@/shared/types'
import { FiltersWrapper } from '@/shared/components/filters-wrapper'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select'
import { useI18n } from '@/shared/hooks/use-i18n'

export const animalFilters = {
    gender: null as Gender | null,
    typeId: null as number | null,
    breedId: null as Breed | null,
    colorId: null as number | null,
}

interface AnimalFiltersProps {
    breeds: Breed[]
    colors: Color[]
    animalTypes: AnimalType[]
    filters: typeof animalFilters
    setFilters: (prev: any) => any
}

export function AnimalFilters({ setFilters, filters, breeds, colors, animalTypes }: AnimalFiltersProps) {
    const { t, locale } = useI18n()

    return (<FiltersWrapper>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 mb-2">
            <Select value={filters.typeId?String(filters.typeId):""} onValueChange={e => setFilters({...filters, typeId: +e})}>
                <SelectTrigger className="bg-card">
                    <SelectValue placeholder={t('filters.byType')} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value={null as any}>{t('filters.all')}</SelectItem>
                    {
                        animalTypes.map(d => <SelectItem key={d.id} value={String(d.id)}>{d.name}</SelectItem>)
                    }
                </SelectContent>
            </Select>
            <Select value={filters.gender?filters.gender:""} onValueChange={e => setFilters({...filters, gender: e as any})}>
                <SelectTrigger className="bg-card">
                    <SelectValue placeholder={t('filters.byGender')} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value={null as any}>{t('filters.all')}</SelectItem>
                    {
                        ANIMAL_GENDERS.map(g => <SelectItem key={g.value} value={g.value}>{g[locale]}</SelectItem>)
                    }
                </SelectContent>
            </Select>
            <Select value={filters.breedId?String(filters.breedId):""} onValueChange={e => setFilters({...filters, breedId: +e as any})}>
                <SelectTrigger className="bg-card">
                    <SelectValue placeholder={t('filters.byBreed')} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value={null as any}>{t('filters.all')}</SelectItem>
                    {
                        breeds.map(b => <SelectItem key={b.id} value={String(b.id)}>{b.name}</SelectItem>)
                    }
                </SelectContent>
            </Select>
            <Select value={filters.colorId?String(filters.colorId):""} onValueChange={e => setFilters({...filters, colorId: +e})}>
                <SelectTrigger className="bg-card">
                    <SelectValue placeholder={t('filters.byColor')} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value={null as any}>{t('filters.all')}</SelectItem>
                    {
                        colors.map(color => <SelectItem key={color.id} value={String(color.id)}>{color.name}</SelectItem>)
                    }
                </SelectContent>
            </Select>
        </div>
    </FiltersWrapper>)
}