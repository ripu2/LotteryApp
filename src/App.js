import "./App.css"
import web3 from "./app/contract/web3"
import { useEffect, useState } from "react"
import lottery from "./app/contract/lottery"
import Navbar from "./Components/Nabar"
import { useDispatch } from "react-redux"
import {
  addContractBalance,
  addManager,
  addParticipants,
  fetchActiveAccount,
} from "./app/redux/globalState"
import { useSelector } from "react-redux"
import CircularProgress from "@mui/material/CircularProgress"
import { Button } from "@mui/material"

const App = () => {
  const [value, setValue] = useState("")
  const [sendingTrans, setSendingTrans] = useState(false)
  const [winner, setWinner] = useState(undefined)
  const [winnerLoading, setWinnerLoading] = useState(undefined)
  const dispatch = useDispatch()

  const globalState = useSelector((state) => state.global)

  useEffect(async () => {
    let accounts
    try {
      accounts = await web3.eth.getAccounts()
      if (accounts[0]) {
        dispatch(fetchActiveAccount(accounts[0]))
        const manager = await lottery.methods.manager().call()
        dispatch(addManager(manager))
      } else Promise.reject("Unable to retrive accouns")
    } catch (error) {
      Promise.reject("Unable to retrive accouns")
    }
  }, [])

  useEffect(async () => {
    try {
      const players = await lottery.methods.getAllParticipants().call()
      dispatch(addParticipants(players))
    } catch (error) {
      Promise.reject("Unable to retirve playes")
    }

    try {
      const balance = await web3.eth.getBalance(lottery.options.address)
      if (balance)
        dispatch(addContractBalance(web3.utils.fromWei(balance, "ether")))
      else throw new Error()
    } catch (error) {
      Promise.reject("Unable to retirve Balance")
    }
  }, [globalState.managerAccount])

  const handleSubmit = async (event) => {
    setSendingTrans(true)
    event.preventDefault()
    try {
      const res = await lottery.methods.enterLottery().send({
        from: globalState.activeAccount,
        value: web3.utils.toWei(value, "ether"),
      })
      if (!res) throw new Error()
      else {
        setSendingTrans(false)
        window.alert("Succesfully Entered lottery !!")
      }
    } catch (error) {
      setSendingTrans(false)
      Promise.reject("Unable to enter lottery")
    }
  }

  const pickWinner = async () => {
    setWinnerLoading(true)
    try {
      const res = await lottery.methods.pickWinner().send({
        from: globalState.activeAccount,
      })
      if (!res) throw new Error()
      else {
        setWinnerLoading(false)
        setWinner(res)
      }
    } catch (error) {
      setWinnerLoading(true)
      Promise.reject("Unable to pick winner ")
    }
  }

  return (
    <div className="App">
      <Navbar />
      <h2>Lottery Contract</h2>
      <p>{`This contract is managed by ${globalState.managerAccount}`}</p>
      <p>{`There are currently ${globalState.players.length} people competiing for ${globalState.contractBalance}`}</p>
      <hr />
      <form onSubmit={handleSubmit}>
        <h4>Wanna try your luck?</h4>
        <label>Amount of ehter to enter</label>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={{ marginLeft: "1em" }}
        />
      </form>
      {sendingTrans ? (
        <CircularProgress color="success" />
      ) : (
        <Button
          variant="outlined"
          style={{ marginTop: "1em", textDecoration: "none" }}
          onClick={handleSubmit}
        >
          Enter
        </Button>
      )}
      <hr />
      {winnerLoading ? (
        <CircularProgress color="success" />
      ) : (
        <>
          <p>Pick a winner</p>
          <Button
            variant="outlined"
            style={{ marginTop: "1em", textDecoration: "none" }}
            onClick={pickWinner}
          >
            Pick a Winner !!!
          </Button>
        </>
      )}
      {winner && <p>has won yayy!!</p>}
    </div>
  )
}

export default App
