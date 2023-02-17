import { useRef, useState } from 'react'
import { NewComponent } from './lapComponentStopwatch';

const StopWatch = () =>{
    const [milliSec, setMilliSec] = useState(0);
    const [sec, setSec] = useState(0);
    const [min, setMin] = useState(0);
    const [hour, setHour] = useState(0);
    const [component, setComponent] = useState([]);

    const intervalMilliSec = useRef();
    const intervalSec = useRef();
    const intervalMin = useRef();
    const intervalHour = useRef();

    const startClock = () => {
        intervalMilliSec.current = setInterval(()=>{
            setMilliSec((prevValue) => {
                (prevValue>=99) ? prevValue = 0:  prevValue++;
                return prevValue;
            });
        }, 1);

        intervalSec.current = setInterval(()=>{
            setSec((prevValue) => {
                (prevValue>=59) ? prevValue = 0:  prevValue++;
                return prevValue;
            });
        }, 1000);

        intervalMin.current = setInterval(() => {
            setMin((prevValue) => {
                (prevValue>59) ? prevValue = 0 : prevValue++;
                return prevValue;
            })
        }, 60000);

        intervalHour.current = setInterval(() => {
            setHour((prevValue) => {
                (prevValue > 23) ? prevValue = 0 : prevValue++;
                return prevValue;
            })
        }, 1440000);
    }

    const stopClock = () => {
        clearInterval(intervalMilliSec.current);
        clearInterval(intervalSec.current);
        clearInterval(intervalMin.current);
        clearInterval(intervalHour.current);
    }

    const resetClock = () => {
        clearInterval(intervalMilliSec.current);
        clearInterval(intervalSec.current);
        clearInterval(intervalMin.current);
        clearInterval(intervalHour.current);
        setHour(0);
        setMin(0);
        setSec(0);
        setMilliSec(0);
        setComponent([]);
    }

    const noteLap = () => {
        let obj = {milliSec, sec, min, hour};
        setComponent([...component, obj]); 
    }

    return(
        <div className="stopWatch">
            <h1>StopWatch</h1>
            <div className="watch">
                <div className="time hour">{ milliSec }</div>
                <div className="colon"><strong>:</strong></div>
                <div className="time min">{ sec }</div>
                <div className="colon"><strong>:</strong></div>
                <div className="time sec">{ min }</div>
                <div className="colon"><strong>:</strong></div>
                <div className="time mil-sec">{ hour }</div>
            </div>
            <div className="buttons">
                <button onClick={ startClock }>Start</button>
                <button onClick={ noteLap }>Lap</button>
                <button onClick={ stopClock }>Stop</button>
                <button onClick={ resetClock }>Reset</button>
            </div>
            {
                component.map((item, i) => {
                    return (
                        <NewComponent key={i} text={i+1} hour={ item.hour } min={ item.min } sec={ item.sec } milliSec={ item.milliSec }></NewComponent>
                    )
                })
            }
        </div>
    )
}

export default StopWatch;


/*function pad2(number) {
            return (number < 10 ? '0' : '') + number
         } */