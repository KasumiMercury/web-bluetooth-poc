import './App.css'
import {useRef, useState} from "react";

function App() {
  const companyIdInputRef = useRef<HTMLInputElement>(null);
  const [warning, setWarning] = useState<string>("");

  const BluetoothEnable = async () => {
    if (companyIdInputRef.current === null) {
        console.error("companyIdInputRef is null");
        return;
    }

    if (!companyIdInputRef.current.checkValidity()){
      setWarning("Company ID must be a valid hex value");
      return;
    }

    setWarning("");

    let companyIdInput = companyIdInputRef.current.value;
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
                    ref={companyIdInputRef}
          />
        </div>
        {
            warning && <p className={"error"}>{warning}</p>
        }
        <button type={"button"} onClick={BluetoothEnable}>
          BL-enable
        </button>
      </div>
  )
}

export default App
