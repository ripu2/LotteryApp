import './App.css';
import web3 from './app/contract/web3';
import { useEffect, useState } from 'react';
import lottery from './app/contract/lottery'
import Navbar from './Components/Nabar';
import { useDispatch } from 'react-redux';
import { addManager, fetchActiveAccount } from './app/redux/globalState';
import { useSelector } from 'react-redux';

const App =  () => {
  const [manager, setManager ] = useState(undefined)
  const dispatch = useDispatch()

  const globalState = useSelector((state) => state.global)


  useEffect(async () =>{
    let accounts
    try {
      accounts = await web3.eth.getAccounts()
      if(accounts)  {
        dispatch(fetchActiveAccount(accounts[0]))
        console.log('Accountive account',globalState.activeAccount )
        const manager = await lottery.methods.manager().call()
        dispatch(addManager(manager))
      } 
    } catch (error) {
      Promise.reject('Unable to retrive accouns')
    }
  }, [])

  return (
    <div className="App">
      <Navbar />
      <h2>Lottery Contract</h2>
      <p>{`This contract is managed by ${globalState.managerAccount}`}</p>
    </div>
  );
}

export default App;
