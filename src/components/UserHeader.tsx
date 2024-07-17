import {Text, View} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
// @ts-ignore
import BlastedImage from 'react-native-blasted-image';

export const UserHeader = () => {
  return (
    <View
      style={{
        width: '100%',
        paddingHorizontal: 61,
        paddingVertical: 16,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{fontFamily: 'Nunito-Bold', fontSize: 16}}>Hi </Text>
        <Text
          style={{color: '#52B788', fontSize: 16, fontFamily: 'Nunito-Bold'}}>
          John Doe!
        </Text>
      </View>
      <TouchableWithoutFeedback style={{width: 36, height: 36, borderRadius: 300}} onPress={() => {}}>
        <BlastedImage
          style={{borderRadius: 300, borderWidth: 2, borderColor: '#52B788'}}
          source={{
            uri: 'https://www.georgetown.edu/wp-content/uploads/2022/02/Jkramerheadshot-scaled-e1645036825432-1050x1050-c-default.jpg',
          }}
          resizeMode="cover"
          width={36}
          height={36}
        />
      </TouchableWithoutFeedback>
    </View>
  );
};
