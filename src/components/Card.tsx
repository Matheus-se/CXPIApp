import {Dimensions} from 'react-native';
import {ICardItem} from '../interfaces/ICardItem';
// @ts-ignore
import BlastedImage from 'react-native-blasted-image';
import {SharedValue} from 'react-native-reanimated';
import Animated, {
  useAnimatedStyle,
  interpolate,
  withTiming,
} from 'react-native-reanimated';
import {
  Directions,
  FlingGestureHandler,
  State,
} from 'react-native-gesture-handler';
import {
  ColorMatrix,
  concatColorMatrices,
  saturate,
} from 'react-native-color-matrix-image-filters';

const Card = ({
  item,
  index,
  animatedValue,
  currentIndex,
  prevIndex,
  dataLength,
  maxVisibleSubItems,
  width, 
  height
}: {
  item: ICardItem;
  index: number;
  animatedValue: SharedValue<number>;
  currentIndex: SharedValue<number>;
  prevIndex: SharedValue<number>;
  dataLength: number;
  maxVisibleSubItems: number;
  width: number,
  height: number
}) => {
  const animateStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      animatedValue.value,
      [index - 1, index, index + 1],
      [-40, 1, 40],
    );

    const translateY2 = interpolate(
      animatedValue.value,
      [index - 1, index, index + 1],
      [-200, 1, 200],
    );

    const scale = interpolate(
      animatedValue.value,
      [index - 1, index, index + 1],
      [0.9, 1, 1.1],
    );
    
    const shaddowOpacity =
      currentIndex.value == index ? withTiming(0.4) : withTiming(0);
    const shaddowColor =
      currentIndex.value == index ? "#ffffff" : "transparent";
    const shadowOffset =
      currentIndex.value == index ? {height: 4, width: 4} : {height: 0, width: 0};
    const shadowRadius =
      currentIndex.value == index ? 8 : 0;
    const borderRadius =
      currentIndex.value == index ? withTiming(40) : withTiming(20);
    const borderColor = currentIndex.value == index ? '#52B788' : 'transparent';
    const borderWidth =
      currentIndex.value == index ? withTiming(4) : withTiming(0);

    const opacity = interpolate(
      animatedValue.value,
      [index - 1, index, index + 1],
      [0.9, 1, 0],
    );
    return {
      transform: [
        {translateY: index === prevIndex.value ? translateY2 : translateY},
        {scale},
      ],
      opacity:
        index < currentIndex.value + maxVisibleSubItems - 1
          ? opacity
          : index === currentIndex.value + maxVisibleSubItems - 1
          ? withTiming(1)
          : withTiming(0),
      borderRadius,
      borderColor,
      borderWidth,
      shadowOffset,
      shaddowOpacity,
      shaddowColor,
      shadowRadius
    };
  });
  const animateStyle2 = useAnimatedStyle(() => {
    const zIndex =
      currentIndex.value == index ? withTiming(1000) : withTiming(0);

    return {
      zIndex,
    };
  });
  return (
    <>
    <FlingGestureHandler
      key={'up'}
      direction={Directions.UP}
      onHandlerStateChange={ev => {
        if (ev.nativeEvent.state === State.END) {
          if (currentIndex.value !== 0) {
            animatedValue.value = withTiming((currentIndex.value -= 1));
            prevIndex.value = currentIndex.value - 1;
          }
        }
      }}>
      <FlingGestureHandler
        key={'down'}
        direction={Directions.DOWN}
        onHandlerStateChange={ev => {
          if (ev.nativeEvent.state === State.END) {
            if (currentIndex.value !== dataLength - 1) {
              animatedValue.value = withTiming((currentIndex.value += 1));
              prevIndex.value = currentIndex.value;
            }
          }
        }}>
        <Animated.View
          style={[
            {
              position: 'absolute',
              overflow: 'hidden',
              zIndex: dataLength - index,
            },
            animateStyle,
          ]}>
          <Animated.Image
            style={[{position: 'absolute'}, animateStyle2]}
            source={{uri: item.image}}
            resizeMode="cover"
            width={width}
            height={height}
          />
          <ColorMatrix matrix={concatColorMatrices(saturate(0))}>
            <BlastedImage
              source={{uri: item.image}}
              resizeMode="cover"
              width={width}
              height={height}
            />
          </ColorMatrix>
        </Animated.View>
      </FlingGestureHandler>
    </FlingGestureHandler>
    </>
  );
};

export default Card;
