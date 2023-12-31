import React from 'react';
import './App.css';

type FeeClassification = {
  name: string;
  description: string;
  unitPrice: number;
  numOfPeople: number;
  totalPrice: number;
}

type AdmissionFeeCalculatorState = {
  feeClasifications: FeeClassification[];
}

type DetailProps = {
  classification: FeeClassification;
  onNumOfPeopleChanged: (num: number) => void;
}

type SummaryProps = {
  numOfPeople: number;
  totalAmount: number;
}

const Detail: React.FC<DetailProps> = props => {
  const onNumOfPeopleChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const num: number = Number(e.target.value);
    props.onNumOfPeopleChanged(num);
  } 

  return (
    <div >
      <div className="classification-name">{props.classification.name}</div>
      <div className="description">{props.classification.description}</div>
      <div className="unit-price">{props.classification.unitPrice}</div>
      <div className="num-people">
        <select value={props.classification.numOfPeople} onChange={e => onNumOfPeopleChanged(e)}>
          <option value="0">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <span>名</span>
      </div>
    </div>
  );
}

const Summary: React.FC<SummaryProps> = props => {
  return (
    <div>
      <div className="party">
        <input type="text" className="party" value={props.numOfPeople} />
        <span>名様BBB</span>
      </div>
      <div className="total-amount">
        <span>合計</span>
        <input type="text" className="total-amount" value={props.totalAmount} />
        <span>円</span>
      </div>
    </div>
  );
}

class AdmissionFeeCalculator extends React.Component<{}, AdmissionFeeCalculatorState> {
  constructor(props: {}) {
    super(props);
    const adults: FeeClassification = {
      name: "大人",
      description: "",
      unitPrice: 1000,
      numOfPeople: 0,
      totalPrice: 0,
    };
    const students: FeeClassification = {
      name: "学生",
      description: "中学生・高校生",
      unitPrice: 700,
      numOfPeople: 0,
      totalPrice: 0,
    };
    const children: FeeClassification = {
      name: "子ども",
      description: "小学生",
      unitPrice: 300,
      numOfPeople: 0,
      totalPrice: 0,
    };
    const infants: FeeClassification = {
      name: "幼児",
      description: "未就学",
      unitPrice: 0,
      numOfPeople: 0,
      totalPrice: 0,
    };
    this.state = { feeClasifications: [adults, students, children, infants]}
  }

  handleNumOfPeopleChanged(idx: number, num: number) : void {
    const currentFC = this.state.feeClasifications[idx];
    const newTotalPrice = currentFC.unitPrice * num;
    const newFC: FeeClassification = 
      Object.assign({}, currentFC, {numOfPeople: num, totalPrice: newTotalPrice});
    const feeClassifications = this.state.feeClasifications.slice();
    feeClassifications[idx] = newFC;

    this.setState({
      feeClasifications: feeClassifications,
    })
  }

  render() {
    const details = this.state.feeClasifications.map((fc, idx) => {
      return (
        <Detail key={idx.toString()} classification={fc} onNumOfPeopleChanged={n => this.handleNumOfPeopleChanged(idx, n)} />
      );
    });

    const numOfPeople = this.state.feeClasifications.map((fc) => fc.numOfPeople).reduce((p, c) => p + c);
    const toatlAmount = this.state.feeClasifications.map((fc) => fc.totalPrice).reduce((p, c) => p + c);
    return (
      <>
        {details}
        <Summary numOfPeople={numOfPeople} totalAmount={toatlAmount} />
      </>
    );
  }
}

const App: React.FC = () => {
  return (
    <div className="main">
      <AdmissionFeeCalculator />
    </div>
  );
}

export default App;