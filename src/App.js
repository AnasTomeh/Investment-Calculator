import { useState} from "react";
import InvestmentForm from "./components/InvestmentForm";
import InvestmentDataList from "./components/InvestmentDataList";
import Header from "./components/Header";

function App() {

 const [investmentData , setInvestmentData] = useState([])

    const saveInvestmentDataHandler = (enteredInvestmentData) => {
        setInvestmentData(enteredInvestmentData)
    }

  return (
    <div>

        <Header />
        <InvestmentForm onSaveInvestmentData={saveInvestmentDataHandler} />
        <InvestmentDataList investmentData={investmentData} />

    </div>
  );
}

export default App;
