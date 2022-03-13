import React, {useMemo, useState, useEffect} from 'react';
import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';
import listOfMonths from '../../utils/months';

import { useParams } from 'react-router-dom';

import { Container, Content, Filters } from './styles';


import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';
import formatCurrency from '../../utils/formatCurrency';
import formatDate from '../../utils/formatDate';

interface IData {
    id: string;
    description: string;
    amountFormatted: string;
    frequency: string;
    dataFormatted: string;
    tagColor: string;

}

interface IRouteParams {
    match: {
        params: {
            type: string;
        }
    }
}



const List: React.FC<IRouteParams> = ({ match }) => {
// const List: React.FC = () => {

    //const t = match.params.type ?  match.params.type : '';
    const [data, setData] = useState<IData[]>([]);
    const [monthSelected, setMonthSelected] = useState<string>(String(new Date().getMonth() + 1));
    const [yearSelected, setYearSelected] = useState<string>(String(new Date().getFullYear()));
    const [selectedFrequency, setSelectedFrequency] = useState(['recorrente', 'eventual']);

    //console.log(yearSelected, monthSelected);
    
    //const { type } = useParams();

    const type = match.params.type;

    // const titleOptions = useMemo(() => {
    //   return type === 'entry-balance'
    //     ? { title: 'Entradas', lineColor: '#4E41F0' }
    //     : { title: 'Saídas', lineColor: '#E44C4E' };
    // }, [type]);

    const pageData = useMemo(() => {
        return type === 'entry-balance' ?
            {
                title: 'Entradas',
                lineColor: '#4E41F0',
                data: gains
            }
            :       
            {
                title: 'Saídas',
                lineColor: '#E44C4E',
                data: expenses
            }       
    },[type]);


    // const months = [
    //     {value: 7, label: 'Julho'},
    //     { value: 8, label: 'Agosto'},
    //     {value: 9, label: 'Setembro'},
    //     {value: 12, label: 'Dezembro'},
    //     {value: 11, label: 'Novembro'}
    // ]

    // const years = [
    //     {value: 2018, label: 2018},
    //     {value: 2020, label: 2020},
    //     { value: 2019, label: 2019},
    //     { value: 2021, label: 2021}
     
    // ]

    const handleFrequencyClick = (frequency: string) => {

        const alreadySelected = selectedFrequency.findIndex(item => item === frequency);

        if(alreadySelected >= 0) {
            const filtered = selectedFrequency.filter(item => item !== frequency);
            setSelectedFrequency(filtered);
        } else {
            setSelectedFrequency((prev) =>[...prev, frequency]);
        }
    }


    const listData = useMemo(() => {
        setData([]);
        
        return type === 'entry-balance' ? gains : expenses;
        
    },[type]);


    const years = useMemo(() => {
      
        let uniqueYears: number[] = [];

        listData.forEach(item => {
            const date = new Date(item.date);

            const year = date.getFullYear();
            //console.log('YEARS: ', year);

            if(!uniqueYears.includes(year)) {
                uniqueYears.push(year); 
            }
        });

       

        return uniqueYears.map(year => {
             return {
                 value: year,
                 label: year,
             }
        })

        
    },[listData]);


    const months = useMemo(() => {
        return listOfMonths.map((month, index) => {

            return {
                value: index + 1,
                label: month,
            }
        });

    },[])


    useEffect(() => {
       
        const filteredData = listData.filter( item => {
            const date = new Date(item.date);
            const month = String(date.getMonth() + 1);
            const year = String(date.getFullYear());

            // console.log('month: ', month);
            // console.log('year: ', year);
            // console.log('monthselected: ', monthSelected);
            // console.log('yearSelected: ', yearSelected);

            return month === monthSelected && year === yearSelected && selectedFrequency.includes(item.frequency);
        });  
        
        
        //console.log('formateddata: ', filteredData);


        const formattedData = filteredData.map( item => {
            
            return {
                id: String(Math.random() * 5),
                description: item.description,
                amountFormatted: formatCurrency(Number(item.amount)),
                frequency: item.frequency,
                dataFormatted: formatDate(item.date),
                tagColor: item.frequency === 'recorrente' ? '#4E41F0' : '#E44C4E',
            }
        })

       

       
        
        setData(formattedData);

    },[listData, yearSelected, monthSelected, selectedFrequency]);

 

    return (
       <Container>
           <ContentHeader title={pageData.title}
        lineColor={pageData .lineColor} >
                <SelectInput defaultValue={monthSelected} options={months} onChange={(e) => setMonthSelected(e.target.value)}  />
                <SelectInput options={years} onChange={(e) => setYearSelected(e.target.value)} defaultValue={yearSelected} />

            </ContentHeader>

            <Filters>
                <button
                    type="button"
                    className={`tag-filter tag-filter-recurrent
                    ${selectedFrequency.includes('recorrente') && 'tag-actived'}
                    `}
                    onClick={() => handleFrequencyClick('recorrente')}>
                Recorrentes        
                </button>

                <button
                    type="button"
                    className={`tag-filter tag-filter-eventual
                    ${selectedFrequency.includes('eventual') && 'tag-actived'}
                    `}
                    onClick={() => handleFrequencyClick('eventual')}>
                     Eventuais       
                </button>
            
            </Filters>

            <Content>
                {
                    data.map(item => (
                        <HistoryFinanceCard 
                        key={item.id}            
                        tagColor={item.tagColor}
                        title={item.description}
                        subtitle={item.dataFormatted}
                        amount={item.amountFormatted}
                        />
                    ))

                  
                }
                
                 

            </Content>
       </Container>
    );
}

export default List;