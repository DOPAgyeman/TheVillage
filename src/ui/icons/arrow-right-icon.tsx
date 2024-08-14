import * as React from 'react';
import type { SharedValue } from 'react-native-reanimated';
import Animated, {
  createAnimatedPropAdapter,
  processColor,
  useAnimatedProps,
} from 'react-native-reanimated';
import type { SvgProps } from 'react-native-svg';
import { Path, Svg } from 'react-native-svg';

const AnimatedArrow = Animated.createAnimatedComponent(Path);

const adapter = createAnimatedPropAdapter(
  (props) => {
    if (Object.keys(props).includes('fill')) {
      props.fill = { type: 0, payload: processColor(props.fill) };
    }
    if (Object.keys(props).includes('stroke')) {
      props.stroke = { type: 0, payload: processColor(props.stroke) };
    }
  },
  ['fill', 'stroke']
);

type ArrowRightIconProps = {
  color: SharedValue<string>;
  width: number;
  height: number;
};

export const ArrowRightIcon = (
  { color, width, height }: ArrowRightIconProps,
  { ...props }: SvgProps
) => {
  const arrowAnimatedProps = useAnimatedProps(
    () => {
      return {
        stroke: color.value,
      };
    },
    [],
    adapter
  );
  return (
    <Svg
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.7}
      className="size-6"
      {...props}
    >
      <AnimatedArrow
        animatedProps={arrowAnimatedProps}
        strokeLinecap={'round'}
        strokeLinejoin={'round'}
        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
      />
    </Svg>
  );
};
