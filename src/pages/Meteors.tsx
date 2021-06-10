import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Tooltip } from 'antd';

import { IMeteorData, convertToIMeteorData, infoModal } from '../Utils';
import { MeteorTable } from '../components/presentational/MeteorTable';
import { WidePageWrapper, 
         QueryBar, 
         LabelText, 
         ButtonText, 
         SmallButtonText,
         BarInput, 
         FilterButton, 
         BottomPlank, 
         BarMenuButton} from '../components/StyledComponents';
import { Spinner } from '../components/UtilityComponents';

export const Meteors = () => {
    // data is the main storage to be filtered on presentational renders
    const [data, setData] = useState([] as IMeteorData[]);
    const [filter, setFilter] = useState({} as { year?: number, minMass?: number, showAll?: boolean });
    const [year, setYear] = useState("");
    const [minMass, setMinMass] = useState("");

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
    }, []); // executed once
   
    const parseMassToGrams = (mass:string) => {
        // mass of 0 is equivalent to mass filter not being applied
        if (!mass) return undefined;

        // parse mass query with possible unit suffix to numeric value in grams
        const parsedMass = mass.match(/\d/g);
        const cleanMassInput = (parsedMass ? parseInt(parsedMass.join('')) : +Infinity); // If input is invalid, no entry will match
        // return value in grams to search through data
        return cleanMassInput * (mass.toLowerCase().includes('kg') ? 1000 : mass.toLowerCase().includes('mg') ? 0.001 : 1);
    };
    
    // find the first occurence of a meteor with requested mass if in the chosen year there are none
    const getValidYearOfMassPresense = (year:number, mass?:number) => {
        if (Number.isNaN(year)) {
            // if no year filter is applied
            return undefined; 
        } else if (!mass || data.find((meteor: IMeteorData) => meteor?.year === year && Number(meteor.mass) > mass)) {
            // if either no mass filter is applied or at least one meteor with specified mass was found in chosen year
            return year; 
        } else {
            // first alphabetic occurence of a meteor with specified mass
            return data[data.findIndex((meteor: IMeteorData) => Number(meteor.mass) > mass && !Number.isNaN(meteor.year))]?.year; 
        }
    };

    const handleFilterUpdate = (event?:React.KeyboardEvent) => {
        //first condition goes for the case of "Filter" button click
        if (!event || event.key === 'Enter') {
            const validYear = getValidYearOfMassPresense(parseInt(year), parseMassToGrams(minMass));
            
            if (validYear !== undefined && validYear !== parseInt(year)) {
                infoModal(validYear);
                setYear(`${validYear}`);
            }                                    
            setFilter({ year: validYear, minMass: parseMassToGrams(minMass) })
        }    
     };

    const clearFilters = (showAll?:boolean) => {
        setYear(""); 
        setMinMass("");
        setFilter({showAll});
    } 

    const renderFilter = (meteor: IMeteorData) => (filter.year || filter.minMass) && 
        (filter.year ? meteor.year === filter.year : true) && 
        (filter.minMass ? Number(meteor.mass) > filter.minMass : true); 

    return <WidePageWrapper>
        <Spinner loading={!data.length}>
            <QueryBar>
                <LabelText>Year : </LabelText>
                <Tooltip placement="bottomLeft" 
                         title='Enter a year'>
                    <BarInput type='number'
                              width='80px'
                              value={year}
                              onChange={(e: any) => { setYear(e.target.value) }}
                              onKeyDown={handleFilterUpdate} />
                </Tooltip>

                <LabelText>{`${"Mass > "}`}</LabelText>
                <Tooltip placement="bottomLeft" 
                         title='Enter a treshold mass, suffix ( mg / g / kg ) is optional. Value must be a whole number'>
                    <BarInput type='text' 
                              width='160px'
                              value={minMass}
                              onChange={(e: any) => { setMinMass(e.target.value) }}
                              onKeyDown={handleFilterUpdate} />
                </Tooltip>          
                
                <FilterButton onClick={() => handleFilterUpdate()}>
                    <ButtonText>Filter</ButtonText>
                </FilterButton>
                
                <BottomPlank>
                    <BarMenuButton side="left" onClick={() => clearFilters(true)}>
                    <SmallButtonText>Show All</SmallButtonText>
                    </BarMenuButton>
                    <BarMenuButton side="right" onClick={() => clearFilters(false)}>
                    <SmallButtonText>Clear</SmallButtonText>
                    </BarMenuButton>
                </BottomPlank>
            </QueryBar>

            <MeteorTable data={filter.showAll ? data : data.filter(renderFilter)} />
        </Spinner>
    </WidePageWrapper>;
}
