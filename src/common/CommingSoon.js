import React from 'react'
import CommingSoonLogo from "../assets/coming-soon.svg"

const CommingSoon = (props) => {
    return (
        <>
            <div className="pt-sm-3">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="text-center">
                                <div className="row justify-content-center">
                                    <div className="col-sm-4">
                                        <div className="maintenance-img">
                                            <img src={CommingSoonLogo} alt="comming soon" className="img-fluid mx-auto d-block" />
                                        </div>
                                    </div>
                                </div>
                                <h4 className="mt-2">{props.text}</h4>
                                <div className="row justify-content-center mt-5">
                                    <div className="col-md-8">
                                        <div data-countdown="2021/12/31" className="counter-number"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default CommingSoon