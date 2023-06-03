import { useEffect } from "react";
import { Chart } from "react-google-charts";
import { colors } from "./colors";

interface GaugeProps {
  title: string;
  value: number;
  min: number;
  max: number;
}

const MeterGauge: React.FC<GaugeProps> = ({ title, value, min, max }) => {
  useEffect(() => {
    setTimeout(() => {
      const elements = window.document.querySelectorAll(
        ".g-gauge svg:first-child > g > g > text[text-anchor~=middle]"
      );
      if (!elements.length) return;
      elements.forEach((element) => {
        if (element.textContent?.includes("萬瓩")) return;
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        element.textContent = `${element.textContent} 萬瓩`;
      });
    }, 1000);
  }, []);

  return (
    <Chart
      chartType="Gauge"
      className="g-gauge"
      data={[
        ["Label", "Value"],
        [title, value],
      ]}
      width={"100%"}
      options={{
        min,
        max,
        greenFrom: min,
        greenTo: (min + max) / 2,
        yellowFrom: (min + max) / 2,
        yellowTo: min + ((max - min) * 4) / 5,
        redFrom: min + ((max - min) * 4) / 5,
        redTo: max,
        minorTicks: 5,
        redColor: colors.dangerous,
        yellowColor: colors.warning,
        greenColor: colors.good,
      }}
    />
  );
};

export default MeterGauge;
