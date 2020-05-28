import React from 'react'
import Faq from "react-faq-component";

import './MyFaq.css';
import {Card} from "antd";

const data = {
    title: <div id={'l'} className={"skata"}>
        <span>F</span>
        <span className="visual">requently&nbsp;</span>
        <span>A</span>
        <span className="merchandising">sked&nbsp;</span>
        <span>Q</span>
        <span className="merchandising">uestions</span>
    </div>,
    rows: [
        {
            title: "What is this site?",
            content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tempor sem. Aenean vel turpis feugiat, 
              ultricies metus at, consequat velit. Curabitur est nibh, varius in tellus nec, mattis pulvinar metus. 
              In maximus cursus lorem, nec laoreet velit eleifend vel. Ut aliquet mauris tortor, sed egestas libero interdum vitae. 
              Fusce sed commodo purus, at tempus turpis.`,
        },
        {
            title: "Why sharing?",
            content:
                "Nunc maximus, magna at ultricies elementum, risus turpis vulputate quam, vitae convallis ex tortor sed dolor.",
        },
        {
            title: "Site information",
            content: `Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc, ac sagittis leo elit vel lorem. 
            Fusce tempor lacus ut libero posuere viverra. Nunc velit dolor, tincidunt at varius vel, laoreet vel quam. 
            Sed dolor urna, lobortis in arcu auctor, tincidunt mattis ante. Vivamus venenatis ultricies nibh in volutpat. 
            Cras eu metus quis leo vestibulum feugiat nec sagittis lacus.Mauris vulputate arcu sed massa euismod dignissim. `,
        },
        {
            title: "What is the site version",
            content: "v1.0.0",
        },
    ],
};

const styles = {
    // bgColor: 'gray',
    titleTextColor: "#001529",
    rowTitleColor: "#001529",
    rowContentColor: 'grey',
    // arrowColor: "red",
};

const config = {
    animate: true,
    arrowIcon: "V",
};

const MyFaq = () => {
    return (
        <Card>
            <div className={"MyFaq"}>
                <div style={{width: "70%"}}><Faq data={data} styles={styles} config={config}  /></div>
            </div>
        </Card>

    )
};

export default MyFaq
