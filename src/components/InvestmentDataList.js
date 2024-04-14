
import './InvestmentDataList.css'

const InvestmentDataList = ({investmentData}) => {

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });


    return (
        <div>
            {investmentData && investmentData.length > 0 ? <table className="result">
                <thead>
                <tr>
                    <th>Year</th>
                    <th>Total Savings</th>
                    <th>Interest (Year)</th>
                    <th>Total Interest</th>
                    <th>Invested Capital</th>
                </tr>
                </thead>

                {investmentData.map(data =>
                    (
                        <tbody key={data.year}>
                        <tr >
                            <td>{data.year}</td>
                            <td>{formatter.format(data.savingsEndOfYear)}</td>
                            <td>{formatter.format(data.yearlyInterest)}</td>
                            <td>{formatter.format(data.cumulativeInterest)}</td>
                            <td>{formatter.format(data.savingsEndOfYear - data.cumulativeInterest)}</td>
                        </tr>
                        </tbody>
                    )
                )}

            </table> : <p className="header">No data to show</p>}
        </div>
    )

}

export default InvestmentDataList;