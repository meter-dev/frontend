import { Liquid, type LiquidOptions } from "@antv/g2plot";
import { format } from "d3-format";
import { useEffect, useMemo, useRef } from "react";
import { colors } from "./colors";

interface LiquidProps {
  percent: number;
  width: number;
  title: string;
}

const MeterLiquid: React.FC<LiquidProps> = ({ title, percent, width }) => {
  const id = `${title}-liquid}`;
  const chart = useRef<Liquid | null>(null);
  const color = useMemo(() => {
    return percent > 0.5 ? colors.waterful : percent > 0.2 ? colors.warning : colors.dangerous;
  }, [percent]);

  const option = useMemo<LiquidOptions>(
    () => ({
      statistic: {
        title: {
          content: title,
        },
        content: {
          content: `${format(".0%")(percent)}`,
        },
      },
      percent,
      wave: {
        length: 128,
      },
      width,
      height: width,
      liquidStyle: () => {
        return {
          fill: color,
          stroke: color,
        };
      },
    }),
    [percent, width, title, color]
  );

  useEffect(() => {
    if (chart.current) {
      chart.current.update(option);
      return;
    }
    chart.current = new Liquid(id, option);
    chart.current.render();
    () => {
      chart.current?.destroy();
    };
  }, [option, id]);

  return <div id={id}></div>;
};

export default MeterLiquid;
