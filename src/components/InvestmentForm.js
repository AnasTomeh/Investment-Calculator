import {useEffect, useState} from "react";
import './InvestmentForm.css'

const InvestmentForm = ({onSaveInvestmentData}) => {

    const [inputs , setInputs] = useState({
        currentSaving : 0,
        yearlySaving: 0,
        expectedInterest: 0,
        investmentDuration: 0
    })


    const handelCurrentSaving = (event) => {
        setInputs({
            ...inputs,
            currentSaving: +event.target.value
        })
    }
    const handelYearlySaving = (event) => {
        setInputs({
            ...inputs,
            yearlySaving: +event.target.value
        })
    }
    const handelExpectedInterest = (event) => {
        setInputs({
            ...inputs,
            expectedInterest: +event.target.value
        })
    }
    const handelInvestmentDuration = (event) => {
        setInputs({
            ...inputs,
            investmentDuration: +event.target.value
        })
    }

    let yearlyData = [];
    const calculateHandler = (userInput) => {

        let currentSavings = userInput.currentSaving;
        const yearlyContribution = userInput.yearlySaving;
        const expectedReturn = userInput.expectedInterest / 100;
        const duration = userInput.investmentDuration;
        let cumulativeInterest = 0;

        if (inputs.expectedInterest === 0 && inputs.investmentDuration === 0 && inputs.currentSaving === 0 && inputs.yearlySaving === 0) {
            return
        }



        for (let i = 0; i < duration; i++) {
            const yearlyInterest = currentSavings * expectedReturn;
            currentSavings += yearlyInterest + yearlyContribution;
            cumulativeInterest += yearlyInterest;

            yearlyData.push({
                year: i + 1,
                yearlyInterest: yearlyInterest,
                savingsEndOfYear: currentSavings,
                yearlyContribution: yearlyContribution,
                cumulativeInterest: cumulativeInterest,
            });
        }

    };

    const restInputs = () => {

        setInputs({
            currentSaving : 0,
            yearlySaving: 0,
            expectedInterest: 0,
            investmentDuration: 0
        })
    }

    const submitHandler = (event) => {
        event.preventDefault();

        calculateHandler(inputs)
        onSaveInvestmentData(yearlyData)
        restInputs()

    }

    const restData = () => {
        restInputs()
        yearlyData = []
        onSaveInvestmentData([])
    }

    return (
        <div>
            <form onSubmit={submitHandler} className="form">
                <div className="input-group">
                    <p>
                        <label htmlFor="current-savings">Current Savings ($)</label>
                        <input
                            type="number"
                            id="current-savings"
                            onChange={(event) => handelCurrentSaving(event)}
                            value={inputs.currentSaving}
                        />
                    </p>
                    <p>
                        <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
                        <input
                            type="number"
                            id="yearly-contribution"
                            onChange={(event) => handelYearlySaving(event)}
                            value={inputs.yearlySaving}
                        />
                    </p>
                </div>
                <div className="input-group">
                    <p>
                        <label htmlFor="expected-return">
                            Expected Interest (%, per year)
                        </label>
                        <input
                            type="number"
                            id="expected-return"
                            onChange={(event) => handelExpectedInterest(event)}
                            value={inputs.expectedInterest}
                        />
                    </p>
                    <p>
                        <label htmlFor="duration">Investment Duration (years)</label>
                        <input
                            type="number"
                            id="duration"
                            onChange={(event) => handelInvestmentDuration(event)}
                            value={inputs.investmentDuration}
                        />
                    </p>
                </div>
                <p className="actions">
                    <button type="reset" className="buttonAlt" onClick={restData}>
                        Reset
                    </button>
                    <button type="submit" className="button">
                        Calculate
                    </button>
                </p>
            </form>
        </div>
    )
}


export default InvestmentForm;