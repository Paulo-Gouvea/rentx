import React from 'react';
import { Feather } from '@expo/vector-icons'

import { useTheme } from 'styled-components';

import { ptBR } from './localeConfig';

import { 
    Calendar as CustomCalendar,
    LocaleConfig
} from 'react-native-calendars';

LocaleConfig.locales['pt-br'] = ptBR;
LocaleConfig.defaultLocale = 'pt-br';

export interface MarkedDateProps{
    [date: string]: {
        color: string;
        textColor: string;
        disabled?: boolean;
        disableTouchEvent?: boolean;
    },
}

export interface DayProps {
    day: number;
    dateString: string;
    month: number;
    timestamp: number;
    year: number;
 }
  
 type DateCallbackHandler = (date: DayProps) => void;
  
 interface CalendarProps {
    markedDates: MarkedDateProps;
    onDayPress: DateCallbackHandler;
 }

export function Calendar({ markedDates, onDayPress }: CalendarProps){
    const theme = useTheme();

   return (
    <CustomCalendar
        renderArrow={( direction ) => 
            <Feather
                name={direction === 'left' ? 'chevron-left' : 'chevron-right'}
                size={24}
                color={theme.colors.text}
            />
        }

        headerStyle={{
            backgroundColor: theme.colors.background_secondary,
            borderBottomWidth: 0.5,
            borderBottomColor: theme.colors.text_detail,
            paddingBottom: 10,
            marginBottom: 10,
        }}

        theme={{
            textDayFontFamily: theme.fonts.primary_400,
            textDayHeaderFontFamily: theme.fonts.primary_500,
            textDayHeaderFontSize: 10,
            textMonthFontFamily: theme.fonts.secondary_600,
            textMonthFontSize: 20,
            monthTextColor: theme.colors.title,
            arrowStyle: {
                marginHorizontal: -15
            }
        }}

        firstDay={1}
        minDate={new Date()}
        markingType="period"
        markedDates={markedDates}
        onDayPress={onDayPress}

    />
   );
}