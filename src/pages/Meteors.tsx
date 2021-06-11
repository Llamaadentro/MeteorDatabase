import { useEffect, useState } from 'react';
import axios from 'axios';

import { IMeteorData, convertToIMeteorData } from '../Utils';
import { WidePageWrapper } from '../components/StyledComponents';
import { Spinner } from '../components/UtilityComponents';
import { MeteorFilterHandler } from '../components/MeteorFilterHandler';

export const Meteors = () => {
    // data is the main storage to be filtered on presentational renders
    const [data, setData] = useState([] as IMeteorData[]);
    
    // saving the fetched dataset for building all filtered subsets use until next refresh
    useEffect(() => {
        (async () => {
            const response = await axios('https://data.nasa.gov/resource/y77d-th95.json');
            const parsedData: IMeteorData[] = [];
            // converting each JSON object according to IMeteorData interface typing
            response.data.forEach((entry: any) => {
                parsedData.push(convertToIMeteorData(entry));
            });

            setData(parsedData);
        })();
    }, []); // executed once, further can be refreshed
    
    return <WidePageWrapper>
        <Spinner loading={!data.length}>
            <MeteorFilterHandler data={data} />
        </Spinner>
    </WidePageWrapper>;
}
