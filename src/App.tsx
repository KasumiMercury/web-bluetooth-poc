import './App.css'

function App() {

  const BluetoothEnable = async () => {
    try {
      // @ts-ignore
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
      })
      console.log("selected device:", device);
    } catch (error) {
      console.log(error);
    }
  }

  return (
      <>
        <button type={"button"} onClick={BluetoothEnable}>
          BL-enable
        </button>
      </>
  )
}

export default App
