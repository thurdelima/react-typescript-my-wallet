import React, { useMemo, useState, useEffect, useCallback } from 'react';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import listOfMonths from '../../utils/months';
import WalletBox from '../../components/WalletBox';
import MessageBox from '../../components/MessageBox';
import PieCharts from '../../components/PieCharts';
import HistoryBox from '../../components/HistoryBox';
import BarChartBox from '../../components/BarChartBox';

import expenses from '../../repositories/expenses';
import gains from '../../repositories/gains';

import happyImg from '../../assets/happy.svg';
import sadImg from '../../assets/sad.svg';
import opsImg from '../../assets/ops.svg';
import grinningImg from '../../assets/grinning.svg'


import { Container, Content } from './styles';


const Dashboard: React.FC = () => {

    const options = [
        { value: 'Value Arthur', label: 'Value Arthur' },
        { value: 'Value Arthu', label: 'Value Arthu' },
        { value: 'Value Arth', label: 'Value Arth' }
    ]

    const [monthSelected, setMonthSelected] = useState<string>(String(new Date().getMonth() + 1));
    const [yearSelected, setYearSelected] = useState<string>(String(new Date().getFullYear()));



    // console.log('yearSelected: ', yearSelected);
    // console.log('monthSelected: ', monthSelected);

    const years = useMemo(() => {

        let uniqueYears: number[] = [];

        [...expenses, ...gains].forEach(item => {
            const date = new Date(item.date);

            const year = date.getFullYear();
            //console.log('YEARS: ', year);

            if (!uniqueYears.includes(year)) {
                uniqueYears.push(year);
            }
        });



        return uniqueYears.map(year => {
            return {
                value: year,
                label: year,
            }
        })


    }, []);


    const months = useMemo(() => {
        return listOfMonths.map((month, index) => {

            return {
                value: index + 1,
                label: month,
            }
        });

    }, [])

    const totalExpenses = useMemo(() => {
        let total: number = 0;

        expenses.forEach(item => {

            const date = new Date(item.date);
            // console.log('date: ', date);
            const year = String(date.getFullYear());
            const month = String(date.getMonth() + 1);

            // console.log('month: ', month);
            // console.log('monthSelected: ', monthSelected);
            // console.log('year: ', year);
            // console.log('yearSelected: ', yearSelected);

            if (month === monthSelected && year === yearSelected) {
                try {

                    total += Number(item.amount);

                } catch (error) {
                    throw new Error('Invalid amount! Amount must be number converted string')
                }

            }

        });

        return total;
    }, [monthSelected, yearSelected]);



    const totalGains = useMemo(() => {
        let total: number = 0;

        gains.forEach(item => {

            const date = new Date(item.date);
            const year = String(date.getFullYear());
            const month = String(date.getMonth() + 1);

            if (month === monthSelected && year === yearSelected) {
                try {

                    total += Number(item.amount);

                } catch (error) {
                    throw new Error('Invalid amount! Amount must be number converted string')
                }

            }

        });

        return total;
    }, [monthSelected, yearSelected]);


    const totalBalance = useMemo(() => {
        return totalGains - totalExpenses;
    }, [totalGains, totalExpenses]);


    const message = useMemo(() => {

        if (totalBalance < 0) {
            return {
                title: 'Its so sad!',
                description: 'In this month, you spent more that you should',
                footerText: 'Please, verify your expenses!',
                icon: sadImg
            }
        }
        else if (totalGains === 0 && totalExpenses === 0) {
            return {
                title: "Op's!",
                description: "In this month, there are not registers of gains or expenses.",
                footerText: "Seems that you did not any register in this month and year selected.",
                icon: opsImg
            }
        }
        else if (totalBalance === 0) {
            return {
                title: "Ufaa!",
                description: "In this month, you spent exactly what you gained.",
                footerText: "Do worry. In the next to try save your money.",
                icon: grinningImg
            }
        }
        else {
            return {
                title: "Great!",
                description: "Your wallet is positive!",
                footerText: "Keep continue that. you can consider to invest in your balance.",
                icon: happyImg
            }
        }


    }, [totalBalance])


    const relationExpensesVersusGains = useMemo(() => {

        const total = totalGains + totalExpenses;


        const percentGains = Number(((totalGains / total) * 100).toFixed(1));
        const percentExpenses = Number(((totalExpenses / total) * 100).toFixed(1));

        const data = [
            {
                name: "Gains",
                value: totalGains,
                percent: percentGains ? percentGains : 0,
                color: '#E44C4E'
            },
            {
                name: "Expenses",
                value: totalExpenses,
                percent: percentExpenses ? percentExpenses : 0,
                color: '#F7931B'
            },
        ]


        return data;


    }, [totalGains, totalExpenses])

    const historyData = useMemo(() => {

        //quando n quero usar o primeiro valor do parametro, uso o _
        return listOfMonths.map((_, month) => {

            let amountEntry = 0;

            gains.forEach(gain => {
                const date = new Date(gain.date);
                const gainMonth = date.getMonth();
                const gainYear = String(date.getFullYear());

                if (gainMonth === month && gainYear === yearSelected) {
                    amountEntry += Number(gain.amount);

                    try {
                        amountEntry += Number(gain.amount);
                    } catch {
                        throw new Error('amountEntry is invalid. amountEntry must be valid number');
                    }
                }
            });



            let amountOutput = 0;

            expenses.forEach(expense => {
                const date = new Date(expense.date);
                const expenseMonth = date.getMonth();
                const expenseYear = String(date.getFullYear());

                if (expenseMonth === month && expenseYear === yearSelected) {
                    amountEntry += Number(expense.amount);

                    try {
                        amountOutput += Number(expense.amount);
                    } catch {
                        throw new Error('amountOutput is invalid. amountOutput must be valid number');
                    }
                }
            });

            return {
                monthNumber: month,
                month: listOfMonths[month].substr(0, 3),
                amountEntry,
                amountOutput

            }

        })
            .filter(item => {
                const currentMonth = String(new Date().getMonth());
                const currentYear = String(new Date().getFullYear());
                // (yearSelected < currentYear) como o ano acabou eu posso mostrar todos os meses para o usuario | as the year finished, I can show all months to users
                return (yearSelected === currentYear && String(item.monthNumber) <= currentMonth) || (yearSelected < currentYear)
            });

    }, [yearSelected])

    const relationExpensesRecurrentVersusEventual = useMemo(() => {
        let amountRecurrent = 0;
        let amountEventual = 0;

        expenses.filter((expense) => {
            const date = new Date(expense.date);
            const month = String(date.getMonth() + 1);
            const year = String(date.getFullYear());


            return month === monthSelected && year === yearSelected;
        })
            .forEach((expense) => {

                if (expense.frequency === 'recorrente') {
                    return amountRecurrent += Number(expense.amount);
                }

                if (expense.frequency === 'eventual') {
                    return amountEventual += Number(expense.amount);
                }



            });

        const total = amountRecurrent + amountEventual;

        const percentRecurrent = Number(((amountRecurrent / total) * 100).toFixed(1));
        const percentEventual = Number(((amountEventual / total) * 100).toFixed(1));

        return [
            {
                name: 'Recorrentes',
                amount: amountRecurrent,
                percent: percentRecurrent ? percentRecurrent : 0,
                color: '#F7931B'
            },
            {
                name: 'Eventuais',
                amount: amountEventual,
                percent: percentEventual ? percentEventual : 0,
                color: "#E44C4E"
            }
        ];




    }, [monthSelected, yearSelected]);

    const relationGainsRecurrentVersusEventual = useMemo(() => {
        let amountRecurrent = 0;
        let amountEventual = 0;

        gains.filter((gain) => {
            const date = new Date(gain.date);
            const month = String(date.getMonth() + 1);
            const year = String(date.getFullYear());


            return month === monthSelected && year === yearSelected;
        })
            .forEach((gain) => {

                if (gain.frequency === 'recorrente') {
                    return amountRecurrent += Number(gain.amount);
                }

                if (gain.frequency === 'eventual') {
                    return amountEventual += Number(gain.amount);
                }



            });

        const total = amountRecurrent + amountEventual;

        const percentRecurrent = Number(((amountRecurrent / total) * 100).toFixed(1));
        const percentEventual = Number(((amountEventual / total) * 100).toFixed(1));

        return [
            {
                name: 'Recorrentes',
                amount: amountRecurrent,
                percent: percentRecurrent ? percentRecurrent : 0,
                color: '#F7931B'
            },
            {
                name: 'Eventuais',
                amount: amountEventual,
                percent: percentEventual ? percentEventual : 0,
                color: "#E44C4E"
            }
        ];




    }, [monthSelected, yearSelected])






    return (
        <Container>
            <ContentHeader title="Dashboard" lineColor="#E44C4E">
                {/* <SelectInput options={options} onChange={() => {}} /> */}

                <SelectInput defaultValue={monthSelected} options={months} onChange={(e) => setMonthSelected(e.target.value)} />
                <SelectInput options={years} onChange={(e) => setYearSelected(e.target.value)} defaultValue={yearSelected} />

            </ContentHeader>

            <Content>
                <WalletBox
                    title="Balance"
                    color="#4E41F0"
                    amount={totalBalance}
                    footerlabel="Updated by gains and expenses"
                    icon="dolar"

                />

                <WalletBox
                    title="Gains"
                    color="#F7931B"
                    amount={totalGains}
                    footerlabel="Updated by gains and expenses"
                    icon="arrowUp"

                />

                <WalletBox
                    title="Expenses"
                    color="#E44C4E"
                    amount={totalExpenses}
                    footerlabel="Updated by gains and expenses"
                    icon="arrowDown"

                />

                <MessageBox
                    title={message.title}
                    description={message.description}
                    footerText={message.footerText}
                    icon={message.icon}
                />

                <PieCharts data={relationExpensesVersusGains} />

                <HistoryBox

                    data={historyData}
                    lineColorAmountEntry="#F7931B"
                    lineColorAmountOutput="#E44C4E"

                />

                <BarChartBox
                    title="Expenses"
                    data={relationExpensesRecurrentVersusEventual}



                />

                <BarChartBox
                    title="Gains"
                    data={relationGainsRecurrentVersusEventual}



                />

            </Content>

        </Container>
    );
}

export default Dashboard;