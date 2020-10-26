import React from 'react';

export default function CurrencyInfo(props) {
    const {
        currency,
        onChangeCurrency,
        selected,
    } = props;

    return (
        <div className="input-group mb-3">
            <div className="dropdown-menu">
                <select className="dropdown-item" value={selected} onChage={onChangeCurrency} >
                    {currency.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            </div>
        </div>
    )
}
