import React, { useState } from 'react';
import ProLayout, {
    PageHeaderWrapper,
    SettingDrawer,
} from '@ant-design/pro-layout';

import '@ant-design/pro-layout/lib/BasicLayout.less'

const MyLayout = () => {
    const [settings, setSetting] = useState({});
    return (
        <div
            id="test"
            style={{
                transform: 'rotate(0)',
                overflowX: 'hidden',
            }}
        >
            <ProLayout
                style={{
                    height: 800,
                }}
                location={{
                    pathname: '/welcome',
                }}
                {...settings}
            >
                <PageHeaderWrapper content="欢迎使用">
                    <div
                        style={{
                            height: '120vh',
                        }}
                    >
                        Hello World
                    </div>
                </PageHeaderWrapper>
            </ProLayout>
            <SettingDrawer
                getContainer={() => document.getElementById('test')}
                settings={settings}
                onSettingChange={setSetting}
            />
        </div>
    );
};

export default MyLayout;
