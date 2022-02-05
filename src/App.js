import './App.css';
import web3 from './web3';
import { useEffect, useState } from 'react';
import lottery from './lottery'

const App =  () => {
  const [manager, setManager ] = useState(undefined)



  useEffect(async () =>{
    let accounts
    try {
      accounts = await web3.eth.getAccounts()

      if(accounts)  {
        console.log('Accountive account', accounts[0])
        const manager = await lottery.methods.manager().call()
        setManager(manager)
      } 
    } catch (error) {
      Promise.reject('Unable to retrive accouns')
    }
  }, [])

  return (
    <div className="App">
      <h2>Lottery Contract</h2>
      <p>{`This contract is managed by ${manager}`}</p>
    </div>
  );
}

export default App;
