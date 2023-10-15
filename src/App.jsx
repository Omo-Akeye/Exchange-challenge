import { useEffect, useState } from 'react'
import './index.css'

function App() {
  const [amount,setAmount] = useState('100')
  const [rate,setRate] = useState('EUR')
  const [rate1,setRate1] = useState('USD')
  const [exchange,setExchange] = useState('')
  const [isLoading,setIsloading] = useState(false)
  useEffect(function () {
   async function getExchange() {
    try {
      setIsloading(true)
      const res = await fetch (`https://api.frankfurter.app/latest?amount=${amount}&from=${rate}&to=${rate1}`)
      const data = await res.json()
      setExchange(data.rates[rate1]);
      setIsloading(false)
    } catch (error) {
     console.log('error'); 
    }
   }
   if (rate === rate1) return setExchange(amount)
   getExchange()
  },[amount,rate,rate1])
  

  return (
<div>
     <input type="text" value={amount} onChange={(e)=>setAmount(Number(e.target.value))} disabled={isLoading}/>
      <select value={rate} onChange={(e)=> setRate(e.target.value)} disabled={isLoading} >  
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={rate1} onChange={(e)=> setRate1(e.target.value)} disabled={isLoading}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>OUTPUT: {exchange}{rate1}</p>
</div>
  )
}

export default App
