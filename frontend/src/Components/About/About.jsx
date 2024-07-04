import React from "react";
import aboutImg from "../../assets/images/about.png";
import aboutCardImg from "../../assets/images/about-card.png";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section>
      <div className="container">
        <div
          className="flex justify-between gap-[50px]
            lg:gap-[130px] xl:gap-0 flex-col lg:flex-row
            "
        >
          <div className="relative w-3/4 lg:w-1/2 xl:w-[770px] z-10 order-2 lg:order-1 ">
            <img src={aboutImg} alt="" />
            <div className="absolute z-20 bottom-4 w-[200px] md:w-[300px]  right-[-30%] md:right-[-7%] lg:right-[22%] ">
              <img src={aboutCardImg} alt="" />
            </div>
          </div>
          <div className="w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2">
            <h2 className="heading">Proud to be one of the nations best </h2>
            <p className="text_para">
              For 30 years in a row , US news and World report has recognized us
              as one of the best public hospitals in the Nation adn #1 in Texas
              . Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
              labore nam, officia rem asperiores libero
            </p>
            <p className="text_para mt-[30px]">
                Your Best is something we strive each day , caring for our patients not looking back at whwat we accomplished but towards what we cand do Tommorrow Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi exercitationem perspiciatis optio?
            </p>
            <Link to = "/">
                <button className="btn">Learn more</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
