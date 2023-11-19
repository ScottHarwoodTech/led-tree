import { Button, Paper } from "@mui/material"
import React, { useState } from "react"
import Interpreter from "js-interpreter";
import { Done, Clear } from "@mui/icons-material"

const creatInterp = (jsCode: string,
    lightControl: (i: number, state: boolean) => void,
    getLightState: (i: number) => boolean,
    wait: (d: number) => void
) => {
    return new Interpreter(jsCode, (int, global) => {
        const lightControlWrapper = (i: number, state: boolean) => {
            return lightControl(i, state)
        }

        int.setProperty(global, "lightControl",
            int.createNativeFunction(lightControlWrapper)
        )

        const getLightStateWrapper = (i: number) => {
            return getLightState(i)
        }

        int.setProperty(global, "lightState",
            int.createNativeFunction(getLightStateWrapper)
        )

        const waitWrapper = (d: number) => {
            return wait(d)
        }

        int.setProperty(global, 'wait', int.createNativeFunction(waitWrapper))
    })
}



export const DisplaySection: React.FC<{ jsCode: string }> = ({ jsCode }) => {
    const [lightState, setLightState] = useState(false)

    const lightControl = (i: number, state: boolean) => {
        console.log("setLightState", state)
        setLightState(state)
    }

    const getLightState = (i: number): boolean => {
        console.log("getlightstate", lightState)
        return lightState
    }

    const runInterpereter = () => {
        let nextStepDelay = 0;
        const wait = (d: number) => {
            nextStepDelay = d * 1000;
        }
        const interp = creatInterp(jsCode, lightControl, getLightState, wait)

        const nextStep = () => {
            if (interp.step()) {
                console.log(nextStepDelay)

                let temp = nextStepDelay
                nextStepDelay = 0;
                window.setTimeout(nextStep, temp);
            }
        }
        nextStep()
    }

    return <Paper style={{ height: "100%", textAlign: "center", padding: "15px" }} variant="outlined">
        <Button onClick={runInterpereter} variant="contained" >Run!</Button>
        {
            lightState ? <Done /> : <Clear />
        }
    </Paper>
}