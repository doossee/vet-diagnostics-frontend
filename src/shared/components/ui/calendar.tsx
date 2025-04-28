'use client';

import * as React from 'react';
import { cn } from '@/shared/lib/utils';
import { DayPicker } from 'react-day-picker';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { buttonVariants } from '@/shared/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select'


export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      disableNavigation
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'flex justify-center pt-1 relative items-center hidden',
        caption_label: 'text-sm font-medium',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(buttonVariants({ variant: 'outline' }), 'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell: 'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
        row: 'flex w-full mt-2',
        cell: 'h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
        day: cn(buttonVariants({ variant: 'ghost' }), 'h-9 w-9 p-0 font-normal aria-selected:opacity-100'),
        day_range_end: 'day-range-end',
        day_selected: 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
        day_today: 'bg-accent text-accent-foreground',
        day_outside: 'day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
        day_disabled: 'text-muted-foreground opacity-50',
        day_range_middle: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        // eslint-disable-next-line
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        // eslint-disable-next-line
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
      }}
      showOutsideDays={showOutsideDays}
      {...props}
    />
  );
}

Calendar.displayName = 'Calendar';

function CalendarComponent(props: CalendarProps) {
  const [date, setDate] = React.useState<Date>(new Date());

  // Получаем системный язык пользователя (например, en-US, ru-RU)
  const locale = navigator.language || 'uz-UZ';

  // Создаем объект для получения месяцев
  const formatter = new Intl.DateTimeFormat(locale, { month: 'long' });

  // Массив месяцев, полученных через форматирование
  const months = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(2020, i, 1); // Используем фиксированную дату, так как нас интересует только месяц
    const month = formatter.format(date);

    // Преобразуем первую букву месяца в заглавную, а остальные оставляем как есть
    return month.charAt(0).toUpperCase() + month.slice(1);
  });


  return (
    <>
      <div className="flex space-x-2 pt-2 px-2">
        <Select onValueChange={(value) => {setDate(new Date(date.setMonth(parseInt(value) - 1)))}} defaultValue={(new Date(date).getMonth() + 1).toString()}>
          <SelectTrigger>
            <SelectValue placeholder="Oy" />
          </SelectTrigger>
          <SelectContent>
            {
              [...(new Array(12) as number[])].map((_, index) => ({
                label: months[index],
                value: (index + 1).toString(),
              })).map(g => <SelectItem key={g.value} value={g.value}>{g.label}</SelectItem>)
            }
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => {setDate(new Date(date.setFullYear(parseInt(value))))}} defaultValue={new Date(date).getFullYear().toString()}>
          <SelectTrigger>
            <SelectValue placeholder="Yil" />
          </SelectTrigger>
          <SelectContent>
            {
              [...(new Array(new Date().getFullYear()) as number[])]
              .map((_, index) => ({
                label: (index + 1).toString(),
                value: (index + 1).toString(),
              }))
              .slice(1900, new Date().getFullYear() + 1)
              .reverse()
              .map(g => <SelectItem key={g.value} value={g.value}>{g.label}</SelectItem>)
            }
          </SelectContent>
        </Select>
      </div>
      <Calendar {...props} month={date} />
    </>
  );
}

export { Calendar, CalendarComponent };