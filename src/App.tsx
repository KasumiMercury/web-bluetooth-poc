import './App.css'

function App() {

  const BluetoothEnable = async () => {
    try {
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ['2c081c6d-61dd-4af8-ac2f-17f2ea5e5214']
        // filters: [
        //   {
        //     namePrefix: "Pixel"
        //   }
        // ]
      })
      console.log("selected device:", device);

      const server = await device.gatt?.connect();
      console.log("connected to server:", server);

      const services = await server?.getPrimaryServices();
      console.log("services:", services);

      if (services) {
        for (const service of services) {
          console.log("service:", service);
        }
      }

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
