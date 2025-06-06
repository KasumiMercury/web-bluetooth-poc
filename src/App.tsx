import './App.css'
import {useState} from "react";

function App() {
  const [companyIdInputState, setCompanyIdInputState] = useState<string>("0xffff");

  const BluetoothEnable = async () => {
    let companyIdInput = companyIdInputState;
    if (!companyIdInput.startsWith("0x")) {
        companyIdInput = `0x${companyIdInput}`;
    }

    const companyId = Number.parseInt(companyIdInput, 16);
    console.log(companyId);

    try {
      const device = await navigator.bluetooth.requestDevice({
        // acceptAllDevices: true,
        filters: [
          {
            // namePrefix: "Pixel"
            manufacturerData: [{
              companyIdentifier: companyId,
            }]
          }
        ]
      })
      console.log("selected device:", device);
    } catch (error) {
      console.log(error);
    }
  }

  return (
      <div id={"panel"}>
        <div id={"company-id-field"}>
          <label htmlFor={"company-id"}>Company ID</label>
          <input type={"text"} id={"company-id"} placeholder={"Company ID"} pattern={"(0x)?[0-9a-fA-F]{1,4}"}
                 value={companyIdInputState}
                 onChange={(e) => setCompanyIdInputState(e.target.value)}
          />

        </div>
        <button type={"button"} onClick={BluetoothEnable}>
          BL-enable
        </button>
      </div>
  )
}

export default App
