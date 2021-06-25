import React, { useState, useEffect } from 'react';
import './style.css';
import { useHistory, Route } from 'react-router-dom';

const countryNames = ['Australia', 'India'];
const countryObj = countryNames.map((country, i) => ({
  id: i,
  countryVal: country
}));

export default function App(props) {
  const [currentView, updateView] = useState({
    view: 'view1',
    firstBracket: '$0 - $18,200',
    t1: 0,
    secondBracket: '$18,201 - $45,000',
    t2: 5092,
    thirdBracket: '$45,001 - $120,000',
    t3: 29467,
    fourthBracket: '$120,001 - $ 180,000',
    t4: 51667,
    fifthBracket: '$180,001 and over',
    t5: 0,
    tax: 0,
    year: '2020-2021',
    country: 'Australia',
    Income: null
  });
  return (
    <>
      {currentView.view === 'view1' ? (
        <View1 changeview={updateView} />
      ) : (
        <View2 view={currentView} changeview={updateView} />
      )}
    </>
  );
}

function View1(props) {
  const countryNames = ['Australia', 'India'];
  const countryObj = countryNames.map((country, i) => ({
    id: i,
    countryVal: country
  }));
  const [countryName, updateCountry] = useState({ taxCountry: 'Australia' });
  const financialYear = ['2020-2021', '2019-2020'];
  const yearObj = financialYear.map((year, i) => ({
    id: i,
    yearVal: year
  }));

  const [selectedYear, updateYear] = useState({ year: '2020-2021' });
  const [amount, updateAmount] = useState(null);
  const handleSubmit = e => {
    var t1 = 0,
      t2 = 0,
      t3 = 0,
      t4 = 0,
      t5 = 0,
      tax = 0;
    var Bracket1 = 0,
      Bracket2 = 0,
      Bracket3 = 0,
      Bracket4 = 0,
      Bracket5 = 0;
    const TaxableIncome = Number(amount).toFixed(2);
    if (isNaN(TaxableIncome) || TaxableIncome == 0) {
      alert('Please Enter Valid Income');
      e.preventDefault();
    } else {
      if (countryName.taxCountry == 'Australia') {
        switch (selectedYear.year) {
          case '2019-2020':
            if (TaxableIncome <= 18200) {
              tax = t1 = 0;
            } else if (TaxableIncome <= 37000) {
              tax = t2 = 0.19 * (TaxableIncome - 18200);
            } else if (TaxableIncome <= 90000) {
              t2 = 3572;
              tax = t3 = t2 + 0.325 * (TaxableIncome - 37000);
            } else if (TaxableIncome <= 180000) {
              t2 = 3572;
              t3 = 20797 - t2;
              tax = t4 + 0.37 * (TaxableIncome - 90000);
              t5 = 0;
            } else {
              t2 = 3572;
              t3 = 20797 - t2;
              t4 = 54097 - t2 - t3;
              tax = t5 = 54097 + 0.45 * (TaxableIncome - 180000);
            }
            Bracket1 = '$0 - $ 18,200';
            Bracket2 = '$18,201 - $37,000';
            Bracket3 = '$37,001 - $90,000';
            Bracket4 = '$90,001 - $180,000';
            Bracket5 = '$180,001 and over';
            break;
          case '2020-2021':
            if (TaxableIncome <= 18200) {
              tax = t1 = 0;
            } else if (TaxableIncome <= 45000) {
              tax = t2 = 0.19 * (TaxableIncome - 18200);
            } else if (TaxableIncome <= 120000) {
              t2 = 5092;
              tax = t3 = t2 + 0.325 * (TaxableIncome - 45000);
            } else if (TaxableIncome <= 180000) {
              t2 = 5092;
              t3 = 29467 - t2;
              tax = t2 + t3 + 0.37 * (TaxableIncome - 120000);
            } else {
              t2 = 5092;
              t3 = 29467 - t2;
              t4 = 51667 - t2 - t3;
              tax = t5 = 51667 + 0.45 * (TaxableIncome - 180000);
            }
            Bracket1 = '$0 - $ 18,200';
            Bracket2 = '$18,201 - $45,000';
            Bracket3 = '$45,001 - $120,000';
            Bracket4 = '$120,001 - $180,000';
            Bracket5 = '$180,001 and over';
            break;
          default:
            return 'foo';
        }
        props.changeview({
          view: 'view2',
          firstBracket: Bracket1,
          secondBracket: Bracket2,
          thirdBracket: Bracket3,
          fourthBracket: Bracket4,
          fifthBracket: Bracket5,
          t1: t1,
          t2: t2.toFixed(2),
          t3: t3.toFixed(2),
          t4: t4.toFixed(2),
          t5: t5.toFixed(2),
          tax: tax.toFixed(2),
          year: selectedYear.year,
          country: countryName.taxCountry,
          Income: TaxableIncome
        });
      }
    }
  };
  return (
    <div className="flex-container">
      <div className="flex-child;">
        <span className="heading">Tax-o-tron</span>
        <span className="sub-heading">
          The free and simple online tax calculator.
        </span>
        <img src="css/template.svg" alt="Fill up your Taxes on Time" />
      </div>
      <div className="flex-child">
        <span className="title-form">&nbsp;Calculate your tax</span>
        <img src="css/info-box.svg" />
        <form
          onSubmit={e => {
            handleSubmit(e);
          }}
        >
          <div className="selectCountry">
            Select your country of residence *
          </div>
          &nbsp;
          <div id="taxableCountry">
            <select
              id="country"
              name="select-one-country"
              onChange={e => updateCountry({ taxCountry: e.target.value })}
            >
              {countryObj.map(country => (
                <option key={country.id} value={country.countryVal}>
                  {country.countryVal}
                </option>
              ))}
            </select>
          </div>
          <div className="selectYear">Select your income year *</div>
          &nbsp;
          <select
            id="incomeYear"
            name="select-Year"
            className="selectYear"
            onChange={e => updateYear({ year: e.target.value })}
          >
            {yearObj.map(year => (
              <option key={year.id} value={year.yearVal}>
                {year.yearVal}
              </option>
            ))}
          </select>
          <div className="taxableincome">
            Enter your total taxable income for the income year *
          </div>
          <div className="currency-wrap">
            <span className="currency-code">$</span>
            <span className="currency-zero">.00</span>
            <input
              type="text"
              placeholder="Amount"
              className="myIncome"
              onChange={e => updateAmount(e.target.value)}
            />
          </div>
          <div style={{ color: 'red', fontSize: '10px' }}>
            <Error inc={amount} />
          </div>
          <button style={{ left: '5px' }} id="Calculate">
            Calculate
          </button>
        </form>
      </div>
    </div>
  );
}

