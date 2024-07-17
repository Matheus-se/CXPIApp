import {Dimensions, View} from 'react-native';
import {ICardItem} from '../interfaces/ICardItem';
import Card from './Card';
import Animated, {interpolate, useAnimatedStyle, useSharedValue} from 'react-native-reanimated';
import { AnimatedView } from 'react-native-reanimated/lib/typescript/component/View';

const CardContainer = ({
  data,
  maxVisibleSubItems,
}: {
  data: ICardItem[];
  maxVisibleSubItems: number;
}) => {
  const animatedValue = useSharedValue(0);
  const currentIndex = useSharedValue(0);
  const prevIndex = useSharedValue(0);

  const width = Dimensions.get('window').width;

  const animateStyle = useAnimatedStyle(() => {
    const opacity = currentIndex.value !== 0 ? 1 : 0;
    return {opacity}
  }
  )

  return (
    <>
      {data.map((item, i) => {
        return (
            <Card
              key={i}
              item={item}
              index={i}
              animatedValue={animatedValue}
              currentIndex={currentIndex}
              prevIndex={prevIndex}
              dataLength={data.length}
              maxVisibleSubItems={maxVisibleSubItems}
              width={width - 34}
              height={width - 34}
            />
        );
    })}
      <Animated.View
        style={[{
          width: width - 106,
          height: 50,
          zIndex: -100,
          borderRadius: 20,
          marginTop: "auto",
          borderColor: '#52B788',
          borderWidth: 2,
          position: "relative"
        }, animateStyle]}
      >
        <View style={{position: "absolute", bottom: 0, width: width, backgroundColor: "#F5F5F5", height: 46, top: 17, right: -53 }}/>
      </Animated.View>
    </>
  );
};

export default CardContainer;
