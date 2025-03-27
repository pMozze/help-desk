import { FC } from 'react';
import styled from 'styled-components';

interface Props {
  steps: string[];
  progress: number;
  className?: string;
}

const Line = styled.div<{ $progress: number }>`
  width: 100%;
  height: 8px;

  background-image: ${({ $progress }) => `linear-gradient(to right, #02C3FC ${$progress}%, #F1F1F1 0%)`};
  border-radius: 9999px;
`;

const Steps = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Step = styled.div`
  font-size: 14px;
  color: #717a81;
`;

const Timeline: FC<Props> = ({ steps, progress, className }) => {
  return (
    <div className={className}>
      <Line $progress={progress} />
      <Steps>
        {steps.map((step, stepIndex) => (
          <Step key={stepIndex}>
            {stepIndex === 0 && ['Current', <br />]}
            {stepIndex === 1 && ['Next step', <br />]}
            {step}
          </Step>
        ))}
        {steps.length === 2 && <Step />}
      </Steps>
    </div>
  );
};

export default Timeline;
