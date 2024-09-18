import React, {useState} from 'react';
import axios from 'axios'
//import { distanceUnits, timeIntervalUnits } from '../../unitOptions';
import FieldError from '../../components/FieldError/FieldError';
import FieldSection from '../../components/FieldSection/FieldSection';
import { logValue } from '../../logger';
import { MathJax } from "better-react-mathjax";
import Select from 'react-select'


const AverageSpeedPage = () =>{

    const distanceUnits = [
        { value: 'picometer', label: 'pm' },
        { value: 'nanometer', label: 'nm' },
        { value: 'micrometer', label: 'μm' },
        { value: 'millimeter', label: 'mm' },
        { value: 'centimeter', label: 'cm' },
        { value: 'decimeter', label: 'dm' },
        { value: 'meter', label: 'm' },
        { value: 'decameter', label: 'dam' },
        { value: 'hectometer', label: 'hm' },
        { value: 'kilometer', label: 'km' },
        { value: 'megameter', label: 'Mm' },
        { value: 'gigameter', label: 'Gm' },
        { value: 'terameter', label: 'Tm' },
        { value: 'inch', label: 'in' },
        { value: 'foot', label: 'ft' },
        { value: 'yard', label: 'yd' },
        { value: 'mile', label: 'mi' }
    ];
    
    const timeIntervalUnits = [
        { value: 'picosecond', label: 'pm' },
        { value: 'nanosecond', label: 'nm' },
        { value: 'microsecond', label: 'μm' },
        { value: 'millisecond', label: 'mm' },
        { value: 'centisecond', label: 'cm' },
        { value: 'decisecond', label: 'dm' },
        { value: 'second', label: 'm' },
        { value: 'minute', label: 'min' },
        { value: 'hour', label: 'hr' },
        { value: 'year', label: 'yr'}
    ];



    const [averageSpeed, setAverageSpeed] = useState('')
    const [averageSpeedError, setAverageSpeedError] = useState('')
    const [averageSpeedDistanceUnit, setAverageSpeedDistanceUnit] = useState(distanceUnits[0].value)
    const [averageSpeedTimeIntervalUnit, setAverageSpeedTimeIntervalUnit] = useState(timeIntervalUnits[0].value)
    const [timeInterval, setTimeInterval] = useState('')
    const [timeIntervalUnit, setTimeIntervalUnit] = useState(timeIntervalUnits[0].value)
    const [timeIntervalError, setTimeIntervalError] = useState('')
    const [distance, setDistance] = useState('')
    const [distanceUnit, setDistanceUnit] = useState(distanceUnits[0].value)
    const [distanceError, setDistanceError] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [nonFieldErrors, setNonFieldErrors] = useState('');


    let url = 'http://localhost:8000/calculate_average_speed/'

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                distance: distance,
                distance_unit: distanceUnit,
                distance_error: distanceError,
                average_speed: averageSpeed,
                average_speed_distance_unit: averageSpeedDistanceUnit,
                average_speed_time_interval_unit: averageSpeedTimeIntervalUnit,
                average_speed_error: averageSpeedError,
                time_interval: timeInterval,
                time_interval_unit: timeIntervalUnit,
                time_interval_error: timeIntervalError,
                non_field_errors: nonFieldErrors
            }

            console.log("---------Data Sent----------", data);

            const response = await axios.post(url, JSON.stringify(data), 
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log("-----------response--------------\n")
            console.log("average speed: " + response.data.averageSpeed)
            console.log("average speed error: " + response.data.averageSpeedError)
            console.log("average speed units: " + response.data.averageSpeedDistanceUnit + "/" + response.data.averageSpeedTimeIntervalUnit)
            console.log("time interval: " + response.data.timeInterval)
            console.log("time interval unit: " + response.data.timeIntervalUnit)
            console.log("time interval error: " + response.data.timeIntervalError)
            console.log("distance: " + response.data.distance)
            console.log("distance unit: " + response.data.distanceUnit)
            console.log("distance error: " + response.data.distanceError)
            console.log("non field errors : " + response.data.nonFieldErrors)
            console.log("-------------------------------")

            if (response.data.averageSpeed != null) {
                setAverageSpeed(`${response.data.averageSpeed}`);
            }

            setAverageSpeedError(`${response.data.averageSpeedError}`)

            if (response.data.timeInterval != null) {
                setTimeInterval(`${response.data.timeInterval}`);
            } 

            setTimeIntervalError(`${response.data.timeIntervalError}`);

            if (response.data.distance != null) {
                setDistance(`${response.data.distance}`);
            }

            setDistanceError(`${response.data.distanceError}`);
            setNonFieldErrors(`${response.data.nonFieldErrors}`);

        } catch (error) {
            console.error(error)
        }
    };
    
    return (
        <div>
            <h1> Average Speed <MathJax>{"\\(Spd_{Avg} = \\frac{d}{t}\\)"}</MathJax></h1>
            <form onSubmit={handleSubmit}>
                
                <FieldSection 
                    name={"Distance"}
                    val={distance} 
                    setValue={setDistance} 
                    placeholder={"Distance"} 
                    units={distanceUnits} 
                    setUnits={setDistanceUnit}>
                </FieldSection>
                {distanceError && <p style={{color: 'red' }}>{distanceError}</p>}

                <br/>

                <FieldSection 
                    name={"Time Interval"}
                    val={timeInterval} 
                    setValue={setTimeInterval} 
                    placeholder={"Time Interval"} 
                    units={timeIntervalUnits} 
                    setUnits={setTimeIntervalUnit}>
                </FieldSection>
                {timeIntervalError && <p style={{color: 'red' }}>{timeIntervalError}</p>}
                
                <br/>

                <div className='FieldSection'>
                    <text className='FieldName'>Average Speed:</text>
                    <input type="text" 
                        value={ averageSpeed } 
                        onChange={(e)=>{setAverageSpeed(e.target.value)}} 
                        placeholder="Average speed"
                    />
                    
                    <div className = 'Units'>
                        <Select 
                            defaultValue={distanceUnits[0]} 
                            options={distanceUnits}
                            onChange={(selectedOption) => {
                                if (selectedOption) {
                                    setAverageSpeedDistanceUnit(selectedOption.value);
                                }
                            }}
                        />
                        <text>/</text>
                        <Select 
                            defaultValue={timeIntervalUnits[0]} 
                            options={timeIntervalUnits}
                            onChange={(selectedOption) => {
                                if (selectedOption) {
                                    setAverageSpeedTimeIntervalUnit(selectedOption.value);
                                }
                            }}
                        />
                    </div>
                </div>
                {averageSpeedError && <p style={{color: 'red' }}>{averageSpeedError}</p>}

                <br/>

                <button type="submit">Calculate</button>
            </form>

            {nonFieldErrors && <p style={{color: 'red' }}>{nonFieldErrors}</p>}
        </div>
    );
}

export default AverageSpeedPage;
