import { Modal } from 'antd';

export interface IMeteorData {
    key: number,
    name: string,
    mass?: number,
    year?: number,
    class: string,
    coordinates?: {
        latitude: number,
        longitude: number,
    }
};

export const convertToIMeteorData = (entry: any): IMeteorData => {
    return {
        key: entry.id,
        name: entry.name,
        mass: Number(entry?.mass),
        year: new Date(Date.parse(entry.year)).getFullYear(),
        class: entry.recclass,
        coordinates: entry.geolocation ? {
            latitude: parseFloat(entry.reclat),
            longitude: parseFloat(entry.reclong),
        } : undefined
    }
};

export const infoModal = (year:number) => {
    Modal.info({
      title: (<b>No entry matching the criteria was found.</b>),
      okButtonProps: {type: 'default', style:{backgroundColor:'#ffcc00', border: '1px solid #ffcc00', color: 'black'}},
      width: 500,
      content: (
        <div>
            <h3>Time filter was shifted to match the first entry with specified mass(year <strong>{year}</strong>).</h3>
        </div>
      ),
      onOk() {},
    });
  }