function View2(props) {
  return (
    <div className="flex-container">
      <div className="flex-child">
        <span className="title-form">&nbsp;Your tax results</span> <br />
        <img src="css/info-box.svg" />
        <div className="selectCountry">Select your country of residence *</div>
        &nbsp;
        <div id="taxableCountry">
          <select id="country" disabled={true} name="select-one-country">
            <option value={props.view.country}>{props.view.country}</option>
          </select>
        </div>
        <div className="selectYear">Select your income year *</div>
        &nbsp;
        <select
          id="incomeYear"
          name="select-Year"
          className="selectYear"
          disabled={true}
        >
          <option value={props.view.year}>{props.view.year}</option>
        </select>
        <div className="taxableincome">
          Enter your total taxable income for the income year *
        </div>
        &nbsp;
        <div className="currency-wrap">
          <span className="currency-code1">$</span>
          <span className="currency-zero1">.00</span>
          <input
            type="text"
            className="myIncome"
            placeholder={props.view.Income}
            disabled={true}
            value={props.view.Income}
          />
        </div>
        <div>
          <a
            style={{
              position: 'relative',
              top: '50px'
            }}
            href=""
            id="Calculate"
            onClick={() => props.changeview({ view: 'view1' })}
          >
            Go Back to Previous Screen
          </a>
        </div>
      </div>
      <div className="flex-child;">
        <svg
          width="328"
          height="456"
          viewBox="0 0 328 456"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <mask
            id="mask0"
            mask-type="alpha"
            maskUnits="userSpaceOnUse"
            x="4"
            y="0"
            width="320"
            height="448"
          >
            <rect x="4" width="320" height="448" rx="5" fill="#8477C9" />
          </mask>
          <g mask="url(#mask0)">
            <g filter="url(#filter0_d)">
              <rect x="4" width="320" height="448" rx="5" fill="#8477C9" />
            </g>
            <ellipse
              cx="77.917"
              cy="395.24"
              rx="110"
              ry="101.818"
              fill="url(#paint0_linear)"
            />
            <g filter="url(#filter1_d)">
              <ellipse
                cx="165.424"
                cy="348.033"
                rx="18.0415"
                ry="17.5868"
                fill="#E7E7FF"
              />
            </g>
          </g>
          <defs>
            <filter
              id="filter0_d"
              x="0"
              y="0"
              width="328"
              height="456"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.906083 0 0 0 0 0.904167 0 0 0 0 1 0 0 0 1 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow"
                result="shape"
              />
            </filter>
            <filter
              id="filter1_d"
              x="134.383"
              y="330.446"
              width="49.0831"
              height="51.1736"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              />
              <feOffset dx="-10" dy="13" />
              <feGaussianBlur stdDeviation="1.5" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow"
                result="shape"
              />
            </filter>
            <linearGradient
              id="paint0_linear"
              x1="-39.0395"
              y1="369.886"
              x2="147.41"
              y2="474.231"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#E7E6FF" />
              <stop offset="1" stopColor="#E7E6FF" stopOpacity="0" />
            </linearGradient>
          </defs>
          <text x="15" y="40" fill="white" style={{ fontFamily: 'Lato' }}>
            Your estimated taxable income is:
          </text>
          <rect
            x="18"
            y="50"
            width="290"
            height="60"
            rx="5"
            fill="white"
            margin="auto"
          />
          <text
            x="50%"
            y="20%"
            fill="purple"
            style={{
              fontSize: '35px',
              textAlign: 'center',
              border: '2px solid black'
            }}
            textAnchor="middle"
          >
            ${props.view.tax}
          </text>
          <text x="18" y="30%" fill="white" style={{ fontFamily: 'Lato' }}>
            Breakdown
          </text>
          <rect x="18" y="32%" width="290" height="50" rx="5" fill="white" />
          <text
            x="22"
            y="37%"
            fill="black"
            style={{ fontFamily: 'Lato', fontSize: '12px' }}
          >
            Tax Bracket
          </text>
          <text
            x="22"
            y="40%"
            fill="black"
            style={{ fontFamily: 'Lato', fontSize: '12px' }}
          >
            {props.view.firstBracket}
          </text>
          <text
            x="92%"
            y="39%"
            width="290"
            fill="purple"
            style={{ fontFamily: 'Lato', fontSize: '20px', color: 'purple' }}
            textAnchor="end"
          >
            ${props.view.t1}
          </text>
          <rect x="18" y="45%" width="290" height="50" rx="5" fill="white" />
          <text
            x="22"
            y="50%"
            fill="black"
            style={{ fontFamily: 'Lato', fontSize: '12px' }}
          >
            Tax Bracket
          </text>
          <text
            x="22"
            y="53%"
            fill="black"
            style={{ fontFamily: 'Lato', fontSize: '12px' }}
          >
            {props.view.secondBracket}
          </text>
          <text
            x="92%"
            y="52%"
            width="290"
            fill="purple"
            style={{ fontFamily: 'Lato', fontSize: '20px', color: 'purple' }}
            textAnchor="end"
          >
            ${props.view.t2}
          </text>
          <rect x="18" y="58%" width="290" height="50" rx="5" fill="white" />
          <text
            x="22"
            y="63%"
            fill="black"
            style={{ fontFamily: 'Lato', fontSize: '12px' }}
          >
            Tax Bracket
          </text>
          <text
            x="22"
            y="66%"
            fill="black"
            style={{ fontFamily: 'Lato', fontSize: '12px' }}
          >
            {props.view.thirdBracket}
          </text>
          <text
            x="92%"
            y="65%"
            width="290"
            fill="purple"
            style={{ fontFamily: 'Lato', fontSize: '20px', color: 'purple' }}
            textAnchor="end"
          >
            ${props.view.t3}
          </text>
          <rect x="18" y="71%" width="290" height="50" rx="5" fill="white" />
          <text
            x="22"
            y="76%"
            fill="black"
            style={{ fontFamily: 'Lato', fontSize: '12px' }}
          >
            Tax Bracket
          </text>
          <text
            x="22"
            y="79%"
            fill="black"
            style={{ fontFamily: 'Lato', fontSize: '12px' }}
          >
            {props.view.fourthBracket}
          </text>
          <text
            x="92%"
            y="78%"
            width="290"
            fill="purple"
            style={{ fontFamily: 'Lato', fontSize: '20px', color: 'purple' }}
            textAnchor="end"
          >
            ${props.view.t4}
          </text>
          <rect x="18" y="84%" width="290" height="50" rx="5" fill="white" />
          <text
            x="22"
            y="89%"
            fill="black"
            style={{ fontFamily: 'Lato', fontSize: '12px' }}
          >
            Tax Bracket
          </text>
          <text
            x="22"
            y="92%"
            fill="black"
            style={{ fontFamily: 'Lato', fontSize: '12px' }}
          >
            {props.view.fifthBracket}
          </text>
          <text
            x="92%"
            y="91%"
            width="290"
            fill="purple"
            style={{ fontFamily: 'Lato', fontSize: '20px', color: 'purple' }}
            textAnchor="end"
          >
            ${props.view.t5}
          </text>
        </svg>
      </div>
    </div>
  );
}
function Error(props) {
  if (isNaN(Number(props.inc))) {
    return '*Please enter a valid amount';
  }
  return '';
}
