// code for Footer bar

import './Footer.css';

function Footer() {

    return (
        <div className="main-footer">
            <hr />
            <div className="row">
                <p className="col-sm">
                    &copy;{new Date().getFullYear()} ZILLA | Himanshu
                </p>
            </div>
        </div>

    );
}

export default Footer;
