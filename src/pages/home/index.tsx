import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import {UserHeader} from '../../components/UserHeader';
import {useCameraDevice, useCameraPermission} from 'react-native-vision-camera';
import {useEffect} from 'react';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'HomeCamera'
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

function Home({navigation}: Props) {
  const width = Dimensions.get('window').width;
  const device = useCameraDevice('back');
  const {hasPermission, requestPermission} = useCameraPermission();

  const takePhoto = async () => {
    if (!hasPermission) {
      await requestPermission();
    }

    if (hasPermission && device) {
      navigation.navigate('Camera', {
        device,
      });
    }
  };

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission]);

  return (
    <>
      <UserHeader />
      <View style={{paddingHorizontal: 62}}>
        <TouchableOpacity
          onPress={() => {
            takePhoto();
          }}
          style={{
            width: width - 124,
            height: width - 124,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              borderRadius: 32,
              opacity: 0.4,
              top: 0,
              left: 0,
              backgroundColor: '#52B788',
              width: width - 124,
              height: width - 124,
              position: 'absolute',
            }}
          />
          <View
            style={{
              borderRadius: 32,
              width: width - 132,
              height: width - 132,
              backgroundColor: '#52B788',
              padding: 11,
            }}>
            <View
              style={{
                borderRadius: 32,
                borderWidth: 1,
                borderColor: '#93D3B4',
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  backgroundColor: 'white',
                  borderRadius: 300,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 76,
                  opacity: 0.9,
                  height: 76,
                }}>
                <Text
                  style={{
                    fontFamily: 'Nunito-ExtraBold',
                    fontSize: 64,
                    color: '#52B788',
                  }}>
                  +
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}
export default Home;
