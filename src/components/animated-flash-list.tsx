import { FlashList } from '@shopify/flash-list';
import type { JSXElementConstructor, ReactElement } from 'react';
import React, { useMemo } from 'react';
import {
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';
import { Dimensions } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import Animated, {
  runOnJS,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';

type AnimatedFlashListProps = {
  data: object[];
  horizontal: boolean;
  showsHorizontalScrollIndicator: boolean;
  pagingEnabled: boolean;
  keyExtractor: (item: any) => string;
  scrollEventThrottle: number;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  renderItem: (
    item: any
  ) => ReactElement<any | string | JSXElementConstructor<any>>;
  estimatedItemSize: number;
  getItemType: (
    item: any,
    index: number,
    extraData?: any
  ) => string | number | undefined;
  keyboardShouldPersistTaps?:
    | boolean
    | 'always'
    | 'never'
    | 'handled'
    | undefined;
  initialScrollIndex: number;
  scrollEnabled: boolean;
  scrollX: SharedValue<number>;
  scrollIndex: number;
  setIndex: (index: number) => void;
  onScrollEnd?: () => void;
};

const AnimatedFlashListComponent = Animated.createAnimatedComponent(
  React.forwardRef(
    (props: AnimatedFlashListProps, ref: React.Ref<FlashList<any>>) => (
      <FlashList<any> {...props} ref={ref} />
    )
  )
);

const AnimatedFlashList = (props: AnimatedFlashListProps) => {
  const ref = React.useRef<FlashList<any>>(null);

  const windowWidth = Dimensions.get('window').width;

  useMemo(() => {
    ref.current?.scrollToIndex({ animated: true, index: props.scrollIndex });
  }, [props.scrollIndex]);

  return (
    <AnimatedFlashListComponent
      ref={ref}
      data={props.data}
      horizontal={props.horizontal}
      showsHorizontalScrollIndicator={props.showsHorizontalScrollIndicator}
      pagingEnabled={props.pagingEnabled}
      scrollEnabled={props.scrollEnabled}
      keyExtractor={props.keyExtractor}
      scrollEventThrottle={props.scrollEventThrottle}
      onScroll={useAnimatedScrollHandler({
        onScroll: (event) => {
          props.scrollX.value = event.contentOffset.x;
        },
        onMomentumEnd: () => {
          props.data.map((_, i) => {
            if (
              props.scrollX.value === windowWidth * i &&
              props.scrollIndex !== i
            ) {
              runOnJS(props.setIndex)(i);
            }
            if (props.onScrollEnd) {
              runOnJS(props.onScrollEnd)();
            }
          });
        },
      })}
      scrollX={props.scrollX}
      scrollIndex={props.scrollIndex}
      setIndex={props.setIndex}
      estimatedItemSize={props.estimatedItemSize}
      initialScrollIndex={props.scrollIndex}
      renderItem={props.renderItem}
      getItemType={props.getItemType}
      keyboardShouldPersistTaps={props.keyboardShouldPersistTaps}
    />
  );
};
export default AnimatedFlashList;
