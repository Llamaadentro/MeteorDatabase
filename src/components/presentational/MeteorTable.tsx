import 'antd/dist/antd.css';
import { Table, Tooltip } from 'antd';

import { IMeteorData } from '../../Utils';  
import { TableTextRow, TableNameRow } from '../StyledComponents';

const massUnits = (mass:number):string => mass ? mass > 1000 ? `${ Number(mass/1000).toFixed(2)} kg` : `${mass.toFixed(2)} g` : 'Unknown';
const coordinatesToString = (coordinates: {latitude:number, longitude:number}):string => {
    let north = coordinates.latitude > 0;
    let east = coordinates.longitude > 0;
    
    return `${((north ? 1 : -1) * coordinates.latitude).toFixed(6)}${north ? 'N' : 'S'}, 
            ${((east ? 1 : -1) * coordinates.longitude).toFixed(6)}${east ? 'E' : 'W'}`
}

export const MeteorTable = ({data}:{data: IMeteorData[]}) => {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (name:string) => <TableNameRow>{name}</TableNameRow>,
        },
        {
            title: 'Mass',
            dataIndex: 'mass',
            render: (mass:number) => <TableTextRow>{massUnits(mass)}</TableTextRow>
        },
        {
            title: 'Recommended Class',
            dataIndex: 'class',
            render: (recclass :string) => <TableTextRow>{recclass}</TableTextRow>
        },
        {
            title: 'Year',
            dataIndex: 'year',
            render: (year:number) => <TableTextRow>{Number.isNaN(year) ? 'Unknown' : year}</TableTextRow>
        },
        {
            title: 'Coordinates',
            dataIndex: 'coordinates',
            render: (coordinates: {latitude:number, longitude:number}) => coordinates ? 
                <Tooltip placement="topLeft" title='Click to view location on Google Maps'>
                    <a href={`http://google.com/maps/@${coordinates.latitude},${coordinates.longitude},7z`} 
                    target='_blanc' 
                    style={{margin: 0}}>
                    {coordinatesToString(coordinates)}
                    </a>
                </Tooltip> : 
                <TableTextRow>unknown</TableTextRow>
        }
  ];

  return <Table pagination={{ style:{marginTop:0},
                              hideOnSinglePage: true, 
                              pageSize:10, 
                              showSizeChanger:false, 
                              responsive: true, 
                              position: ['topRight']}} 
                columns={columns} 
                dataSource={data}/>;
}
