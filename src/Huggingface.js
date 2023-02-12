import Typewriter from "typewriter-effect";
import icon from "./assets/chenyu-icon.png";
import styled from "styled-components";
import React, { useEffect } from "react";

const Icon = styled.img`
  width: 6rem;
  height: 6rem;
`;

const Container = styled.div`
  text-align: center;
  padding-top: 7rem;
`;

const CatchPhrase1 = styled.h1`
  font-size: 1.75rem;
  line-height: 1;
`;

const CatchPhrase2 = styled.h2`
  font-size: 1rem;
  line-height: 1;
`;

const Huggingface = () => {
  useEffect(() => {
    document.getElementsByTagName("title")[0].text =
      "晨雨 - 中国的Hugging Face";
  });

  return (
    <Container>
      <Icon src={icon}></Icon>
      <div>
        <CatchPhrase1>
          晨雨 - 如清晨雨露, 滋养中国乃至全球的AI社群
          {/* <Typewriter
            options={{
              strings: ["社群", "企业"],
              autoStart: true,
              loop: true,
              deleteSpeed: 1,
              wrapperClassName: "typewriter",
            }}
          /> */}
        </CatchPhrase1>

        <CatchPhrase2>
          以开源社群为驱动来源，构建、训练和部署最先进的人工智能模型
        </CatchPhrase2>
      </div>
    </Container>
  );
};

export default Huggingface;
