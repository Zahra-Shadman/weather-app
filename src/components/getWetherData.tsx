import React, { useState } from "react";


const GetWeatherData : React.FC = () =>
{
const [city, setCity] = useState<string>('Tehran');
return(
    <div>
        hi geter
    </div>
)
}

export default GetWeatherData;