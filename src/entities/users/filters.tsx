import { GENDERS } from "@/shared/constants"
import { useI18n } from "@/shared/hooks/use-i18n"
import type { Gender, Region, District } from "@/shared/types"
import { FiltersWrapper } from '@/shared/components/filters-wrapper'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select'

export const userFilters = {
    gender: null as Gender | null,
    birthDate: null as null | Date,
    regionId: null as null | number,
    districtId: null as null | number,
}

interface UserFiltersProps {
    regions: Region[]
    districts: District[]
    filters: typeof userFilters
    setFilters: (prev: any) => any
}

export function UserFilters ({ filters, districts, regions, setFilters }: UserFiltersProps) {
    const { t, locale } = useI18n()

    return (
        <FiltersWrapper>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-2">
                <Select value={filters.gender?filters.gender:""} onValueChange={e => setFilters({...filters, gender: e as any})}>
                    <SelectTrigger className="bg-card">
                        <SelectValue placeholder={t('filters.byGender')} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={null as any}>{t('filters.all')}</SelectItem>
                        {
                            GENDERS.map(g => <SelectItem key={g.value} value={g.value}>{g[locale]}</SelectItem>)
                        }
                    </SelectContent>
                </Select>
                <Select value={filters.regionId ? String(filters.regionId) : ""} onValueChange={e => setFilters({...filters, regionId: +e})}>
                    <SelectTrigger className="bg-card">
                        <SelectValue placeholder={t('filters.byRegion')} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={null as any}>{t('filters.all')}</SelectItem>
                        {
                            regions.map(r => <SelectItem key={r.id} value={String(r.id)}>{r.name}</SelectItem>)
                        }
                    </SelectContent>
                </Select>
                <Select value={filters.districtId ? String(filters.districtId) : ""} onValueChange={e => setFilters({...filters, districtId: +e})}>
                    <SelectTrigger className="bg-card">
                        <SelectValue placeholder={t('filters.byDistrict')} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={null as any}>{t('filters.all')}</SelectItem>
                        {
                            districts.filter(d => d.regionId === filters.regionId).map(d => <SelectItem key={d.id} value={String(d.id)}>{d.name}</SelectItem>)
                        }
                    </SelectContent>
                </Select>
            </div>
        </FiltersWrapper>
    )
}