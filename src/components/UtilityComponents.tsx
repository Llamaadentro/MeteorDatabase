import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { HeaderBar } from './StyledComponents';

type SpinnerProps = {
    loading: boolean,
}

export const Spinner: React.FC<SpinnerProps> = ({ loading, children }) => {
    return <Spin
        spinning={loading}
        indicator={<LoadingOutlined style={{ fontSize: 24, marginTop:'20vh' }} spin />}
    >
        {!loading && [children]}
    </Spin>;
}

export const AppHeader: React.FC = () => {
    return <HeaderBar>
        <h1 style={{ marginBottom: '5px', marginTop: '5px', color: '#ffcc00' }}>NASA meteor landing statistics</h1>
    </HeaderBar>
}