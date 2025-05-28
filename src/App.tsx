import './App.css'

function App() {

  const BluetoothEnable = async () => {
    try {
      const device = await navigator.bluetooth.requestDevice({
        // acceptAllDevices: true,
        filters: [
          {
            namePrefix: "Pixel"
          }
        ]
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
