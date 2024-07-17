import {Dimensions, Text} from 'react-native';

import {Camera} from 'react-native-vision-camera';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Route } from '@react-navigation/native';
import { RootStackParamList } from '../../../App';

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Camera'
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
  route: Route<'Camera', RootStackParamList["Camera"]>
};

const CameraView = ({route, navigation}: Props) => {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').width;

  const {device} = route.params;

  return <Camera style={{width, height}} device={device} isActive={true} />;
};

export default CameraView
