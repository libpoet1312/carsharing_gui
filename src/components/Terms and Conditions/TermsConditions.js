import React from "react";
import {SITE_NAME} from "../../config";
import {Link} from "react-router-dom";


const TermsConditions = () => {
    return (
        <div style={{textAlign: "justify"}}>
            <h2><strong>Terms and Conditions</strong></h2>

            <p >Welcome to CarSharing!</p>

            <p >These terms and conditions outline the rules and regulations for the use of {SITE_NAME} platform,
                located at <Link to={''}>https://carsharing1312.herokuapp.com/</Link>.
            </p>

            <p>By accessing this website we assume you accept these terms and conditions.
                Do not continue to use CarSharing if you do not agree to take all of the terms and conditions stated on
                this page.
            </p>

            <p>The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice
                and all Agreements: "Client", "You" and "Your" refers to you,
                the person log on this website and compliant to the Company’s terms and conditions.
                "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us",
                refers to both the Client and ourselves.
                All terms refer to the offer, acceptance and consideration of payment necessary to undertake the
                process of our assistance to the Client in the most appropriate manner
                for the express purpose of meeting the Client’s needs in respect of provision of the Company’s stated services,
                in accordance with and subject to, prevailing law of Greece.
                Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they,
                are taken as interchangeable and therefore as referring to same.
            </p>

            <h3><strong>Cookies</strong></h3>
            <p>{SITE_NAME} <strong>DOES NOT</strong> make use of any cookies.</p>
            <p>Although most interactive websites use cookies to let us retrieve the client’s details for each visit,
                {SITE_NAME} makes use of <a href={'https://www.techopedia.com/definition/27674/html5-local-storage'}>local storage of the browser</a>.
                Before HTML5, application data had to be stored in cookies, included in every server request.
                Web storage is more secure, and large amounts of data can be stored locally, without affecting website performance.
            </p>
            <p>By accessing CarSharing, you agreed to use local storage in agreement with the https://carsharing1312.herokuapp.com/'s Privacy Policy.</p>

            <p>
                Local Storage attributes are used by our website to enable the functionality of certain areas to make it easier for people visiting our website.
            </p>

            <h3><strong>License</strong></h3>

            <p>Unless otherwise stated, https://carsharing1312.herokuapp.com/ and/or its licensors own the intellectual property rights for all material on CarSharing.
                All intellectual property rights are reserved. You may access this from CarSharing for your own personal use subjected to restrictions set in these terms and conditions.
            </p>

            <p>You must not:</p>
            <ul>
                <li>Republish material from CarSharing</li>
                <li>Sell, rent or sub-license material from CarSharing</li>
                <li>Reproduce, duplicate or copy material from CarSharing</li>
                <li>Redistribute content from CarSharing</li>
            </ul>

            <p>This Agreement shall begin on the date 01/09/2020.</p>

            {/*<p>Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. */}
            {/*    https://carsharing1312.herokuapp.com/ does not filter, edit, publish or review Comments prior to their presence on the website. */}
            {/*    Comments do not reflect the views and opinions of https://carsharing1312.herokuapp.com/,its agents and/or affiliates. */}
            {/*    Comments reflect the views and opinions of the person who post their views and opinions. */}
            {/*    To the extent permitted by applicable laws, https://carsharing1312.herokuapp.com/ shall not be liable for the Comments or for any liability, */}
            {/*    damages or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.*/}
            {/*</p>*/}

            {/*<p>https://carsharing1312.herokuapp.com/ reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive or causes breach of these Terms and Conditions.</p>*/}

            {/*<p>You warrant and represent that:</p>*/}

            {/*<ul>*/}
            {/*    <li>You are entitled to post the Comments on our website and have all necessary licenses and consents to do so;</li>*/}
            {/*    <li>The Comments do not invade any intellectual property right, including without limitation copyright, patent or trademark of any third party;</li>*/}
            {/*    <li>The Comments do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material which is an invasion of privacy</li>*/}
            {/*    <li>The Comments will not be used to solicit or promote business or custom or present commercial activities or unlawful activity.</li>*/}
            {/*</ul>*/}

            {/*<p>You hereby grant https://carsharing1312.herokuapp.com/ a non-exclusive license to use, reproduce, edit and authorize others to use, reproduce and edit any of your Comments in any and all forms, formats or media.</p>*/}

            <h3><strong>Hyperlinking to our Content</strong></h3>

            <p>The following organizations may link to our Website without prior written approval:</p>

            <ul>
                <li>Government agencies;</li>
                <li>Search engines;</li>
                <li>News organizations;</li>
                <li>Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses; and</li>
                <li>System wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Web site.</li>
            </ul>

            <p>These organizations may link to our home page, to publications or to other Website information so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products and/or services; and (c) fits within the context of the linking party’s site.</p>

            <p>We approve other link requests from the following types of organizations:</p>

            <ul>
                <li>commonly-known consumer and/or business information sources;</li>
                <li>dot.com community sites;</li>
                <li>associations or other groups representing charities;</li>
                <li>online directory distributors;</li>
                <li>internet portals;</li>
                <li>accounting, law and consulting firms; and</li>
                <li>educational institutions and trade associations.</li>
            </ul>


            <p>No use of https://carsharing1312.herokuapp.com/'s logo or other artwork will be allowed for linking absent a trademark license agreement.</p>

            <h3><strong>iFrames</strong></h3>

            <p>Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website.</p>

            <h3><strong>Content Liability</strong></h3>

            <p>We shall not be hold responsible for any content that appears on your {SITE_NAME}. You agree to protect and defend us against all claims that is rising on your {SITE_NAME}.
                No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates,
                or advocates the infringement or other violation of, any third party rights.
            </p>

            <h3><strong>Your Privacy</strong></h3>

            <p>Please read our <Link to={'/privacypolicy'}>Privacy Policy</Link></p>

            <h3><strong>Reservation of Rights</strong></h3>

            <p>We reserve the right to request that you remove all links or any particular link to our Website.
                You approve to immediately remove all links to our Website upon request.
                We also reserve the right to amen these terms and conditions and it’s linking policy at any time.
                By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.
            </p>

            <h3><strong>Removal of links from our website</strong></h3>

            <p>If you find any link on our Website that is offensive for any reason, you are free to contact and inform us any moment.
                We will consider requests to remove links but we are not obligated to or so or to respond to you directly.
            </p>

            <p>We do not ensure that the information on this website is correct, we do not warrant its completeness or accuracy;
                nor do we promise to ensure that the website remains available or that the material on the website is kept up to date.
            </p>

            <h3><strong>Disclaimer</strong></h3>

            <p>To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions
                relating to our website and the use of this website. Nothing in this disclaimer will:
            </p>

            <ul>
                <li>limit or exclude our or your liability for death or personal injury;</li>
                <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
                <li>limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
                <li>exclude any of our or your liabilities that may not be excluded under applicable law.</li>
            </ul>

            <p>The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer:
                (a) are subject to the preceding paragraph; and
                (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract,
                in tort and for breach of statutory duty.
            </p>

            <p>As long as the website and the information and services on the website are provided free of charge,
                we will not be liable for any loss or damage of any nature.
            </p>
        </div>
    )
};

export default TermsConditions;
